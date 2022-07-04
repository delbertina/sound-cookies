import './App.scss';
import React from 'react';
import useSound from 'use-sound';
import dundundun from './assets/sounds/dun-dun-dun.wav';
  
  
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
        <SoundButton></SoundButton>
      </div>
    </div>
    );
  }

  executeScroll = () => this.myRef.current.scrollIntoView();
}

function SoundButton() {
  // Make this dynamic in the future
  const soundUrl = dundundun;

  const [playbackRate, setPlaybackRate] = React.useState(0.75);

  const [play] = useSound(soundUrl, {
    playbackRate,
    volume: 0.5,
  });

  const handleClick = () => {
    console.log('clicked');
    setPlaybackRate(playbackRate + 0.1);
    play();
  };

  return (
    <button onClick={handleClick}>
      <span role="img" aria-label="Heart">
      🎺
      </span>
    </button>
  );
}

export default App;
