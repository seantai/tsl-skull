import { Suspense } from 'react';
import { Stats } from '@react-three/drei';
import { CameraStuff } from './components/CameraStuff';
import { CanvasWrapper } from './components/CanvasWrapper';
import { Loader } from './components/Loader';
import { Lights } from './components/Lights';
import { LoadingIndicator } from './components/LoadingIndicator';
import { Postprocess } from './components/Postprocess';
import { Skull } from './components/Skull';
import { UIFrame } from './components/UIFrame';

const Scene = () => {
  return (
    <>
      <Suspense fallback={null}>
        <Skull />
        <Postprocess />
        <Loader />
      </Suspense>

      <Lights />
      <CameraStuff />
      {import.meta.env.DEV && <Stats />}
    </>
  );
};

export default function App() {
  return (
    <div className="relative min-h-screen">
      <LoadingIndicator />
      <UIFrame />

      <CanvasWrapper>
        <Scene />
      </CanvasWrapper>
    </div>
  );
}
