import "./App.scss";
import React from "react";
import sounds from "./assets/sounds/sounds.json";
import SoundList from "./components/SoundList/SoundList";
import { Button } from "@mui/material";
import SoundFilterBar from "./components/SoundFilterBar/SoundFilterBar";
import { TagActionData, SoundData, SortEmojis } from "./types/sound-types";
import SoundSortBar from "./components/SoundSortBar/SoundSortBar";

interface AppProps {}

interface AppState {
  sortData: TagActionData[];
  sortDirection: boolean;
  filterData: TagActionData[];
  soundData: SoundData[];
}

class App extends React.Component<AppProps, AppState> {
  public myRef: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this.myRef = React.createRef();
    const uniqueTags = (sounds as SoundData[])
      .map((item) => item.tags)
      .reduce((accumulator, value) => accumulator.concat(value), [])
      .filter((value, index, array) => array.indexOf(value) === index)
      .map((value) => ({
        tag: value,
        tagSelected: false,
      }));
    this.state = {
      soundData: sounds as SoundData[],
      filterData: uniqueTags.sort((a, b) => a.tag.localeCompare(b.tag, 'en', {sensitivity: "base"})),
      sortData: Object.keys(SortEmojis).map((item, i) => ({
        tag: item,
        tagSelected: i === 0
      })),
      sortDirection: true
    };
    this.updateSoundList();
  }

  handleSortDirectionSelect(isASC: boolean): void {
    this.setState({ sortDirection: isASC}, this.updateSoundList);
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
            tagSelected: false
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
    const selectedSort = this.state.sortData.find(sortItem => sortItem.tagSelected);

    let returnSounds: SoundData[] = [];

    if (!selectedFilters.length) {
      returnSounds = sounds as SoundData[];
    } else { // Only looks for 1 match, future work to switch to AND instead of OR
      returnSounds = (sounds as SoundData[]).filter((sound) =>
      selectedFilters
        .map((filter) => filter.tag)
        .some((tag) => sound.tags.indexOf(tag) >= 0));
    }

    if (selectedSort?.tag === "NAME") {
      returnSounds.sort((a, b) => a.name.localeCompare(b.name, 'en', {sensitivity: 'base'}))
    } else if (selectedSort?.tag === "WHO") {
      returnSounds.sort((a, b) => (a.tags[0]??"").localeCompare((b.tags[0]??""), 'en', {sensitivity: 'base'}))
    }

    if (!this.state.sortDirection) returnSounds.reverse();

    this.setState({soundData: returnSounds});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header-title">
            <h1>Sound Cookies</h1>
          </div>
          <h3>Audio chunks that are more than just a bite.</h3>
          <Button variant="contained" onClick={this.executeScroll}>
            Begin ▼
          </Button>
        </header>
        <div className="App-body" ref={this.myRef}>
          <div className="App-body-dummy"></div>
          <SoundSortBar
            sortData={this.state.sortData}
            sortDirection={this.state.sortDirection}
            sortClicked={(index: number) => this.handleSortTagSelect(index)}
            sortDirectionClick={(isASC: boolean) => this.handleSortDirectionSelect(isASC)}
          ></SoundSortBar>
          <SoundFilterBar
            filterData={this.state.filterData}
            filterClicked={(index: number) => this.handleFilterSelect(index)}
          />
          <SoundList soundData={this.state.soundData} />
          <div className="App-body-dummy"></div>
        </div>
      </div>
    );
  }

  executeScroll = () => this.myRef.current.scrollIntoView();
}

export default App;
