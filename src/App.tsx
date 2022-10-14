import "./App.scss";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import useSound from "use-sound";
import sounds from "./assets/sounds/sounds.json";
import { Tooltip } from "@mui/material";

interface SoundData {
  file: string,
  name: string,
  category: string,
  source: string
}

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
          <h1>Sound Cookies</h1>
          <h3>Audio chunks that are more than just a bite.</h3>
          <button onClick={this.executeScroll}>Explore ▼</button>
        </header>
        <div className="App-body" ref={this.myRef}>
          <h6>
            Woah that scroll button was money, baby.
            <br />
            This is where the actual content will go.
          </h6>
          {(sounds as SoundData[]).map((sound, i) => (
            <SoundButton key={i} sound={sound}></SoundButton>
          ))}
        </div>
      </div>
    );
  }

  executeScroll = () => this.myRef.current.scrollIntoView();
}

interface SoundButtonProps {
  sound: SoundData;
}

function SoundButton(props: SoundButtonProps) {
  const assetURL = "/sounds/";
  const [isOff, setIsOff] = useState({
    state: true,
  });

  const playbackRate = 1;

  const [play, { stop, duration }] = useSound(
    process.env.PUBLIC_URL + assetURL + props.sound.file + "",
    {
      playbackRate,
      volume: 0.5,
      onend: () => {
        setIsOff({ state: true });
      },
    }
  );

  // format the millisecond duration to min:sec format using new pad function
  function msToTime(s: number) {
    var pad = (n: number, z = 2) => ("00" + n).slice(-z);
    return pad(((s % 3.6e6) / 6e4) | 0) + ":" + pad(((s % 6e4) / 1000) | 0);
  }

  const handleClick = () => {
    setIsOff({ state: !isOff.state });
    if (isOff.state) {
      play();
    } else {
      stop();
    }
  };

  return (
    <Tooltip placement="top" title={<SoundButtonHover sound={props.sound} />}>
      <Button
        variant="contained"
        onClick={handleClick}
        className="sound-button"
      >
        {isOff.state ? "⏵︎" : "⏸︎"} 🎺 <div>{props.sound.name}</div> :{" "}
        {msToTime(duration ?? 0)}
      </Button>
    </Tooltip>
  );
}

function SoundButtonHover(props: SoundButtonProps) {
  return (
    <React.Fragment>
      {"Name: " + props.sound.name}
      <br />
      {"Source: " + props.sound.source}
      <br />
      {"Category: " + props.sound.category}
    </React.Fragment>
  );
}

export default App;
