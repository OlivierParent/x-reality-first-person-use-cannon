import * as THREE from "three";
import { useBox } from "@react-three/cannon";
import { Box } from "@react-three/drei";

export default (props) => {
  const args = [2, 0.025, 10];
  const rotation = [THREE.MathUtils.degToRad(35), 0, 0];
  const [ref] = useBox(() => ({
    ...props,
    args,
    mass: 0,
    rotation,
  }));

  return (
    <mesh ref={ref}>
      <boxBufferGeometry args={args} />
      <meshBasicMaterial color={0x666666} side={THREE.DoubleSide} />
    </mesh>
  );
};
