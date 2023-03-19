import React from "react";
import { screamToInsideVoice } from "../../common/string-handling";
import { SoundButtonProps } from "../SoundButton/SoundButton";

function SoundButtonHover(props: SoundButtonProps) {
  return (
    <>
      <strong>{"Name: "}</strong>{props.sound.name}
      <br />
      <strong>{"Tags: "}</strong>{props.sound.tags.map(tag => screamToInsideVoice(tag)).join(', ')}
    </>
  );
}

export default SoundButtonHover;
