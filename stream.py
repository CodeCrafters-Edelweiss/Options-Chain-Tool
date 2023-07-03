from flask import Flask, Response
from subprocess import Popen, PIPE
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)

symbols = ("MAINIDX", "ALLBANKS", "FINANCIALS", "MIDCAPS", "MIDCAP")

expiry_date = set()
strike_price = set()

def generate_market_data():
    # Execute the Java command using subprocess and capture the output
    java_cmd = 'java'
    args = ['-Ddebug=true', '-Dspeed=2.0', '-classpath', './feed-play-1.0.jar', 'hackathon.player.Main', 'dataset.csv', '9019']
    command = [java_cmd] + args
    process = Popen(command, stdout=PIPE, universal_newlines=True)

    batch = [[],[],[]]
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

                        expiry_date.add(data['expiry_date'])
                        strike_price.add(data['strike_price'])
                        batch[2].append(data)

                        # print(batch[0])

                        if(len(batch[2])==5):

                            batch[0] = sorted(list(expiry_date))
                            batch[1] = sorted(list(strike_price))
                            yield str(batch) + '\n'
                            batch = [[],[],[]]

@app.route('/market-data/stream')
def stream_market_data():
    return Response(generate_market_data(), mimetype='text/plain')

if __name__ == '__main__':
    app.run(debug=True)
