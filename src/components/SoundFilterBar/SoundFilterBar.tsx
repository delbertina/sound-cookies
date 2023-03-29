import "./SoundFilterBar.scss";
import React, { Component } from "react";
import { DefaultEmoji, TagActionData, TagEmojis } from "../../types/sound-types";
import ActionButton from "../Buttons/ActionButton/ActionButton";
import { screamToInsideVoice } from "../../common/string-handling";

export interface SoundFilterBarProps {
  filterData: TagActionData[];
  filterClicked: (index: number) => void;
}

class SoundFilterBar extends Component<SoundFilterBarProps> {
  render() {
    return (
      <div className="sound-filter-bar">
        <h6>Filter</h6>
        <div className="sound-filter-bar-buttons">
          {this.props.filterData.map((filter, i) => (
            <ActionButton
              key={i}
              buttonText={
                (TagEmojis[filter.tag as keyof typeof TagEmojis] ??
                  DefaultEmoji) +
                " " +
                screamToInsideVoice(filter.tag)
              }
              buttonSelected={filter.tagSelected}
              buttonClicked={() => this.props.filterClicked(i)}
            ></ActionButton>
          ))}
        </div>
      </div>
    );
  }
}

export default SoundFilterBar;
