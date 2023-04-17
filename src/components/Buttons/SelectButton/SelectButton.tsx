import "./SelectButton.scss";
import { Button, Tooltip } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  DefaultEmoji,
  SoundData,
  SoundDataSilence,
  TagEmojis,
} from "../../../types/sound-types";
import SoundButtonHover from "../SoundButtonHover/SoundButtonHover";
import useSound from "use-sound";
import { getSoundAssetPath } from "../../../common/string-handling";

export interface SelectButtonProps {
  sound: SoundData;
  disabled?: boolean;
  buttonClicked: () => void;
}

export interface SelectButtonRef {
  handleClick: () => void;
}

const SelectButton = forwardRef((props: SelectButtonProps, ref) => {
  const [isOff, setIsOff] = useState({
    state: true,
  });

  const [play, { stop }] = useSound(getSoundAssetPath(props.sound.file), {
    volume: 0.5,
    onend: () => {
      setIsOff({ state: true });
    },
  });

  useImperativeHandle(ref, () => ({
    handleClick() {
      setIsOff({ state: !isOff.state });
      if (isOff.state) {
        play();
      } else {
        stop();
      }
    },
  }));

  return (
    <Tooltip
      placement="top"
      disableInteractive
      title={<SoundButtonHover sound={props.sound} />}
    >
      <div>
        <Button
          disabled={props.disabled}
          variant="contained"
          color="warning"
          onClick={() => props.buttonClicked()}
          className="select-button"
        >
          <div className="select-button-emoji">
            {props.sound.tags.map(
              (tag) => TagEmojis[tag as keyof typeof TagEmojis] ?? DefaultEmoji
            )}
          </div>
          <div className="select-button-name">
            {props.sound.name === SoundDataSilence.name
              ? props.sound.name +
                (" (" + props.sound.duration + 's)')
              : props.sound.name}
          </div>
        </Button>
      </div>
    </Tooltip>
  );
});

export default SelectButton;
