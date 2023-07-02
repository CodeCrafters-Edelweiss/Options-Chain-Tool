from scipy.stats import norm
import math
import datetime


def calculate_implied_volatility(option_value, underlying_price, time_to_expiration, risk_free_rate, strike_price, option_type):
    # Define the Black-Scholes formula
    def black_scholes(underlying_price, strike_price, time_to_expiration, risk_free_rate, volatility):
        d1 = (math.log(underlying_price / strike_price) + (risk_free_rate + 0.5 * volatility ** 2) * time_to_expiration) / (volatility * math.sqrt(time_to_expiration))
        d2 = d1 - volatility * math.sqrt(time_to_expiration)

        if option_type == "CE":
            option_value = underlying_price * norm.cdf(d1) - strike_price * math.exp(-risk_free_rate * time_to_expiration) * norm.cdf(d2)
        elif option_type == "PE":
            option_value = strike_price * math.exp(-risk_free_rate * time_to_expiration) * norm.cdf(-d2) - underlying_price * norm.cdf(-d1)

        return option_value

    # Define a function to calculate the difference between observed and calculated option prices
    def difference(volatility):
        return option_value - black_scholes(underlying_price, strike_price, time_to_expiration, risk_free_rate, volatility)

    # Use the bisection method to find the implied volatility
    lower_volatility = 0.01  # Lower bound of volatility
    upper_volatility = 2.0  # Upper bound of volatility
    tolerance = 0.0005  # Tolerance level for convergence

    while upper_volatility - lower_volatility > tolerance:
        mid_volatility = (lower_volatility + upper_volatility) / 2
        if difference(lower_volatility) * difference(mid_volatility) < 0:
            upper_volatility = mid_volatility
        else:
            lower_volatility = mid_volatility

    return (lower_volatility + upper_volatility) / 2


option_data = [{
    "symbol": "NIFTY",
    "LTP": "179",
    "bestBid": "209",  # Use best bid price as underlying price
    "expiry_date": "06JUL23",
    "strike_price": "19050",
    "option_type": "PE"
}]
option_value = float(option_data[0]["LTP"])
underlying_price = float(option_data[0]["bestBid"])
strike_price = float(option_data[0]["strike_price"])
expiry_date = option_data[0]["expiry_date"]
time_to_expiration = (datetime.datetime.strptime(expiry_date, '%d%b%y') - datetime.datetime.now()).days / 365
risk_free_rate = 0.05  # Assuming a constant risk-free rate of 5%
option_type = option_data[0]["option_type"]

implied_volatility = calculate_implied_volatility(option_value, underlying_price, time_to_expiration, risk_free_rate, strike_price, option_type)
print(f"Implied Volatility: {implied_volatility}")
