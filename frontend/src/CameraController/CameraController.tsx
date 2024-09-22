import { useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useAircraftState } from '../client';

const CameraController: React.FC = () => {
  const { camera } = useThree(); // Access the camera from the Three.js context
  const [isFollowing, setIsFollowing] = useState(false); // State to track if follow mode is active
  const aircraftState = useAircraftState();

  const handleKeyDown = (e: KeyboardEvent): void => {
    switch (e.key) { 
        case 'r':
      // Recenter the camera on the target position (e.g., aircraft position)
      camera.position.set(
        aircraftState.pose.position.x + 5, // Offset to position the camera behind the aircraft
        aircraftState.pose.position.y + 3, // Offset to position the camera above the aircraft
        aircraftState.pose.position.z + 10 // Adjust the distance from the aircraft
      );
      camera.lookAt(aircraftState.pose.position);
      break;
    case 'f':
        setIsFollowing((prev) => !prev);
        break;
    default:
        break;
    }
  };

  // Update the camera's position to follow the aircraft every frame if follow mode is active
  useEffect(() => {
    const followAircraft = () => {
      if (isFollowing) {
        // Update camera position to follow the target position (aircraft position)
        camera.position.set(
          aircraftState.pose.position.x + 1, // Offset to position the camera behind the aircraft
          aircraftState.pose.position.y + 1, // Offset to position the camera above the aircraft
          aircraftState.pose.position.z + 1 // Adjust the distance from the aircraft
        );
        camera.lookAt(aircraftState.pose.position); // Make the camera look at the aircraft
      }
    };
    // Continuously update the camera in follow mode
    const id = requestAnimationFrame(followAircraft);

    return () => cancelAnimationFrame(id); // Cleanup the animation frame
  }, [aircraftState.pose.position, isFollowing]); // Run the effect when the position or follow mode state changes


  // Add event listener to handle key presses
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [aircraftState.pose.position]);

  return null; // No visual output, just controlling the camera
};

export default CameraController;
