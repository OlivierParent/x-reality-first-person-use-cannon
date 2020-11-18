import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useSphere } from "@react-three/cannon";
import { useFrame } from "react-three-fiber";
import { PointerLockControls, Sphere } from "@react-three/drei";
import { KeyboardControls } from "App/lib";

const BOX_SIZE = 0.5; // m
const FORCE_FORWARD_DIRECTION = 3;
const FORCE_RIGHT_DIRECTION = 1;

export default (props) => {
  console.log("Physics");
  const pointerRef = useRef();
  const args = BOX_SIZE; // radius in m
  const mass = 75; // kg
  const position = [0, 5, 2];
  const [playerRef, playerApi] = useSphere(() => ({
    ...props,
    args,
    mass,
    position,
  }));

  useEffect(() => {
    console.info("useEffect: KeyboardControls");
    KeyboardControls.addEventListeners();
    // KeyboardControls.setKeyboardAzerty();

    return KeyboardControls.removeEventListeners;
  }, []);

  const velocity = useRef([0, 0, 0]);
  useEffect(() => {
    playerApi.velocity.subscribe((v) => (velocity.current = v));
  }, []);

  useFrame(() => {
    const camera = pointerRef.current.getObject();
    const player = playerRef.current;

    // Match Player direction to Camera direction.
    player.quaternion.copy(camera.quaternion);

    // Move Player
    const velocityVector = new THREE.Vector3(
      KeyboardControls.rightDirection * FORCE_RIGHT_DIRECTION,
      0,
      KeyboardControls.forwardDirection * -FORCE_FORWARD_DIRECTION
    );
    velocityVector.applyQuaternion(player.quaternion);
    velocityVector.y = velocity.current[1];
    playerApi.velocity.copy(velocityVector);

    camera.position.copy(player.position);
    camera.position.y += 1.25; // 1,75 m
  });

  return (
    <>
      <PointerLockControls ref={pointerRef} />
      <Sphere args={[BOX_SIZE, 8, 8]} ref={playerRef}>
        <meshBasicMaterial color={0x00ff00} wireframe={true} />
      </Sphere>
    </>
  );
};
