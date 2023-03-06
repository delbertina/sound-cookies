import React from "react";
import { screamToInsideVoice } from "../../common/string-handling";
import { SoundButtonProps } from "../SoundButton/SoundButton";

function SoundButtonHover(props: SoundButtonProps) {
  return (
    <>
      <strong>{"Name: "}</strong>{props.sound.name}
      <br />
      <strong>{"Who: "}</strong>{screamToInsideVoice(props.sound.who)}
      {/* <br />
      <strong>{"Source: "}</strong>{props.sound.source}
      <br />
      <strong>{"Category: "}</strong>{props.sound.category} */}
    </>
  );
}

export default SoundButtonHover;
