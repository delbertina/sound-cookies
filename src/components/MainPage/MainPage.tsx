import "./MainPage.scss";
import React from "react";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  SwipeableDrawer,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import SettingsIcon from "@mui/icons-material/Settings";
import ClearIcon from "@mui/icons-material/Clear";
import {
  SelectedSoundData,
  SortEmojis,
  SoundData,
  TagActionData,
} from "../../types/sound-types";
import SoundSortBar from "../SoundSortBar/SoundSortBar";
import SoundFilterBar from "../SoundFilterBar/SoundFilterBar";
import SoundSelectBar from "../SoundSelectBar/SoundSelectBar";
import SoundList from "../SoundList/SoundList";
import {
  getURLDataParam,
  parseSharableSoundData,
  verifySoundData,
} from "../../common/sound-data-handling";

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
  isSnackbarOpen: boolean;
}

class MainPage extends React.Component<MainPageProps, MainPageState> {
  constructor(props: any) {
    super(props);

    let isSelectionLink = false;
    let isSelectionLinkError = false;
    let selectionData: SoundData[] = [];

    const dataParam = getURLDataParam();
    if (!!dataParam) {
      const returnedSoundData = parseSharableSoundData(
        dataParam
      ) as SelectedSoundData;
      const verifiedSoundData = verifySoundData(
        this.props.sounds,
        returnedSoundData.selectedSounds
      );
      if (!verifiedSoundData || !verifiedSoundData.length) {
        // if we had data, but it loaded nothing throw and error
        isSelectionLinkError = true;
        console.log(
          "error loading sharable link data",
          returnedSoundData,
          verifiedSoundData
        );
      } else {
        // else, switch to selection mode and display loaded data
        isSelectionLink = true;
        selectionData = returnedSoundData.selectedSounds;
        console.log(
          "loaded sharable link data",
          returnedSoundData,
          verifiedSoundData
        );
      }
    }

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
      selectData: selectionData,
      sortDirection: true,
      isSorting: true,
      isFiltering: true,
      isSelecting: isSelectionLink,
      isSettingsOpen: false,
      isSnackbarOpen: isSelectionLinkError,
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

  handleSelectionClear(): void {
    this.setState({ selectData: [] });
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
              color: "white",
              textAlign: "center",
            }}
          >
            <div>
              <IconButton
                aria-label="close"
                color="warning"
                onClick={() => this.handleToggleSettings()}
              >
                <ClearIcon />
              </IconButton>
            </div>
            <h4 className="settings-title">Toggle Sections</h4>
            <div className="settings-button-container">
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
            </div>
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
            clearClicked={() => this.handleSelectionClear()}
          />
        )}
        <SoundList
          soundData={this.state.soundData}
          isSelecting={this.state.isSelecting}
          soundSelected={(index) => this.handleSoundItemSelect(index)}
        />
        <div className="main-page-dummy"></div>
        <Snackbar
          open={this.state.isSnackbarOpen}
          onClose={() => this.setState({ isSnackbarOpen: false })}
          autoHideDuration={6000}
        >
          <Alert severity="error">Error loading sharable link data!</Alert>
        </Snackbar>
      </>
    );
  }
}

export default MainPage;
