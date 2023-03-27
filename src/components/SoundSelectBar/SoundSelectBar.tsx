import "./SoundSelectBar.scss";
import React, { Component } from "react";
import { SoundData } from "../../types/sound-types";
import SelectButton from "../SelectButton/SelectButton";
import { IconButton, Snackbar, Tooltip } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import LinkIcon from "@mui/icons-material/Link";
import AddIcon from "@mui/icons-material/Add";
import { getSharableSoundLink } from "../../common/sound-data-handling";

export interface SoundSelectBarProps {
  selectData: SoundData[];
  selectClicked: (index: number) => void;
  clearClicked: () => void;
}

export interface SoundSelectBarState {
  isSnackbarOpen: boolean;
}

class SoundSelectBar extends Component<
  SoundSelectBarProps,
  SoundSelectBarState
> {
  constructor(props: any) {
    super(props);
    this.state = { isSnackbarOpen: false };
  }

  handleCopyToClipboard(): void {
    const linkString = getSharableSoundLink(this.props.selectData);
    navigator.clipboard.writeText(linkString);
    this.setState({ isSnackbarOpen: true });
  }

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
                onClick={() => this.handleCopyToClipboard()}
              >
                <LinkIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Clear">
              <IconButton
                aria-label="clear"
                color="error"
                onClick={() => this.props.clearClicked()}
              >
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <Snackbar
          open={this.state.isSnackbarOpen}
          onClose={() => this.setState({ isSnackbarOpen: false })}
          autoHideDuration={2000}
          message="Sharable link copied to clipboard!"
        />
      </div>
    );
  }
}

export default SoundSelectBar;
