import "./App.scss";
import React from "react";
import sounds from "./assets/sounds/sounds.json";
import { Button } from "@mui/material";
import { SoundData } from "./types/sound-types";
import MainPage from "./components/MainPage/MainPage";

interface AppProps {}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  public myRef: React.RefObject<any>;
  executeScroll = () => this.myRef.current.scrollIntoView();

  constructor(props: any) {
    super(props);
    this.myRef = React.createRef();
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
          <MainPage sounds={sounds as SoundData[]} />
        </div>
      </div>
    );
  }
}

export default App;
