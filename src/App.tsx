import "./App.scss";
import React from "react";
import sounds from "./assets/sounds/sounds.json";
import SoundList from "./components/SoundList/SoundList";
import { Button } from "@mui/material";

class App extends React.Component {
  public myRef: React.RefObject<any>;

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
          <Button variant="contained" onClick={this.executeScroll}>Begin ▼</Button>
        </header>
        <div className="App-body" ref={this.myRef}>
          <SoundList SoundData={sounds}/>
        </div>
      </div>
    );
  }

  executeScroll = () => this.myRef.current.scrollIntoView();
}

export default App;
