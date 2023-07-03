import json
import time
from flask import Flask, jsonify
from subprocess import Popen, PIPE
from flask_socketio import SocketIO, emit
import socket


app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

symbols = ("MAINIDX", "ALLBANKS", "FINANCIALS", "MIDCAPS", "MIDCAP")

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('to-server')
def handle_to_server(arg):
    print(f'new to-server event: {arg}')
    socketio.emit('from-server', str(time.time()))  # Use time.time() instead of time

@socketio.on('update_market_data')
def update_market_data():
    print('inside')
    global data_count, emit_batch_size, batch_data

    # Execute the Java command using subprocess and capture the output
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('localhost', 0))
        _, port = s.getsockname()
    java_cmd = 'java'
    args = ['-Ddebug=true', '-Dspeed=2.0', '-classpath', './feed-play-1.0.jar', 'hackathon.player.Main', 'dataset.csv', str(port)]
    command = [java_cmd] + args
    process = Popen(command, stdout=PIPE, universal_newlines=True)

    # Send the data to the client in batches
    # The first list contains expiry dates
    # The second list contains strike prices
    # The third list contains data
    batch_data = [[], [], []]
    print('also inside')
    for line in process.stdout:
        if line.startswith("Publishing MarketData"):
            line = line.replace("Publishing MarketData{", "").replace("}", "")
            data = {}
            items = line.split(", ")
            for item in items:
                key, value = item.split('=')
                key = key.strip()
                value = value.strip()
                data[key] = value

            data["symbol"] = data["symbol"][1:-1]

            for symbol_ in symbols:
                if symbol_ in data["symbol"]:
                    len_symbol = len(symbol_)
                    if len(data["symbol"]) > 10:
                        data['change'] = data["symbol"][-2:]
                        data['expiry_date'] = data['symbol'][len_symbol:len_symbol+7]
                        data['strike_price'] = data['symbol'][len_symbol+7:-2]
                        data['symbol'] = symbol_
                        data['IV'] = 1.99

                        batch_data[0].append(data['expiry_date'])
                        batch_data[1].append(data['strike_price'])
                        batch_data[2].append(data)
            # for batch in batch_data:
            # Emit the batch data to the client
            # emit('market_data', str(batch_data))
            # socketio.sleep(0)
            # print(str(batch_data))
            # batch_data = [[], [], []]
            # print(len(batch_data) , " " , emit_batch_size)
            if len(batch_data) >= emit_batch_size:
                # Emit the batch data to the client
                json_data = json.dumps(batch_data)
                emit('market_data', (json_data))
                socketio.sleep(0)
                print('emitted')
                batch_data = [[], [], []]

        data_count += 1

    # Emit any remaining data in the last batch
    if batch_data:
        emit('market_data', jsonify(batch_data))

    # Emit a message to indicate data update completion
    emit('market_data_complete', 'Data update complete')

    # Close the process
    process.stdout.close()

@app.route('/market-data')
def get_market_data():
    global data_count
    return jsonify({'data_count': data_count})

if __name__ == '__main__':
    data_count = 0
    emit_batch_size = 3
    socketio.run(app, port=5000)
