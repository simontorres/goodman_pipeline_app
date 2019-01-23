import socketio
from threading import Thread, Event


print("Creating instance")
sio = socketio.Client()

thread = Thread()

thread_stop_event = Event()

class MessageThread(Thread):
    def __init__(self)
        self.sio = socketio.Client()

    def send_zeros(self):
        for i in range(

print("connecting")
sio.connect('http://localhost:4000/test')

print("Sending data")
for i in range(10):
    sio.emit("newnumber", {'number': i})

print("Data sent")

