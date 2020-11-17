import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useSphere } from "@react-three/cannon";
import { useFrame } from "react-three-fiber";
import { PointerLockControls, Sphere } from "@react-three/drei";
import { KeyboardControls } from "App/lib";

export default (props) => {
  console.log("Physics");
  const pointerRef = useRef();
  const [playerRef, playerApi] = useSphere(() => ({
    ...props,
    mass: 75,
    position: [0, 5, 2],
  }));

  useEffect(() => {
    console.info("useEffect: KeyboardControls");
    KeyboardControls.addEventListeners();
    // KeyboardControls.setKeyboardAzerty();

    return KeyboardControls.removeEventListeners;
  }, []);

  useEffect(() => {
    console.info("useEffect: pointerRef");
    if (pointerRef.current) {
      pointerRef.current.getObject().position.y = 1.75; // m
    }
  }, []);

  const velocity = useRef([0, 0, 0]);
  useEffect(() => {
    playerApi.velocity.subscribe((v) => (velocity.current = v));
  }, []);

  useFrame(() => {
    // Match Player direction to Camera direction.
    playerRef.current.quaternion.copy(
      pointerRef.current.getObject().quaternion
    );

    // Move Player
    const force = 3;
    const forceThreeVec = new THREE.Vector3(
      KeyboardControls.rightDirection * 1,
      0,
      -KeyboardControls.forwardDirection * force
    );
    forceThreeVec.applyQuaternion(playerRef.current.quaternion);
    forceThreeVec.y = velocity.current[1];
    playerApi.velocity.copy(forceThreeVec);

    pointerRef.current
      .getObject()
      .position.copy(
        new THREE.Vector3(
          playerRef.current.position.x,
          playerRef.current.position.y + 0.75,
          playerRef.current.position.z
        )
      );
  });

  return (
    <>
      <PointerLockControls ref={pointerRef} />
      <Sphere args={[0.5, 32, 32]} ref={playerRef} />
    </>
  );
};
