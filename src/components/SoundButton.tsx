import { Button, Tooltip } from "@mui/material";
import React, { useState } from "react";
import useSound from "use-sound";
import { getSoundAssetPath, msToTime } from "../common/string-handling";
import { SoundButtonProps } from "../types/sound-types";
import SoundButtonHover from "./SoundButtonHover";

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
          {isOff.state ? "⏵︎" : "⏸︎"} 🎺 <div>{props.sound.name}</div> :{" "}
          {msToTime(duration ?? 0)}
        </Button>
      </Tooltip>
    );
  }

  export default SoundButton