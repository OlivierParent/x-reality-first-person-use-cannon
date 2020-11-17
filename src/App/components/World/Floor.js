import * as THREE from "three";
import { usePlane } from "@react-three/cannon";
import { Plane } from "@react-three/drei";

export default (props) => {
  const [ref] = usePlane(() => ({
    ...props,
    mass: 0,
    rotation: [THREE.MathUtils.degToRad(-90), 0, 0],
  }));

  return (
    <Plane args={[10, 10]} ref={ref}>
      <meshBasicMaterial
        color={0xcccccc}
        side={THREE.DoubleSide}
        wireframe={false}
      />
    </Plane>
  );
};
