from flask_socketio import SocketIO

socketio = SocketIO(message_queue='amqp://guest:guest@rabbit//')

socketio.emit('newnumber', {'number': '12'}, namespace='/test')