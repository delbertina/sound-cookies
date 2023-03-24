import "./SoundSelectBar.scss";
import React, { Component } from "react";
import { SoundData } from "../../types/sound-types";
import SelectButton from "../SelectButton/SelectButton";
import { IconButton, Tooltip } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import LinkIcon from "@mui/icons-material/Link";
import AddIcon from "@mui/icons-material/Add";

export interface SoundSelectBarProps {
  selectData: SoundData[];
  selectClicked: (index: number) => void;
}

class SoundSelectBar extends Component<SoundSelectBarProps> {
  render() {
    return (
      <div className="sound-select-bar-wrapper">
        <h6>Select</h6>
        <div className="sound-select-bar">
        <div className="sound-select-bar-sounds">
          {this.props.selectData.map((select, i) => (
            <SelectButton
              key={i}
              sound={select}
              buttonClicked={() => this.props.selectClicked(i)}
            ></SelectButton>
          ))}
        </div>
        <div className="sound-select-bar-buttons">
          <Tooltip title="Add Silence">
            <IconButton
                aria-label="add silence"
                color="info"
                onClick={() => {}}
              >
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Copy Link">
            <IconButton
                aria-label="link"
                color="info"
                onClick={() => {}}
              >
              <LinkIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Clear">
            <IconButton
                aria-label="clear"
                color="error"
                onClick={() => {}}
              >
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </div>
        </div>
      </div>
    );
  }
}

export default SoundSelectBar;
