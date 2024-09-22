from flask import Flask, jsonify
from flask_socketio import SocketIO, emit
import eventlet
import time
from flask_cors import CORS# Initialize Flask and Flask-SocketIO
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")  # Allow all origins

from dataclasses import dataclass, asdict

@dataclass
class Vector3:
    x: float
    y: float
    z: float

@dataclass
class Quaternion:
    w: float
    x: float
    y: float
    z: float

@dataclass
class Pose:
    position: Vector3
    orientation: Quaternion

@dataclass
class Screw:
    linear: Vector3
    angular: Vector3

@dataclass
class State:
    pose: Pose
    velocity: Screw
    acceleration: Screw

class Aircraft(object):
    def __init__(self) -> None:
        self.state = State(
            pose=Pose(
                position=Vector3(0,0,0),
                orientation=Quaternion(1, 0, 0, 0)
            ),
            velocity=Screw(
                linear=Vector3(0, 0, 0),
                angular=Vector3(0, 0, 0)
            ),
            acceleration=Screw(
                linear=Vector3(0, 0, 0),
                angular=Vector3(0, 0, 0)
            )
        )
    
    def get_state(self):
        self.state.pose.position.x += 1
        
        return self.state
    
    def reset_state(self):
        self.__init__()

aircraft = Aircraft()

# Emit updates to the frontend via WebSocket
def send_aircraft_state():
    while True:
        socketio.emit('aircraft_state_update', asdict(aircraft.get_state()))
        eventlet.sleep(1)  # Send data every second

@socketio.on('reset_aircraft_state')
def reset_aircraft_state():
    # Reset to default state
    aircraft.reset_state()
    socketio.emit('aircraft_state_update', asdict(aircraft.get_state()))  # Emit the updated state


@app.route('/')
def index():
    return "WebSocket server is running..."

if __name__ == "__main__":
    # Run the background task for sending aircraft state updates
    socketio.start_background_task(send_aircraft_state)
    socketio.run(app, host='0.0.0.0', port=5000)
