import "./SoundSelectBar.scss";
import React, { Component } from "react";
import { SoundData } from "../../types/sound-types";
import SelectButton from "../SelectButton/SelectButton";

export interface SoundSelectBarProps {
  selectData: SoundData[];
  selectClicked: (index: number) => void;
}

class SoundSelectBar extends Component<SoundSelectBarProps> {
  render() {
    return (
      <div className="sound-select-bar">
        <h6>Select</h6>
        <div className="sound-select-bar-buttons">
          {this.props.selectData.map((select, i) => (
            <SelectButton
              key={i}
              sound={select}
              buttonClicked={() => this.props.selectClicked(i)}
            ></SelectButton>
          ))}
        </div>
      </div>
    );
  }
}

export default SoundSelectBar;
