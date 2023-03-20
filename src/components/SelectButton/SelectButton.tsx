import './SelectButton.scss';
import { Button, Tooltip } from "@mui/material";
import React from "react";
import { DefaultEmoji, SoundData, TagEmojis } from "../../types/sound-types";
import SoundButtonHover from "../SoundButtonHover/SoundButtonHover";

export interface SelectButtonProps {
  sound: SoundData;
  buttonClicked: () => void;
}

function SelectButton(props: SelectButtonProps) {
  
    return (
      <Tooltip placement="top" disableInteractive title={<SoundButtonHover sound={props.sound} />}>
        <Button
          variant="contained"
          color="warning"
          onClick={() => props.buttonClicked()}
          className="select-button"
        >
          <div className='select-button-emoji'>
            {props.sound.tags.map(tag => (
              TagEmojis[tag as keyof typeof TagEmojis] ?? DefaultEmoji
            ))}
          </div>
          <div className='select-button-name'>{props.sound.name}</div> 
        </Button>
      </Tooltip>
    );
  }

  export default SelectButton