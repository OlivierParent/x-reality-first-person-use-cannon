import { useBox } from "@react-three/cannon";
import { Box } from "@react-three/drei";

const BOX_SIZE = 1;
const NUMBER_OF_BOXES = 10;
const PLANE_SIZE = 10;
const RANDOM_COORDINATES = new Array(NUMBER_OF_BOXES).fill(null).map(() => {
  const x = Math.floor(Math.random() * PLANE_SIZE - PLANE_SIZE / 2);
  const y = BOX_SIZE / 2;
  const z = Math.floor(Math.random() * PLANE_SIZE - PLANE_SIZE / 2);

  return [x, y, z];
});

export default (props) => {
  const args = [BOX_SIZE, BOX_SIZE, BOX_SIZE];
  const mass = 0; // kg
  let boxes = new Array(NUMBER_OF_BOXES).fill(null).map((box, index) => {
    const position = RANDOM_COORDINATES[index];
    const [ref] = useBox(() => ({
      ...props,
      args,
      mass,
      position,
    }));

    return { ref };
  });

  return (
    <>
      {boxes.map((box, index) => {
        console.log("Box:", index);
        return (
          <Box args={args} key={index} ref={box.ref}>
            <meshBasicMaterial
              color={0xffffff * Math.random()}
              opacity={0.75}
              transparent={true}
            />
          </Box>
        );
      })}
    </>
  );
};
