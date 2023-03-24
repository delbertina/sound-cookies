import "./MainPage.scss";
import React from "react";
import { Box, Button, IconButton, SwipeableDrawer } from "@mui/material";
import { grey } from "@mui/material/colors";
import SettingsIcon from "@mui/icons-material/Settings";
import { SortEmojis, SoundData, TagActionData } from "../../types/sound-types";
import SoundSortBar from "../SoundSortBar/SoundSortBar";
import SoundFilterBar from "../SoundFilterBar/SoundFilterBar";
import SoundSelectBar from "../SoundSelectBar/SoundSelectBar";
import SoundList from "../SoundList/SoundList";

interface MainPageProps {
  sounds: SoundData[];
}

interface MainPageState {
  sortData: TagActionData[];
  sortDirection: boolean;
  filterData: TagActionData[];
  selectData: SoundData[];
  soundData: SoundData[];
  isSorting: boolean;
  isFiltering: boolean;
  isSelecting: boolean;
  isSettingsOpen: boolean;
}

class MainPage extends React.Component<MainPageProps, MainPageState> {
  constructor(props: any) {
    super(props);

    const queryParameters = new URLSearchParams(window.location.search);
    const dataParam = queryParameters.get("data");
    console.log('params', queryParameters, dataParam);
    // https://developer.mozilla.org/en-US/docs/Glossary/Base64
    // Use base64 to encode and decode the objests

    const uniqueTags = this.props.sounds
      .map((item) => item.tags)
      .reduce((accumulator, value) => accumulator.concat(value), [])
      .filter((value, index, array) => array.indexOf(value) === index)
      .map((value) => ({
        tag: value,
        tagSelected: false,
      }));
    this.state = {
      soundData: this.props.sounds,
      filterData: uniqueTags.sort((a, b) =>
        a.tag.localeCompare(b.tag, "en", { sensitivity: "base" })
      ),
      sortData: Object.keys(SortEmojis).map((item, i) => ({
        tag: item,
        tagSelected: i === 0,
      })),
      selectData: [],
      sortDirection: true,
      isSorting: true,
      isFiltering: true,
      isSelecting: false,
      isSettingsOpen: false,
    };
    this.updateSoundList();
  }

  handleToggleSettings(): void {
    this.setState({ isSettingsOpen: !this.state.isSettingsOpen });
  }

  handleSortDirectionSelect(isASC: boolean): void {
    this.setState({ sortDirection: isASC }, this.updateSoundList);
  }

  handleSortTagSelect(index: number): void {
    if (index < 0 || index > this.state.filterData.length - 1) return;

    const sortData = this.state.sortData.map((sortItem, i) =>
      index === i
        ? {
            tag: sortItem.tag,
            tagSelected: true,
          }
        : {
            tag: sortItem.tag,
            tagSelected: false,
          }
    );

    this.setState({ sortData }, this.updateSoundList);
  }

  handleFilterSelect(index: number): void {
    if (index < 0 || index > this.state.filterData.length - 1) return;

    const filterData = this.state.filterData.map((filter, i) =>
      index === i
        ? {
            tag: filter.tag,
            tagSelected: !filter.tagSelected,
          }
        : filter
    );

    this.setState({ filterData }, this.updateSoundList);
  }

  updateSoundList(): void {
    const selectedFilters = this.state.filterData.filter(
      (filter) => !!filter.tagSelected
    );
    const selectedSort = this.state.sortData.find(
      (sortItem) => sortItem.tagSelected
    );

    let returnSounds: SoundData[] = [];

    if (!selectedFilters.length) {
      returnSounds = this.props.sounds;
    } else {
      // Only looks for 1 match, future work to switch to AND instead of OR
      returnSounds = this.props.sounds.filter((sound) =>
        selectedFilters
          .map((filter) => filter.tag)
          .some((tag) => sound.tags.indexOf(tag) >= 0)
      );
    }

    if (selectedSort?.tag === "NAME") {
      returnSounds.sort((a, b) =>
        a.name.localeCompare(b.name, "en", { sensitivity: "base" })
      );
    } else if (selectedSort?.tag === "WHO") {
      returnSounds.sort((a, b) =>
        (a.tags[0] ?? "").localeCompare(b.tags[0] ?? "", "en", {
          sensitivity: "base",
        })
      );
    } else if (selectedSort?.tag === "DURATION") {
      returnSounds.sort((a, b) => a.duration - b.duration);
    }

    if (!this.state.sortDirection) returnSounds.reverse();

    this.setState({ soundData: returnSounds });
  }

  toggleSort(): void {
    this.setState({ isSorting: !this.state.isSorting });
  }

  toggleFilter(): void {
    this.setState({ isFiltering: !this.state.isFiltering });
  }

  toggleSelect(): void {
    this.setState({ isSelecting: !this.state.isSelecting });
  }

  handleSoundItemDeselect(index: number): void {
    if (index < 0 || index > this.state.selectData.length - 1) return;

    const returnArray = this.state.selectData.slice();
    returnArray.splice(index, 1);
    
    this.setState({
      selectData: returnArray,
    });
  }

  handleSoundItemSelect(index: number): void {
    if (index < 0 || index > this.state.soundData.length - 1) return;

    this.setState({
      selectData: [...this.state.selectData, this.state.soundData[index]],
    });
  }

  render() {
    return (
      <>
        <SwipeableDrawer
          anchor={"top"}
          open={this.state.isSettingsOpen}
          onClose={() => this.handleToggleSettings()}
          onOpen={() => this.handleToggleSettings()}
        >
          <Box
            sx={{
              backgroundColor: grey[800],
              padding: 2,
              display: "flex",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            <Button
              variant="contained"
              color={this.state.isSorting ? "info" : "error"}
              onClick={() => this.toggleSort()}
            >
              Sort
            </Button>
            <Button
              variant="contained"
              color={this.state.isFiltering ? "info" : "error"}
              onClick={() => this.toggleFilter()}
            >
              Filter
            </Button>
            <Button
              variant="contained"
              color={this.state.isSelecting ? "info" : "error"}
              onClick={() => this.toggleSelect()}
            >
              Select
            </Button>
          </Box>
        </SwipeableDrawer>
        <div>
          <IconButton
            aria-label="settings"
            color="warning"
            onClick={() => this.handleToggleSettings()}
          >
            <SettingsIcon />
          </IconButton>
        </div>
        {this.state.isSorting && (
          <SoundSortBar
            sortData={this.state.sortData}
            sortDirection={this.state.sortDirection}
            sortClicked={(index: number) => this.handleSortTagSelect(index)}
            sortDirectionClick={(isASC: boolean) =>
              this.handleSortDirectionSelect(isASC)
            }
          />
        )}
        {this.state.isFiltering && (
          <SoundFilterBar
            filterData={this.state.filterData}
            filterClicked={(index: number) => this.handleFilterSelect(index)}
          />
        )}
        {this.state.isSelecting && (
          <SoundSelectBar
            selectData={this.state.selectData}
            selectClicked={(index: number) =>
              this.handleSoundItemDeselect(index)
            }
          />
        )}
        <SoundList
          soundData={this.state.soundData}
          isSelecting={this.state.isSelecting}
          soundSelected={(index) => this.handleSoundItemSelect(index)}
        />
        <div className="main-page-dummy"></div>
      </>
    );
  }
}

export default MainPage;
