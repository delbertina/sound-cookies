import "./SoundList.scss";
import React from "react";
import { SoundData } from "../../types/sound-types";
import { List } from "@mui/material";
import SoundButton from "../Buttons/SoundButton/SoundButton";
import SelectButton from "../Buttons/SelectButton/SelectButton";

export interface SoundListProps {
  soundData: SoundData[];
  isSelecting: boolean;
  soundSelected: (index: number) => void;
}

function SoundList(props: SoundListProps) {
  return (
    <div className="sound-list-wrapper">
      <div className="sound-list-dummy-line">
        <hr />
      </div>
      <div className="sound-list">
        <List className="sound-button-list">
          <div className="sound-list-dummy"></div>
          {props.soundData.map((sound, i) =>
            props.isSelecting ? (
              <SelectButton
                key={i}
                sound={sound}
                buttonClicked={() => props.soundSelected(i)}
              ></SelectButton>
            ) : (
              <SoundButton key={i} sound={sound}></SoundButton>
            )
          )}
          <div className="sound-list-dummy"></div>
        </List>
      </div>
    </div>
  );
}

export default SoundList;
