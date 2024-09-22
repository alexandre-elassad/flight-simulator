import React from 'react';
import * as THREE from 'three'; // Import Three.js types
import { useAircraftState, sendReset } from '../client';

const Sidebar: React.FC = () => {
  const aircraftState = useAircraftState();

  return (
    <div style={styles.sidebar}>
      <h2>Aircraft State</h2>
      <div>
        <h4>Position:</h4>
        <p>X: {aircraftState.pose.position.x.toFixed(2)}</p>
        <p>Y: {aircraftState.pose.position.y.toFixed(2)}</p>
        <p>Z: {aircraftState.pose.position.z.toFixed(2)}</p>
      </div>
      <div>
        <h4>Velocity:</h4>
        <p>Vx: {aircraftState.velocity.linear.x.toFixed(2)}</p>
        <p>Vy: {aircraftState.velocity.linear.y.toFixed(2)}</p>
        <p>Vz: {aircraftState.velocity.linear.z.toFixed(2)}</p>
      </div>
      <div>
        <h4>Orientation (Quaternion):</h4>
        <p>X: {aircraftState.pose.orientation.x.toFixed(2)}</p>
        <p>Y: {aircraftState.pose.orientation.y.toFixed(2)}</p>
        <p>Z: {aircraftState.pose.orientation.z.toFixed(2)}</p>
        <p>W: {aircraftState.pose.orientation.w.toFixed(2)}</p>
      </div>
    <button onClick={sendReset}> Reset Aircraft State</button>
    </div>
  );
};

const styles = {
  sidebar: {
    position: 'absolute' as 'absolute',
    top: '0',
    left: '0',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    width: '250px',
    fontFamily: 'Arial, sans-serif',
  },
};

export default Sidebar;
