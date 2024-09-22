import io from 'socket.io-client';
import { Quaternion, Vector3 } from 'three';
import { useState, useEffect } from 'react';

// Connect to the WebSocket server
const socket = io('http://localhost:5000');  // Flask-SocketIO server

interface State {
  pose: {
    position: Vector3,
    orientation: Quaternion
  },
  velocity: {
    linear: Vector3,
    angular: Vector3,
  },
  acceleration: {
    linear: Vector3,
    angular: Vector3
  }
}

// Function to send the reset command to the backend
export const sendReset = () => {
    socket.emit('reset_aircraft_state');  // Emit the reset event
};

export const useAircraftState = () => {
    const [aircraftState, setAircraftState] = useState<State>({
        pose: {
          position: new Vector3(0, 0, 0),
          orientation: new Quaternion(0, 0, 0, 1)
        },
        velocity: {
          linear: new Vector3(0,0,0),
          angular: new Vector3(0,0,0)
        },
        acceleration: {
          linear: new Vector3(0,0,0),
          angular: new Vector3(0,0,0)
        }
      });
    
      const updateAircraftState = (data: any): void => {
        const state = {    
            pose: {
                position: new Vector3(data.pose.position.x, data.pose.position.y, data.pose.position.z),
                orientation: new Quaternion(0, 0, 0, 1)
            },
            velocity: {
                linear: new Vector3(0,0,0),
                angular: new Vector3(0,0,0)
            },
            acceleration: {
                linear: new Vector3(0,0,0),
                angular: new Vector3(0,0,0)
            }
        }
        setAircraftState(state);
      }

    useEffect(() => {
      const socket = io('http://localhost:5000');  // Connect to the WebSocket backend
  
      // Listen for aircraft state updates
      socket.on('aircraft_state_update', (data: State) => {
        updateAircraftState(data);  // Update the state with the latest data
      });
  
      // Cleanup the WebSocket connection when the component using the hook unmounts
      return () => {
        socket.off('aircraft_state_update');
        socket.disconnect();
      };
    }, []);
  
    return aircraftState;
  };