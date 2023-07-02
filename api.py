from flask import Flask, jsonify
from subprocess import Popen, PIPE
from tabulate import tabulate

app = Flask(__name__)


@app.route('/market-data')
def get_market_data():
    # Define the Java command
    java_cmd = 'java'
    args = ['-Ddebug=true', '-Dspeed=2.0', '-classpath', './feed-play-1.0.jar', 'hackathon.player.Main', 'dataset.csv', '9011']

    # Construct the command list
    command = [java_cmd] + args

    # Execute the Java command using subprocess
    process = Popen(command, stdout=PIPE, universal_newlines=True)

    # Read the output and update the table in real-time
    market_data = []
    table_headers = set()
    table = ""

    while True:
        line = process.stdout.readline()
        if line == '' and process.poll() is not None:
            break

        if line.startswith("Publishing MarketData"):
            kv_pairs = line.strip().split(', ')
            market_data.append({kv.split('=')[0]: kv.split('=')[1] for kv in kv_pairs})
            table = tabulate(market_data, headers="keys", tablefmt="grid")

        # Print the updated table
        # print(table)

    # Wait for the process to complete
    process.wait()

    # Close the process
    process.stdout.close()

    return jsonify({'market_data': market_data})

if __name__ == '__main__':
    app.run()
