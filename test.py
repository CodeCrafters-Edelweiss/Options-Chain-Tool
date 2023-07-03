from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from time import time

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('connect')
def handle_connect():
    print('new connection')

@socketio.on('to-server')
def handle_to_server(arg):
    print(f'new to-server event: {arg}')
    socketio.emit('from-server', 'str(time())')

if __name__ == '__main__':
    socketio.run(app, port=50000)
