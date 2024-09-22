import React, { useRef } from 'react';
import * as THREE from 'three'; // Import Three.js

import { useAircraftState } from '../client';

const Aircraft: React.FC = () => {
  const aircraftRef = useRef<THREE.Mesh>(null);
  // Access the camera from useThree
  const aircraftState = useAircraftState();
  console.log(aircraftState);

  return (
    <mesh position={aircraftState.pose.position}
      ref={aircraftRef}
    >
      <boxGeometry args={[1, 0.5, 3]} />
      <meshStandardMaterial color={'orange'} />
      {/* Wings */}
      <mesh position={[0, 0, -0.5]}>
        <boxGeometry args={[5, 0.1, 0.5]} />
        <meshStandardMaterial color={'gray'} />
      </mesh>
      {/* Tail */}
      <mesh position={[0, 0.5, 1.2]}>
        <boxGeometry args={[0.1, 0.5, 0.5]} />
        <meshStandardMaterial color={'gray'} />
      </mesh>
    </mesh>
  );
};

export default Aircraft;
