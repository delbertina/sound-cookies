import "./SoundSelectBar.scss";
import React, { useEffect, useRef, useState } from "react";
import { SoundData } from "../../types/sound-types";
import SelectButton, { SelectButtonRef } from "../Buttons/SelectButton/SelectButton";
import { Box, IconButton, LinearProgress, Snackbar, Tooltip } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import LinkIcon from "@mui/icons-material/Link";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { getSharableSoundLink } from "../../common/sound-data-handling";

export interface SoundSelectBarProps {
  selectData: SoundData[];
  selectClicked: (index: number) => void;
  clearClicked: () => void;
}

function SoundSelectBar(props: SoundSelectBarProps) {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = React.useState(0);
  const [currentSelectData, setCurrentSelectData] = useState<SoundData[]>(
    props.selectData
  );
  let currentPlayIndex = 0;

  const soundRefs = useRef<SelectButtonRef[]>([]);
  const currentTotalDuration = useRef(0);
  const counter = useRef(0);

  useEffect(() => {
    // if we're playing the sounds, don't allow the sound list to be edited
    if (!isPlaying) {
      setCurrentSelectData(props.selectData);
      soundRefs.current = soundRefs.current.slice(0, props.selectData.length);
    }
  }, [props.selectData, isPlaying]);

  useEffect(() => {
    if (counter.current < 20) {
      counter.current += 1;
      if (!playProgress) return;
      const timeout = setTimeout(() => {
        if (playProgress === 100) {
          setPlayProgress(0);
        } else {
          setPlayProgress(playProgress + 5);
        }
      }, (currentTotalDuration.current / 20) * 1000);
      return () => clearTimeout(timeout);
    }
  }, [playProgress, currentTotalDuration])

  const handleCopyToClipboard = (): void => {
    const linkString = getSharableSoundLink(currentSelectData);
    navigator.clipboard.writeText(linkString);
    setIsSnackbarOpen(true);
  };

  const togglePlayPause = (): void => {
    if (isPlaying) {
      toggleCurrentPlaying();
      setPlayProgress(0);
      setIsPlaying(false);
    } else {
      playSelection(0);
      counter.current = 0;
      currentTotalDuration.current = currentSelectData.map(item => item.duration).reduce((sum, current) => sum + current);
      setPlayProgress(10);
      setIsPlaying(true);
    }
  };

  const toggleCurrentPlaying = (): void => {
    soundRefs.current[currentPlayIndex].handleClick();
  };

  const playSelection = (i: number): void => {
    setTimeout(
      () => {
        currentPlayIndex = i;
        toggleCurrentPlaying();
        if (i + 1 < currentSelectData.length) {
          playSelection(i + 1);
        } else {
          setTimeout(() => {
            setIsPlaying(false);
          }, currentSelectData[i].duration * 1000);
        }
      },
      i ? currentSelectData[i - 1].duration * 1000 : 0
    );
  };

  return (
    <div className="sound-select-bar-wrapper">
      <h6>Select</h6>
      <Box sx={{ width: '80%', margin: '8px' }}>
        <LinearProgress variant="determinate" value={playProgress} />
      </Box>
      <div className="sound-select-bar">
        <div className="sound-select-bar-sounds">
          {currentSelectData.map((select, i) => (
            <SelectButton
              key={i}
              // @ts-ignore
              ref={(el) => (soundRefs.current[i] = el)}
              sound={select}
              disabled={isPlaying}
              buttonClicked={() => props.selectClicked(i)}
            ></SelectButton>
          ))}
        </div>
        <div className="sound-select-bar-buttons">
          <Tooltip title="Play Selection">
            <div>
              <IconButton
                disabled={!currentSelectData.length}
                aria-label="play selection"
                color="success"
                onClick={() => togglePlayPause()}
              >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip title="Add Silence">
            <div>
              <IconButton
                aria-label="add silence"
                color="info"
                onClick={() => {}}
              >
                <AddIcon />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip title="Copy Link">
            <div>
              <IconButton
                aria-label="link"
                color="info"
                disabled={!currentSelectData.length}
                onClick={() => handleCopyToClipboard()}
              >
                <LinkIcon />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip title="Clear">
            <div>
              <IconButton
                aria-label="clear"
                color="error"
                disabled={!currentSelectData.length}
                onClick={() => props.clearClicked()}
              >
                <ClearIcon />
              </IconButton>
            </div>
          </Tooltip>
        </div>
      </div>
      <Snackbar
        open={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        autoHideDuration={2000}
        message="Sharable link copied to clipboard!"
      />
    </div>
  );
}

export default SoundSelectBar;
