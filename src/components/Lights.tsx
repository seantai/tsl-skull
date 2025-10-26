import { Environment } from '@react-three/drei';

export const Lights = () => {
  return (
    <>
      <ambientLight intensity={0} />
      {/* <directionalLight position={[10, 10, 10]} intensity={4} /> */}
      <Environment
        preset="studio"
        environmentRotation={[0.8, 1, 0]}
        environmentIntensity={9}
      />
    </>
  );
};
