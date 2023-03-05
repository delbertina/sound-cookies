import React from "react";
import { SoundButtonProps } from "../SoundButton/SoundButton";

function SoundButtonHover(props: SoundButtonProps) {
  return (
    <>
      <strong>{"Name: " + props.sound.name}</strong>
      <br />
      {"Source: " + props.sound.source}
      <br />
      {"Category: " + props.sound.category}
    </>
  );
}

export default SoundButtonHover;
