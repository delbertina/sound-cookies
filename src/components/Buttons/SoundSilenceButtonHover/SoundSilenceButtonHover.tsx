import React from "react";
import { SoundButtonProps } from "../SoundButton/SoundButton";

function SoundSilenceButtonHover(props: SoundButtonProps) {
  return (
    <>
      {"Silence (" + (Math.round(props.sound.duration * 100) / 100).toFixed(2) + "s)"}
      <br />
      <strong>{"*Click to Edit!*"}</strong>
    </>
  );
}

export default SoundSilenceButtonHover;
