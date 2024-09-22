import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

import * as THREE from 'three';
import Aircraft from './Aircraft/Aircraft';
// import World from './World/World';
import Sidebar from './Sidebar/Sidebar'; // Ensure the correct path
import CameraController from './CameraController/CameraController';


const App: React.FC = () => {
  return (
    <div style={styles.app}>
      { /* Sidebar to show the aircraft state */ }
      
      {/* The canvas taking up the entire page */}
      <Canvas style={styles.canvas}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Pass the callback to update the aircraft state */}
        <Aircraft />
        <Stars />
        <OrbitControls />
        <CameraController />
      </Canvas>
      <Sidebar/>

    </div>
  );
};

const styles = {
  app: {
    width: '100vw',
    height: '100vh',
    margin: 0,
    display: 'flex',
    position: 'relative' as 'relative', // For absolute positioning of sidebar
  },
  canvas: {
    flex: 1, // The canvas will take all available space
  },
};

export default App;
