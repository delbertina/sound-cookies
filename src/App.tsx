import "./App.scss";
import React, { useEffect, useState } from "react";
import sounds from "./assets/sounds/sounds.json";
import { Button } from "@mui/material";
import { SoundData } from "./types/sound-types";
import MainPage from "./components/MainPage/MainPage";
import { getURLDataParam } from "./common/sound-data-handling";

function App() {
  let myRef: React.RefObject<any>;
  const executeScroll = () => myRef.current.scrollIntoView();

  myRef = React.createRef();

  const [isAlreadyScrolled, setIsAlreadyScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (!isAlreadyScrolled) {
      const dataParam = getURLDataParam();
      if (!!dataParam) {
        myRef.current.scrollIntoView();
        setIsAlreadyScrolled(true);
      }
    }
  }, [myRef, isAlreadyScrolled]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-title">
          <h1>Sound Cookies</h1>
        </div>
        <h3>Audio chunks that are more than just a bite.</h3>
        <Button variant="contained" onClick={executeScroll}>
          Begin ▼
        </Button>
      </header>
      <div className="App-body" ref={myRef}>
        <MainPage sounds={sounds as SoundData[]} />
      </div>
    </div>
  );
}

export default App;
