import requests

def receive_market_data():
    response = requests.get('http://localhost:5000/market-data/stream', stream=True)
    count=0
    with open('market_data.txt', 'w') as file:
        for line in response.iter_lines():
            if line:
                if(count==10): exit()

                file.write(line.decode() + '\n')
                count += 1

if __name__ == '__main__':
    receive_market_data()
