from flask import Flask
from flask_cors import CORS
from core.main import StartApp 
from flask_socketio import SocketIO

app = Flask(__name__)  
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

if __name__ == '__main__':
    socketio.run(app)


@app.route('/')
def hello_world():
    return 'Hello, World!'

@socketio.on('message')
def connect():
    global hft 
    print('message')
    socketio.emit('hft.bank.balance')


hft = StartApp()
