import "./SoundList.scss";
import React, { Component } from "react";
import { SoundData } from "../../types/sound-types";
import SoundButton from "../../shared/SoundButton/SoundButton";
import { List } from "@mui/material";

export interface SoundListProps {
  soundData: SoundData[];
}

class SoundList extends Component<SoundListProps> {

  render() {
    return (
      <div className="sound-list-wrapper">
        <h6>
          Sound List
        </h6>
        <div className="sound-list">
          <List className="sound-button-list">
            <div className="sound-list-dummy"></div>
            {this.props.soundData.map((sound, i) => (
              <SoundButton key={i} sound={sound}></SoundButton>
              ))}
            <div className="sound-list-dummy"></div>
          </List>
        </div>
      </div>
    );
  }
}

export default SoundList;
