import { SelectedSoundData, SoundData } from "../types/sound-types";
import { Buffer } from "buffer";

export const getSharableSoundLink = (selectedSounds: SoundData[]): string => {
  const rootURL = "https://delbertina.github.io/sound-cookies";
  const dataParamUnencoded = JSON.stringify({
    selectedSounds,
  } as SelectedSoundData);
  const dataParam = Buffer.from(dataParamUnencoded, "binary").toString(
    "base64"
  );

  return rootURL + "/?data=" + dataParam;
};

export const parseSharableSoundData = (
  selectedSounds: string
): SelectedSoundData => {
  const soundData = Buffer.from(selectedSounds, "base64").toString("binary");
  return JSON.parse(soundData);
};

export const getURLDataParam = (): string => {
  const queryParameters = new URLSearchParams(window.location.search);
  const dataParam = queryParameters.get("data");
  return dataParam ?? "";
};

// Prevent loading anything other than the information we have for the sounds
export const verifySoundData = (
  soundList: SoundData[],
  soundsToVerify: SoundData[]
): SoundData[] => {
  const returnData: SoundData[] = [];
  let isError = false;

  soundsToVerify.forEach((verifySound) => {
    const foundSound = soundList.find(
      (searchSound) => searchSound.file === verifySound.file
    );
    if (!foundSound) isError = true;
    else returnData.push(foundSound);
  });

  return isError ? [] : returnData;
};
