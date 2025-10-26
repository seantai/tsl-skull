import { useFrame, useThree, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { lut3D } from 'three/addons/tsl/display/Lut3DNode.js';
import { pass, renderOutput, uniform, texture3D } from 'three/tsl';
import { PostProcessing, WebGPURenderer } from 'three/webgpu';
import { LUTImageLoader } from 'three/addons/loaders/LUTImageLoader.js';
import type Lut3DNode from 'three/examples/jsm/tsl/display/Lut3DNode.js';
import { film } from 'three/examples/jsm/tsl/display/FilmNode.js';
import { createScope, animate } from 'animejs';
import { afterImage } from 'three/examples/jsm/tsl/display/AfterImageNode.js';

export const Postprocess = () => {
  const { gl } = useThree() as { gl: WebGPURenderer };
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  const postProcessingRef = useRef<PostProcessing>(null!);
  const lutPassRef = useRef<Lut3DNode | null>(null);
  const [lutIntensity, setLutIntensity] = useState(0.7);
  const animeScope = useRef<any>(null);

  const LUT_FILE = '/clayton33.png';

  // Load LUT using useLoader (suspends on initial load)
  const lutData = useLoader(LUTImageLoader, LUT_FILE);

  // Setup anime.js scope for animations (only once)
  useEffect(() => {
    animeScope.current = createScope().add((self) => {
      // Register animation method for intensity
      self?.add(
        'animateIntensity',
        (targetValue: number, currentValue: number) => {
          const animTarget = { value: currentValue };
          animate(animTarget, {
            value: targetValue,
            duration: 800,
            ease: 'out(3)',
            onUpdate: () => {
              setLutIntensity(animTarget.value);
            }
          });
        }
      );
    });

    return () => animeScope.current?.revert();
  }, []);

  // Setup post-processing pipeline with loaded LUT
  useEffect(() => {
    if (!lutData) return;

    const postProcessing = new PostProcessing(gl);
    postProcessing.outputColorTransform = false;
    postProcessingRef.current = postProcessing;

    const scenePass = pass(scene, camera);

    // Apply tone mapping first: HDR → LDR (0-1 sRGB)
    const toneMapped = renderOutput(scenePass);

    // LDR effects AFTER tone mapping (operate on display-ready values)
    const lutPass = lut3D(
      toneMapped,
      texture3D(lutData.texture3D),
      lutData.texture3D.image.width,
      uniform(lutIntensity)
    );
    lutPassRef.current = lutPass;

    const filmPass = film(lutPass, uniform(0.2));
    // const afterImagePass = afterImage(filmPass, 0.7);
    // const finalOutput = afterImagePass;
    const finalOutput = filmPass;

    postProcessing.outputNode = finalOutput;

    return () => {
      postProcessing.dispose();
    };
  }, [gl, scene, camera, lutData, lutIntensity]);

  useFrame(() => {
    if (!postProcessingRef.current) return;
    postProcessingRef.current.renderAsync();
  }, 1);

  return null;
};
