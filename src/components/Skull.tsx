import { CameraControls, useGLTF } from '@react-three/drei';
import {
  extend,
  useThree,
  type ReactThreeFiber,
  type ThreeToJSXElements,
  type ThreeEvent
} from '@react-three/fiber';
import { animate, type JSAnimation } from 'animejs';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { add, mul, normalLocal, sub, texture, uniform, uv } from 'three/tsl';
import * as THREE from 'three/webgpu';
import { MeshStandardNodeMaterial, Texture } from 'three/webgpu';
import { calculateVertexNormals } from '../nodes/calculateVertexNormals';

declare module '@react-three/fiber' {
  interface ThreeElements extends ThreeToJSXElements<typeof THREE> {
    MeshStandardNodeMaterial: ReactThreeFiber.ThreeElement<
      typeof MeshStandardNodeMaterial
    >;
  }
}
extend({ MeshStandardNodeMaterial });

// Track animation with its associated ripple slot
interface TrackedAnimation {
  animation: JSAnimation;
  slotIndex: number;
}

export const Skull = () => {
  const skull = useGLTF('skull_simple.glb');

  const meshRef = useRef<THREE.Group>(null);
  const animationsRef = useRef<TrackedAnimation[]>([]);
  const rockAnimationRef = useRef<JSAnimation | null>(null);

  const controls = useThree((s) => s.controls) as CameraControls;

  const { nodes, materials } = useMemo(() => {
    return {
      nodes: skull.nodes,
      materials: {
        rosa: (skull.nodes.defaultMaterial as THREE.Mesh)
          .material as THREE.MeshStandardMaterial
      }
    };
  }, [skull]);

  const { customMaterials, rippleUniforms } = useMemo(() => {
    const rosaMaterial = new MeshStandardNodeMaterial();
    const originalRosa = materials.rosa;

    // Interactive ripple parameters - support up to 20 simultaneous ripples
    const maxRipples = 20;
    const rippleIntersections = Array.from({ length: maxRipples }, () =>
      uniform(new THREE.Vector3(0, 0, 0))
    );
    const rippleProgresses = Array.from({ length: maxRipples }, () =>
      uniform(0)
    );
    const rippleStrengths = Array.from({ length: maxRipples }, () =>
      uniform(0)
    );
    const ringWidth = uniform(0.13);

    // Calculate vertex normals with ripple effect
    const { positionNode, normalNode } = calculateVertexNormals(
      (pos) => {
        let totalDisplacement = normalLocal.mul(0); // Start with zero

        // Apply all active ripples
        for (let rippleIdx = 0; rippleIdx < maxRipples; rippleIdx++) {
          const rippleProgress = rippleProgresses[rippleIdx];
          const intersection = rippleIntersections[rippleIdx];
          const rippleStrength = rippleStrengths[rippleIdx];

          const diff = sub(pos, intersection);
          const dist = diff.dot(diff).sqrt();

          const numRings = 5;
          for (let i = 0; i < numRings; i++) {
            const delay = i * 0.15;
            const intensity = 1.0 - i * 0.15;
            const ringDist = mul(rippleProgress.sub(delay).max(0), 3.0);
            const innerEdge = ringDist.sub(ringWidth);
            const outerEdge = ringDist.add(ringWidth);

            const ringEffect = dist
              .smoothstep(innerEdge, ringDist)
              .sub(dist.smoothstep(ringDist, outerEdge))
              .mul(intensity);

            totalDisplacement = add(
              totalDisplacement,
              mul(normalLocal, mul(ringEffect, rippleStrength))
            );
          }
        }

        return add(pos, totalDisplacement);
      },
      { epsilon: 0.002 }
    );

    rosaMaterial.positionNode = positionNode;
    rosaMaterial.colorNode = mul(
      normalNode,
      texture(originalRosa.map as Texture, uv())
    );
    rosaMaterial.normalNode = mul(
      normalNode,
      texture(originalRosa.normalMap as Texture, uv()),
      3
    );
    rosaMaterial.roughnessNode = texture(
      originalRosa.roughnessMap as Texture,
      uv()
    ).g;
    rosaMaterial.roughness = 0.84317;
    rosaMaterial.metalnessNode = texture(
      originalRosa.metalnessMap as Texture,
      uv()
    ).b;
    rosaMaterial.metalness = 1;
    rosaMaterial.aoNode = texture(originalRosa.roughnessMap as Texture, uv()).r;

    // Return both materials and uniforms
    return {
      customMaterials: { rosa: rosaMaterial },
      rippleUniforms: {
        rippleIntersections,
        rippleProgresses,
        rippleStrengths,
        ringWidth
      }
    };
  }, [materials]);

  useEffect(() => {
    if (meshRef.current && controls) {
      controls.fitToSphere(meshRef.current, true);
    }
  }, [controls]);

  // Rocking animation
  useEffect(() => {
    if (!meshRef.current) return;

    // Set initial rotation
    meshRef.current.rotation.y = -Math.PI / 4;

    // Track the base Y offset from pointer interactions separately
    const rockingOffset = { y: 0 };

    const rotationWrapper = {
      _rotation: -Math.PI / 4, // Start at -45 degrees
      get rotation() {
        return this._rotation;
      },
      set rotation(v) {
        this._rotation = v;
        if (meshRef.current) {
          meshRef.current.rotation.y = v;
        }
      }
    };

    const positionWrapper = {
      _rockY: 0,
      get rockY() {
        return this._rockY;
      },
      set rockY(v) {
        this._rockY = v;
        rockingOffset.y = v;
        if (meshRef.current) {
          // Add rocking offset to whatever the current position is from pointer interaction
          const currentBase = meshRef.current.position.y - rockingOffset.y + v;
          meshRef.current.position.y = currentBase;
        }
      }
    };

    // Infinite rocking animation using custom looping with slowdown at extremes
    const animateRock = () => {
      // Rotation animation
      rockAnimationRef.current = animate(rotationWrapper, {
        rotation: Math.PI / 4, // Rock to +45 degrees
        duration: 4000,
        ease: 'inOutCubic' // Slower at the ends, creates natural slowdown
      });

      // Independent Y position animation with different timing
      animate(positionWrapper, {
        rockY: 0.05, // Slight upward movement
        duration: 3000,
        ease: 'inOutCubic'
      });

      rockAnimationRef.current.then(() => {
        // Rotation animation back
        rockAnimationRef.current = animate(rotationWrapper, {
          rotation: -Math.PI / 4, // Rock back to -45 degrees
          duration: 4000,
          ease: 'inOutCubic' // Slower at the ends, creates natural slowdown
        });

        // Independent Y position animation back with different timing
        animate(positionWrapper, {
          rockY: 0, // Back to original position
          duration: 3000,
          ease: 'inOutCubic'
        });

        rockAnimationRef.current.then(animateRock);
      });
    };

    animateRock();

    return () => {
      rockAnimationRef.current?.pause();
    };
  }, []);

  const handlePointerEnter = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      document.body.style.cursor = 'pointer';
      if (e.intersections[0] && meshRef.current) {
        // Use uniforms from closure scope, not from userData
        const uniforms = rippleUniforms;

        // Clean up completed animations from our tracking array first
        animationsRef.current = animationsRef.current.filter(
          (tracked) => !tracked.animation.completed
        );

        // Get list of slots that are still animating
        const animatingSlots = new Set(
          animationsRef.current.map((t) => t.slotIndex)
        );

        // Count available slots
        const availableSlots = [];
        const completedSlots = [];

        for (let i = 0; i < uniforms.rippleProgresses.length; i++) {
          if (!animatingSlots.has(i)) {
            if (uniforms.rippleProgresses[i].value === 0) {
              availableSlots.push(i);
            } else if (uniforms.rippleProgresses[i].value >= 0.99) {
              completedSlots.push(i);
            }
          }
        }

        // Aggressively fade old ripples when approaching the limit
        const usedSlots =
          uniforms.rippleProgresses.length - availableSlots.length;

        if (usedSlots >= 15 && completedSlots.length > 0) {
          // When at 15+ slots used, instantly clear the oldest completed ones
          const slotsToFade = completedSlots.slice(
            0,
            Math.min(5, completedSlots.length)
          );

          slotsToFade.forEach((slotIdx) => {
            // Skip if already fading or strength is very low
            if (uniforms.rippleStrengths[slotIdx].value < 0.001) {
              uniforms.rippleProgresses[slotIdx].value = 0;
              uniforms.rippleStrengths[slotIdx].value = 0;
              return;
            }

            const fadeWrapper = {
              _value: uniforms.rippleStrengths[slotIdx].value,
              get value() {
                return this._value;
              },
              set value(v) {
                this._value = v;
                uniforms.rippleStrengths[slotIdx].value = v;
              }
            };

            // Super short fade (200ms) when approaching limit
            const fadeAnimation = animate(fadeWrapper, {
              value: 0,
              duration: 200,
              ease: 'out(2)'
            });

            fadeAnimation.then(() => {
              uniforms.rippleProgresses[slotIdx].value = 0;
            });

            animationsRef.current.push({
              animation: fadeAnimation,
              slotIndex: slotIdx
            });
          });
        } else if (availableSlots.length < 3 && completedSlots.length > 0) {
          // Moderate fade when getting low on slots
          const slotsToFade = completedSlots.slice(
            0,
            Math.min(3 - availableSlots.length, completedSlots.length)
          );

          slotsToFade.forEach((slotIdx) => {
            if (uniforms.rippleStrengths[slotIdx].value < 0.001) {
              uniforms.rippleProgresses[slotIdx].value = 0;
              uniforms.rippleStrengths[slotIdx].value = 0;
              return;
            }

            const fadeWrapper = {
              _value: uniforms.rippleStrengths[slotIdx].value,
              get value() {
                return this._value;
              },
              set value(v) {
                this._value = v;
                uniforms.rippleStrengths[slotIdx].value = v;
              }
            };

            // Moderate 2-second fade
            const fadeAnimation = animate(fadeWrapper, {
              value: 0,
              duration: 2000,
              ease: 'linear'
            });

            fadeAnimation.then(() => {
              uniforms.rippleProgresses[slotIdx].value = 0;
            });

            animationsRef.current.push({
              animation: fadeAnimation,
              slotIndex: slotIdx
            });
          });
        }

        // Find an available ripple slot - prefer slots at 0
        let rippleIndex = -1;

        if (availableSlots.length > 0) {
          rippleIndex = availableSlots[0];
        } else if (completedSlots.length > 0) {
          // If no fresh slots but we have completed ones, force-reset the oldest one
          rippleIndex = completedSlots[0];
          uniforms.rippleProgresses[rippleIndex].value = 0;
          uniforms.rippleStrengths[rippleIndex].value = 0;
        } else {
          return;
        }

        // Set new intersection point for this ripple
        const point = e.intersections[0].point;
        uniforms.rippleIntersections[rippleIndex].value.copy(point);

        // Use random displacement strength between 0.01 and 0.05 for this specific ripple
        const randomDisplacement = 0.01 + Math.random() * 0.04;
        uniforms.rippleStrengths[rippleIndex].value = randomDisplacement;

        // Create a wrapper object that updates the uniform
        const progressWrapper = {
          _value: 0,
          get value() {
            return this._value;
          },
          set value(v) {
            this._value = v;
            uniforms.rippleProgresses[rippleIndex].value = v;
          }
        };

        // Animate this ripple expansion smoothly from 0 to 1
        const animation = animate(progressWrapper, {
          value: 1,
          duration: 3000,
          ease: 'out(4)'
        });

        animationsRef.current.push({
          animation,
          slotIndex: rippleIndex
        });

        // Elastic movement animation
        const targetPosition = point.clone().multiplyScalar(-0.05);
        animate(meshRef.current.position, {
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z,
          duration: 3500,
          ease: 'outElastic(1, 0.7)'
        });
      }
    },
    [rippleUniforms]
  );

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = 'auto';
  }, []);

  useEffect(() => {
    return () => {
      // Clean up all animations
      animationsRef.current.forEach((tracked) => tracked.animation.pause());
      customMaterials.rosa.dispose();
    };
  }, [customMaterials]);

  return (
    <mesh
      ref={meshRef}
      receiveShadow
      geometry={(nodes.defaultMaterial as THREE.Mesh).geometry}
      material={customMaterials.rosa}
      onPointerEnter={handlePointerEnter}
      onPointerOut={handlePointerOut}
    />
  );
};
