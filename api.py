from flask import Flask, jsonify
from subprocess import Popen, PIPE
from apscheduler.schedulers.background import BackgroundScheduler
import socket

app = Flask(__name__)

def update_market_data():
    global data_count, emit_batch_size

    # Execute the Java command using subprocess and capture the output
    java_cmd = 'java'
    args = ['-Ddebug=true', '-Dspeed=2.0', '-classpath', './feed-play-1.0.jar', 'hackathon.player.Main', 'dataset.csv', '9019']
    command = [java_cmd] + args
    process = Popen(command, stdout=PIPE, universal_newlines=True)

    # Establish a socket connection with the client
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect(('localhost', 9000))

    # Send the data to the client in batches
    batch_data = []
    for line in process.stdout:
        if line.startswith("Publishing MarketData"):
            line = line.replace("Publishing MarketData{", "").replace("}", "")
            data = {}
            items = line.split(", ")
            for item in items:
                key, value = item.split('=')
                data[key] = value

            expiry_date = data['symbol'][8:15]
            strike_price = data['symbol'][15:20]
            change = data['symbol'][20:-1]

            # Add additional columns to the data dictionary
            data['expiry_date'] = expiry_date
            data['strike_price'] = strike_price
            data['change'] = change
            data['IV'] = 1.99

            batch_data.append(data)

            if len(batch_data) >= emit_batch_size:
                # Emit the batch data to the client file
                client_socket.sendall(str(batch_data).encode())
                batch_data = []

        data_count += 1

    # Emit any remaining data in the last batch
    if batch_data:
        client_socket.sendall(str(batch_data).encode())

    # Close the socket connection
    client_socket.close()

    # Close the process
    process.stdout.close()

@app.route('/market-data')
def get_market_data():
    global data_count
    return jsonify({'data_count': data_count})

if __name__ == '__main__':
    data_count = 0  # Counter for data entries
    emit_batch_size = 100  # Specify the amount of data to emit at a time

    # Schedule the market data update task every 2 seconds
    scheduler = BackgroundScheduler()
    scheduler.add_job(update_market_data, 'interval', seconds=2)
    scheduler.start()

    app.run()
