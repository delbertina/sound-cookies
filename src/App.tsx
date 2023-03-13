import "./App.scss";
import React from "react";
import sounds from "./assets/sounds/sounds.json";
import SoundList from "./components/SoundList/SoundList";
import { Button } from "@mui/material";
import SoundFilterBar from "./components/SoundFilterBar/SoundFilterBar";
import { FilterData, SoundData } from "./types/sound-types";

interface AppProps {}

interface AppState {
  filterData: FilterData[];
  soundData: SoundData[];
}

class App extends React.Component<AppProps, AppState> {
  public myRef: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      soundData: sounds as SoundData[],
      filterData: (sounds as SoundData[])
        .map((item) => item.tags)
        .reduce((accumulator, value) => accumulator.concat(value), [])
        .filter((value, index, array) => array.indexOf(value) === index)
        .map((value) => ({
          filterTag: value,
          filterSelected: false,
        })),
    };
  }

  handleFilterSelect(index: number): void {
    if (index < 0 || index > this.state.filterData.length - 1) return;

    const filterData = this.state.filterData.map((filter, i) =>
      index === i
        ? {
            filterTag: filter.filterTag,
            filterSelected: !filter.filterSelected,
          }
        : filter
    );

    const soundData = this.getFilteredSoundList(filterData);

    this.setState({ filterData, soundData });
  }

  getFilteredSoundList(filterData: FilterData[]): SoundData[] {
    const selectedFilters = filterData.filter(
      (filter) => !!filter.filterSelected
    );

    if (!selectedFilters.length) return sounds as SoundData[];

    // Only looks for 1 match, future work to switch to AND instead of OR
    return (sounds as SoundData[]).filter((sound) =>
      selectedFilters
        .map((filter) => filter.filterTag)
        .some((tag) => sound.tags.indexOf(tag) >= 0)
    );
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
          <SoundFilterBar
            filterData={this.state.filterData}
            filterClicked={(index: number) => this.handleFilterSelect(index)}
          />
          <SoundList soundData={this.state.soundData} />
        </div>
      </div>
    );
  }

  executeScroll = () => this.myRef.current.scrollIntoView();
}

export default App;
