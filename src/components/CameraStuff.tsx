import { useRef } from 'react';
import { CameraControls, PerspectiveCamera } from '@react-three/drei';

export const CameraStuff = () => {
  const controlsRef = useRef<CameraControls>(null);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[8, 50, 100]}
        fov={34}
        near={0.1}
        far={1000}
      />
      <CameraControls
        ref={controlsRef}
        makeDefault
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.5}
        minDistance={1}
        maxDistance={8}
        smoothTime={0.1}
        mouseButtons={{
          left: 0,
          middle: 0,
          right: 0,
          wheel: 0
        }}
        touches={{
          one: 0,
          two: 0,
          three: 0
        }}
      />
    </>
  );
};
