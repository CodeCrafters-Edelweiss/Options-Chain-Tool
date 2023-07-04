import math
from scipy import optimize
from scipy.stats import norm
import datetime

# Option details
def get_iv(option_type, strike_price, expiration_date, risk_free_rate, underlying_price, option_price):
    # Function to calculate the Black-Scholes formula
    def black_scholes(IV):
        
        d1 = (math.log(underlying_price / strike_price) + (risk_free_rate + IV**2 / 2) * time_to_expiration) / (IV * math.sqrt(time_to_expiration))
        d2 = d1 - IV * math.sqrt(time_to_expiration)
        if option_type == 'CE':
            return underlying_price * norm.cdf(d1) - strike_price * math.exp(-risk_free_rate * time_to_expiration) * norm.cdf(d2) - option_price
        elif option_type == 'PE':
            return strike_price * math.exp(-risk_free_rate * time_to_expiration) * norm.cdf(-d2) - underlying_price * norm.cdf(-d1) - option_price

    # Calculate time to expiration in years
    expiration_datetime = datetime.datetime.strptime(expiration_date, '%d%b%y %H:%M:%S')
    current_datetime = datetime.datetime.now()
    time_to_expiration = (expiration_datetime - current_datetime).total_seconds() / (60 * 60 * 24 * 300)
    time_to_expiration = max(time_to_expiration, 0)  # Ensure non-negative time to expiration
    if time_to_expiration<=0:
        return '-'

    # Test different intervals for implied volatility using Newton's method
    intervals = [(0.001, 1), (1, 10), (10, 100), (100, 1000), (1000, 10000)]
    results = []
    for interval in intervals:
        a, b = interval
        try:
            implied_volatility = optimize.newton(black_scholes, x0=(a + b) / 2, tol=1e-6)
            results.append(round(implied_volatility * 100, 2))
        except RuntimeError:
            pass
    if len(results)==0:
        return '-'
    
    return results[0]
