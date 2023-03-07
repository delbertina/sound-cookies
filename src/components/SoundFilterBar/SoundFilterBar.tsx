import "./SoundFilterBar.scss";
import React, { Component } from "react";
import { DefaultEmoji, FilterData, WhoEmojis } from "../../types/sound-types";
import FilterButton from "../../shared/FilterButton/FilterButton";
import { screamToInsideVoice } from "../../common/string-handling";

export interface SoundFilterBarProps {
  filterData: FilterData[];
  filterClicked: (index: number) => void;
}

class SoundFilterBar extends Component<SoundFilterBarProps> {
  render() {
    return (
      <div className="sound-filter-bar">
        <h6>Sound Filters</h6>
        <div className="sound-filter-bar-buttons">
          {this.props.filterData.map((filter, i) => (
            <FilterButton
              key={i}
              filterText={
                (WhoEmojis[filter.filterWho as keyof typeof WhoEmojis] ??
                  DefaultEmoji) +
                " " +
                screamToInsideVoice(filter.filterWho)
              }
              filterSelected={filter.filterSelected}
              filterClicked={() => this.props.filterClicked(i)}
            ></FilterButton>
          ))}
        </div>
      </div>
    );
  }
}

export default SoundFilterBar;
