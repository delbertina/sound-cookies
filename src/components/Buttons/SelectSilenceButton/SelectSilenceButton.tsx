import "./SelectSilenceButton.scss";
import { Button, Tooltip } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { EditIndicationEmoji, SoundData } from "../../../types/sound-types";
import SoundButtonHover from "../SoundButtonHover/SoundButtonHover";
import useSound from "use-sound";
import { getSoundAssetPath } from "../../../common/string-handling";
import SelectSilenceDialog from "../SelectSilenceDialog/SelectSilenceDialog";

export interface SelectSilenceButtonProps {
  sound: SoundData;
  disabled?: boolean;
  buttonClicked: () => void;
  durationUpdated: (newValue: number) => void;
}

export interface SelectSilenceButtonRef {
  handleClick: () => void;
}

const SelectSilenceButton = forwardRef(
  (props: SelectSilenceButtonProps, ref) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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

    const handleDialogOpen = (): void => {
      setIsDialogOpen(true);
    };

    const handleDialogClose = (newValue: number): void => {
      setIsDialogOpen(false);

      if (newValue <= 0) props.buttonClicked();
      if (newValue === props.sound.duration) return;

      props.durationUpdated(newValue);
    };

    return (
      <>
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
              onClick={() => handleDialogOpen()}
              className="select-silence-button"
            >
              <div className="select-silence-button-name">
                {EditIndicationEmoji +
                  props.sound.name +
                  " (" +
                  (Math.round(props.sound.duration * 100) / 100).toFixed(2) +
                  "s)"}
              </div>
            </Button>
          </div>
        </Tooltip>
        <SelectSilenceDialog
          isOpen={isDialogOpen}
          oldValue={props.sound.duration}
          onClose={(newValue: number) => handleDialogClose(newValue)}
        />
      </>
    );
  }
);

export default SelectSilenceButton;
