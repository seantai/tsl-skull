import { Bvh } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three/webgpu';
import { motion as m } from 'motion/react';
import React from 'react';

import { useSceneLoadedStore } from '../store';

export const CanvasWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isSceneLoaded } = useSceneLoadedStore();

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isSceneLoaded ? 1 : 0 }}
      transition={{ duration: 0.6, ease: [0.26, 0.05, 0.25, 1] }}
      className="pointer-events-none fixed inset-0 z-10 h-full w-full overflow-hidden">
      <Canvas
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer(props as any);
          await renderer.init();
          return renderer;
        }}
        eventSource={document.getElementById('root')!}
        eventPrefix="client">
        <Bvh firstHitOnly>{children}</Bvh>
      </Canvas>
    </m.div>
  );
};
