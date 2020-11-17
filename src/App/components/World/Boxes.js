import { useRef } from "react";
import { useBox } from "@react-three/cannon";
import { Box } from "@react-three/drei";

const BOX_SIZE = 1;
const NUMBER_OF_CUBES = 10;
const RANDOM_COORDINATES = new Array(NUMBER_OF_CUBES).fill(null).map(() => {
  const range = 10;
  return [
    Math.floor(Math.random() * range - range / 2), // left to right
    BOX_SIZE / 2,
    Math.floor(Math.random() * range - range / 2), // back to front
  ];
});

export default (props) => {
  let boxes = new Array(NUMBER_OF_CUBES).fill(null).map((box, index) => {
    const [ref] = useBox(() => ({
      ...props,
      mass: 0,
      position: RANDOM_COORDINATES[index],
    }));

    return { ref };
  });

  return (
    <>
      {boxes.map((box, index) => {
        console.log("box:", index);
        return (
          <Box args={[BOX_SIZE, BOX_SIZE, BOX_SIZE]} key={index} ref={box.ref}>
            <meshBasicMaterial color={0xffffff * Math.random()} />
          </Box>
        );
      })}
    </>
  );
};
