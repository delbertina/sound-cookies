import "./SoundList.scss";
import React, { Component } from "react";
import { SoundData } from "../../types/sound-types";
import SoundButton from "../../shared/SoundButton/SoundButton";

export interface SoundListProps {
  soundData: SoundData[];
}

class SoundList extends Component<SoundListProps> {

  render() {
    return (
      <div className="sound-list">
        <h6>
          Sound List
        </h6>
        <div className="sound-button-list">
          {this.props.soundData.map((sound, i) => (
            <SoundButton key={i} sound={sound}></SoundButton>
          ))}
        </div>
      </div>
    );
  }
}

export default SoundList;
