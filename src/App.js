import './App.scss';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import useSound from 'use-sound';
import dundundun from './assets/sounds/dun-dun-dun.wav';
import { Tooltip } from '@mui/material';
  
  
class App extends React.Component {

  constructor(props) {
    super(props)
    this.myRef = React.createRef();
  }

  render() {
    return (
    <div className="App">
      <header className="App-header">
        <h1>
          Sound Cookies
        </h1>
        <h3>
          Audio chunks that are more than just a bite.
        </h3>
        <button onClick={this.executeScroll}>Explore ▼</button>
      </header>
      <div className="App-body" ref={this.myRef}>
        <h6>
          Woah that scroll button was money, baby.<br />
          This is where the actual content will go.
        </h6>
        <SoundButton soundUrl={dundundun} tooltip={<React.Fragment>{"Source: someone"}<br />{"Category: weird"}</React.Fragment>}></SoundButton>
      </div>
    </div>
    );
  }

  executeScroll = () => this.myRef.current.scrollIntoView();
}

function SoundButton({soundUrl, tooltip}) {
  const [isOff, setIsOff] = useState({
    state: true
 });

  const [playbackRate, setPlaybackRate] = React.useState(0.75);

  const [play, { stop }] = useSound(soundUrl, {
    playbackRate,
    volume: 0.5,
    onend: () => {
      setIsOff({state: true});
    },
  });

  const handleClick = () => {
    setIsOff({state: !isOff.state});
    if (isOff.state) {
      setPlaybackRate(playbackRate + 0.1);
      play();
    } else {
      stop();
    }
  };

  return (
    <Tooltip placement="top" title={tooltip}>
      <Button variant="contained" onClick={handleClick}>
        {isOff.state ? "⏵︎":"⏸︎"} 🎺
      </Button>
    </Tooltip>
  );
}

export default App;
