import "./SoundSortBar.scss";
import React, { Component } from "react";
import { DefaultEmoji, TagActionData, SortEmojis } from "../../types/sound-types";
import { screamToInsideVoice } from "../../common/string-handling";
import ActionButton from "../../shared/FilterButton/ActionButton";

export interface SoundSortBarProps {
  sortData: TagActionData[];
  sortDirection: boolean;
  sortClicked: (index: number) => void;
  sortDirectionClick: (isASC: boolean) => void;
}

class SoundSortBar extends Component<SoundSortBarProps> {
  render() {
    return (
      <div className="sound-sort-bar">
        <h6>Sort</h6>
        <div className="sound-sort-bar-buttons">
          {this.props.sortData.map((sortItem, i) => (
            <ActionButton
              key={i}
              buttonText={
                (SortEmojis[sortItem.tag as keyof typeof SortEmojis] ??
                  DefaultEmoji) +
                " " +
                screamToInsideVoice(sortItem.tag)
              }
              buttonSelected={sortItem.tagSelected}
              buttonClicked={() => this.props.sortClicked(i)}
            ></ActionButton>
          ))}
          <ActionButton
            buttonText="👆 Ascending"
            buttonSelected={!!this.props.sortDirection}
            buttonClicked={() => this.props.sortDirectionClick(true)}
          ></ActionButton>
          <ActionButton
            buttonText="👇 Descending"
            buttonSelected={!this.props.sortDirection}
            buttonClicked={() => this.props.sortDirectionClick(false)}
          ></ActionButton>
        </div>
      </div>
    );
  }
}

export default SoundSortBar;
