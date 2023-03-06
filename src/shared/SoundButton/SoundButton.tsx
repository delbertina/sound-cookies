import './SoundButton.scss';
import { Button, Tooltip } from "@mui/material";
import React, { useState } from "react";
import useSound from "use-sound";
import { getSoundAssetPath, msToTime } from "../../common/string-handling";
import { DefaultEmoji, SoundData, WhoEmojis } from "../../types/sound-types";
import SoundButtonHover from "../SoundButtonHover/SoundButtonHover";

export interface SoundButtonProps {
  sound: SoundData;
}

function SoundButton(props: SoundButtonProps) {
    const [isOff, setIsOff] = useState({
      state: true,
    });
  
    const playbackRate = 1;
  
    const [play, { stop, duration }] = useSound(
      getSoundAssetPath(props.sound.file),
      {
        playbackRate,
        volume: 0.5,
        onend: () => {
          setIsOff({ state: true });
        },
      }
    );
  
    const handleClick = () => {
      setIsOff({ state: !isOff.state });
      if (isOff.state) {
        play();
      } else {
        stop();
      }
    };
  
    return (
      <Tooltip placement="top" title={<SoundButtonHover sound={props.sound} />}>
        <Button
          variant="contained"
          onClick={handleClick}
          className="sound-button"
        >
          <div className='sound-button-play'>{isOff.state ? "⏵︎" : "⏸︎"}</div>
          <div className='sound-button-emoji'>
            {WhoEmojis[props.sound.who as keyof typeof WhoEmojis] ?? DefaultEmoji}
          </div>
          <div className='sound-button-name'>{props.sound.name}</div> 
          <div className='sound-button-time'>
            &nbsp;-&nbsp;
            {msToTime(duration ?? 0)}
          </div>
        </Button>
      </Tooltip>
    );
  }

  export default SoundButton