import './App.scss';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import useSound from 'use-sound';
import sounds from './assets/sounds/sounds.json';
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
        {sounds.map(sound => (
          <SoundButton sound={sound}></SoundButton>
        ))}
      </div>
    </div>
    );
  }

  executeScroll = () => this.myRef.current.scrollIntoView();
}

function SoundButton({sound}) {
  const assetURL = "/sounds/";
  const [isOff, setIsOff] = useState({
    state: true
  });

  const [playbackRate, setPlaybackRate] = React.useState(0.75);

  const [play, { stop, duration }] = useSound(process.env.PUBLIC_URL + assetURL + sound.file + '', {
    playbackRate,
    volume: 0.5,
    onend: () => {
      setIsOff({state: true});
    },
  });

  // setInterval(() => {
  //   updateWidth(); 
  // },300);
  
  // WIP - trying to have a little progress bar while the sound is playing
  //        proving to be difficult and I don't know a lot about react

  // function updateWidth() {
  //   if (!!sound && sound._sounds.length && duration) {
  //     const firstSound = sound._sounds.shift();
  //     if (!firstSound._paused) {
  //       console.log('Update Width', firstSound, duration);
  //       console.log('Width', (firstSound._seek/duration)*100)
  //     }
  //   }
  // }

  // format the millisecond duration to min:sec format using new pad function
  function msToTime(s) {
    var pad = (n, z = 2) => ('00' + n).slice(-z);
    return pad((s%3.6e6)/6e4 | 0) + ':' + pad((s%6e4)/1000|0);
  }

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
    <Tooltip placement="top" title={<React.Fragment>{"Source: " + sound.source}<br />{"Category: " + sound.category}</React.Fragment>}>
      <Button variant="contained" onClick={handleClick}>
        {isOff.state ? "⏵︎":"⏸︎"} 🎺 {sound.name} : {msToTime(duration)}
      </Button>
    </Tooltip>
  );
}

export default App;
