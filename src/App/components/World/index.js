import React from "react";
import { Physics } from "@react-three/cannon";
import Boxes from "./Boxes";
import Floor from "./Floor";
import Player from "./Player";
import Stairs from "./Stairs";

export default () => {
  return (
    <>
      <Physics
        // allowSleep={false}
        // iterations={10}
        // defaultContactMaterial={
        //   {
        //     // friction: 0,
        //     // restitution: 0.7,
        //     // contactEquationStiffness: 1e7,
        //     // contactEquationRelaxation: 1,
        //     // frictionEquationStiffness: 1e7,
        //     // frictionEquationRelaxation: 2,
        //   }
        // }
        gravity={[0, -9.80665, 0]}
        // tolerance={0.0001}
      >
        <Floor />
        <Stairs />
        <Player />
        {/* <Boxes /> */}
      </Physics>
    </>
  );
};
