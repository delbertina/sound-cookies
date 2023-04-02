import "./SoundSortBar.scss";
import React from "react";
import {
  DefaultEmoji,
  TagActionData,
  SortEmojis,
} from "../../types/sound-types";
import { screamToInsideVoice } from "../../common/string-handling";
import ActionButton from "../Buttons/ActionButton/ActionButton";

export interface SoundSortBarProps {
  sortData: TagActionData[];
  sortDirection: boolean;
  sortClicked: (index: number) => void;
  sortDirectionClick: (isASC: boolean) => void;
}

function SoundSortBar(props: SoundSortBarProps) {
  return (
    <div className="sound-sort-bar">
      <h6>Sort</h6>
      <div className="sound-sort-bar-buttons">
        {props.sortData.map((sortItem, i) => (
          <ActionButton
            key={i}
            buttonText={
              (SortEmojis[sortItem.tag as keyof typeof SortEmojis] ??
                DefaultEmoji) +
              " " +
              screamToInsideVoice(sortItem.tag)
            }
            buttonSelected={sortItem.tagSelected}
            buttonClicked={() => props.sortClicked(i)}
          ></ActionButton>
        ))}
        <ActionButton
          buttonText="👆 Ascending"
          buttonSelected={!!props.sortDirection}
          buttonClicked={() => props.sortDirectionClick(true)}
        ></ActionButton>
        <ActionButton
          buttonText="👇 Descending"
          buttonSelected={!props.sortDirection}
          buttonClicked={() => props.sortDirectionClick(false)}
        ></ActionButton>
      </div>
    </div>
  );
}

export default SoundSortBar;
