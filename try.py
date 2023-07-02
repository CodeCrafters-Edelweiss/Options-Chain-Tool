import subprocess
from tabulate import tabulate
from math import log, sqrt
from ivcalcy import calculate_implied_volatility
import datetime


# Define the Java command
java_cmd = 'java'
args = ['-Ddebug=true', '-Dspeed=2.0', '-classpath', './feed-play-1.0.jar', 'hackathon.player.Main', 'dataset.csv', '9012']


# Define the month abbreviation mapping
month_abbreviations = {
    'JAN': 1, 'FEB': 2, 'MAR': 3, 'APR': 4, 'MAY': 5, 'JUN': 6,
    'JUL': 7, 'AUG': 8, 'SEP': 9, 'OCT': 10, 'NOV': 11, 'DEC': 12
}

# Define the symbol you're interested in
symbol_of_interest = "'MAINIDX31AUG2318100PE'"

# Construct the command list
command = [java_cmd] + args

# Execute the Java command using subprocess
process = subprocess.Popen(command, stdout=subprocess.PIPE, universal_newlines=True)

# Read the output and update the table in real-time
market_data = []
table_headers = set()
table = ""

while True:
    line = process.stdout.readline()
    if line == '' and process.poll() is not None:
        break

    if line.startswith("Publishing MarketData"):
        line = line.replace("Publishing MarketData{", "").replace("}", "")
        data = {}
        items = line.split(", ")
        for item in items:
            key, value = item.split('=')
            data[key] = value

        if data['symbol'] == symbol_of_interest:
            # Extract additional columns
            symbol = data['symbol'][1:8]
            expiry_date = data['symbol'][8:15]
            strike_price = data['symbol'][15:20]
            change = data['symbol'][20:-1]

            # Add additional columns to the data dictionary
            data['symbol'] = symbol
            data['expiry_date'] = expiry_date
            data['strike_price'] = strike_price
            data['change'] = change
            data['IV'] = 1.99

            

            

            market_data.append(data)
            print(market_data)
            # option_value = float(market_data[0]["LTP"])
            # underlying_price = float(market_data[0]["bestBid"])
            # strike_price = float(market_data[0]["strike_price"])
            # expiry_date = market_data[0]["expiry_date"]
            # time_to_expiration = (datetime.datetime.strptime(expiry_date, '%d%b%y') - datetime.datetime.now()).days / 365
            # risk_free_rate = 0.05  # Assuming a constant risk-free rate of 5%
            # option_type = market_data[0]["change"]
            # iv = calculate_implied_volatility(option_value, underlying_price, time_to_expiration, risk_free_rate, strike_price, option_type)
            # print(iv)
            # print(market_data)
            # table = tabulate(market_data, headers="keys", tablefmt="grid")

    # Print the updated table
    # print(table)

# Wait for the process to complete
process.wait()

# Close the process
process.stdout.close()
