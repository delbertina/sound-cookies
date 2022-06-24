import './App.scss';
import React from 'react';
  
  
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
      </div>
    </div>
    );
  }

  executeScroll = () => this.myRef.current.scrollIntoView();
}

export default App;
