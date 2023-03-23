import "./SoundList.scss";
import React, { Component } from "react";
import { SoundData } from "../../types/sound-types";
import { List } from "@mui/material";
import SoundButton from "../SoundButton/SoundButton";
import SelectButton from "../SelectButton/SelectButton";

export interface SoundListProps {
  soundData: SoundData[];
  isSelecting: boolean;
  soundSelected: (index: number) => void;
}

class SoundList extends Component<SoundListProps> {

  render() {
    return (
      <div className="sound-list-wrapper">
        <div className="sound-list-dummy-line"><hr /></div>
        <div className="sound-list">
          <List className="sound-button-list">
            <div className="sound-list-dummy"></div>
            {this.props.soundData.map((sound, i) => 
              this.props.isSelecting ? 
                (
                  <SelectButton
                    key={i}
                    sound={sound}
                    buttonClicked={() => this.props.soundSelected(i)}
                  ></SelectButton>
                )
                : (<SoundButton key={i} sound={sound}></SoundButton>)
              )}
            <div className="sound-list-dummy"></div>
          </List>
        </div>
      </div>
    );
  }
}

export default SoundList;
