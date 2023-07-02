import math
from datetime import datetime
import scipy.stats as stats

# Constants
import math

# Constants
import math
from scipy.optimize import brentq

# Constants
risk_free_rate = 0.05  # 5%

# Function to calculate the Black-Scholes option price
def black_scholes_call_price(strike_price, underlying_price, time_to_maturity, implied_volatility):
    d1 = (math.log(underlying_price / strike_price) + (risk_free_rate + (implied_volatility ** 2) / 2) * time_to_maturity) / (implied_volatility * math.sqrt(time_to_maturity))
    d2 = d1 - implied_volatility * math.sqrt(time_to_maturity)
    
    call_price = underlying_price * math.exp(-risk_free_rate * time_to_maturity) * norm_cdf(d1) - strike_price * math.exp(-risk_free_rate * time_to_maturity) * norm_cdf(d2)
    
    return call_price

# Function to calculate implied volatility using the Black-Scholes formula
def calculate_implied_volatility(option_price, strike_price, underlying_price, time_to_maturity):
    # Check if the contract has expired
    if time_to_maturity <= 0:
        return 0
    
    # Define the objective function for optimization
    def objective_func(implied_volatility):
        return black_scholes_call_price(strike_price, underlying_price, time_to_maturity, implied_volatility) - option_price
    
    # Try different ranges of implied volatility until a valid root is found
    ranges = [(0.001, 1), (1, 10), (0.001,100)]  # Adjust the ranges as per your requirement
    
    for a, b in ranges:
        try:
            implied_volatility = brentq(objective_func, a, b)
            return implied_volatility
        except ValueError:
            continue
    
    # If no valid root is found, return None or raise an exception
    return None

# Helper functions for normal distribution calculations
def norm_cdf(x):
    return (1 + math.erf(x / math.sqrt(2))) / 2
# Example usage
option_price = 176  # Placeholder value for option price
strike_price = 19050  # Placeholder value for strike price
underlying_price = 209  # Placeholder value for underlying price
expiry_date = "06JUL23"  # Placeholder value for the expiry date

# Calculate time to maturity in years
expiry_datetime = datetime.strptime(expiry_date, "%d%b%y")
current_datetime = datetime.now()
time_to_maturity = (expiry_datetime - current_datetime).days / 365

implied_volatility = calculate_implied_volatility(option_price, strike_price, underlying_price, time_to_maturity)

if implied_volatility is None:
    print("Implied volatility not found within the provided ranges.")
else:
    print(f"Implied Volatility: {implied_volatility}")