import {
  varying,
  vec3,
  Fn,
  float,
  positionLocal,
  normalLocal,
  normalize,
  negate,
  cross,
  abs,
  transformNormalToView
} from 'three/tsl';
import type { Node } from 'three/src/nodes/Nodes.js';

/**
 * Creates a reusable TSL node that calculates vertex normals for displaced geometry.
 * It calculates vertex normals by sampling neighboring positions and computing the cross product
 * of the displaced tangent and bitangent vectors.
 *
 * @param calculatePosition - A function that takes a position node and returns the transformed position node
 * @param config - optional epsilon value depending on the geometry
 * @returns An object containing positionNode, normalNode, and the vertexNormal 'varying'
 *
 * @example
 * ```ts
 * import { uniform, mx_noise_float, vec3 } from 'three/tsl';
 * import { calculateVertexNormals } from './calculateVertexNormals';
 *
 * const time = uniform(0.0);
 * const { positionNode, normalNode, vertexNormal } = calculateVertexNormals(
 *   (pos) => {
 *     const noise = mx_noise_float(vec3(pos).add(vec3(time))).mul(0.2);
 *     return pos.add(noise);
 *   },
 *   { epsilon: 0.001 }
 * );
 *
 * // Use in your material
 * material.positionNode = positionNode;
 * material.normalNode = normalNode;
 * material.colorNode = vertexNormal.y
 * ```
 **/

export const calculateVertexNormals = (
  calculatePosition: (position: Node) => any,
  config: CalculateVertexNormalsConfig = {}
): CalculateVertexNormalsNodes => {
  const { epsilon = 0.001 } = config;

  // Create a 'varying' to pass to fragment shader
  const vertexNormal = varying(vec3(), 'vertexNormal');

  // Create the orthogonal function
  const orthogonal = createOrthogonalFn();

  // Position node that calculates and stores the vertex normal
  const positionNode = Fn(() => {
    const pos = positionLocal;

    // Apply the transformation to the current position
    const transformedPos = calculatePosition(pos);

    // Calculate tangent and bitangent for normal recalculation
    const theta = float(epsilon);

    // Calculate orthogonal vectors using the improved method
    const vecTangent = orthogonal();
    const vecBiTangent = normalize(cross(normalLocal, vecTangent));

    // Sample neighboring positions
    const neighbor1 = pos.add(vecTangent.mul(theta));
    const neighbor2 = pos.add(vecBiTangent.mul(theta));

    // Apply the same transformation to neighbors
    const transformedNeighbor1 = calculatePosition(neighbor1);
    const transformedNeighbor2 = calculatePosition(neighbor2);

    // Calculate displaced tangent and bitangent
    const displacedTangent = transformedNeighbor1.sub(transformedPos);
    const displacedBitangent = transformedNeighbor2.sub(transformedPos);

    // Calculate the new normal via cross product
    const newNormal = normalize(cross(displacedTangent, displacedBitangent));

    // Ensure the normal faces the correct direction
    const correctedNormal = newNormal
      .dot(normalLocal)
      .lessThan(0.0)
      .select(newNormal.negate(), newNormal);

    // Store in varying to use in fragment shader
    vertexNormal.assign(correctedNormal);

    return transformedPos;
  })();

  // Normal node that transforms the normal to view space for use in the material
  const normalNode = Fn(() => {
    return transformNormalToView(vertexNormal);
  })();

  return {
    positionNode,
    normalNode,
    vertexNormal
  };
};

export interface CalculateVertexNormalsNodes {
  /**
   * Position node with normal calculation embedded.
   * Use this as the positionNode in your material.
   */
  positionNode: Node;

  /**
   * Normal node in view space, ready to use in materials.
   * Use this as the normalNode in your material.
   */
  normalNode: Node;

  /**
   * The 'varying' that stores the vertex normal.
   * Can be used to drive a color node in your material.
   * @example
   * ```ts
   * const colorNode = vertexNormal.y
   * ```
   */
  vertexNormal: ReturnType<typeof varying>;
}

export interface CalculateVertexNormalsConfig {
  /**
   * The epsilon value for normal calculation (distance to sample neighbors)
   * @default 0.001
   */
  epsilon?: number;
}

/**
 * Creates an orthogonal vector to the given normal vector.
 *
 * @internal
 */
const createOrthogonalFn = () => {
  return Fn(() => {
    const normal = normalLocal;
    const condition = abs(normal.x).greaterThan(abs(normal.z));
    return condition.select(
      normalize(vec3(negate(normal.y), normal.x, 0.0)),
      normalize(vec3(0.0, negate(normal.z), normal.y))
    );
  });
};
