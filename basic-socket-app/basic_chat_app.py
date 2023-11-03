from flask import Flask, render_template, request
from flask_socketio import SocketIO, send

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on("message")
def sendMessage(message):
    send(message)

@app.route('/')
def message():
    return render_template('index.html')

@app.route('/process_message', methods=['POST'])
def process_message():
    user_message = request.json.get('message')
    final_response = f"Final response : {user_message}"
    return {"finalResponse": final_response}

if __name__ == '__main__':
    app.run(debug=True)