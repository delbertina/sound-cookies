// format the millisecond duration to min:sec format using pad function
// round up to the nearest second to avoid 00:00 for less than 1 second
export const msToTime = (input: number) => {
  const inputRounded = Math.ceil(input / 1000) * 1000;
  const pad = (n: number, z = 2) => ("00" + n).slice(-z);
  return (
    pad(((inputRounded % 3.6e6) / 6e4) | 0) +
    ":" +
    pad(((inputRounded % 6e4) / 1000) | 0)
  );
};

export const getSoundAssetPath = (fileName: string): string => {
  const assetURL = "/sounds/";
  return process.env.PUBLIC_URL + assetURL + fileName + "";
};

// turn THIS into This
export const screamToInsideVoice = (enumString: string): string => {
  if (!enumString) return "";
  if (enumString === "DELBERTINA") return "delbertina"; // my name shouldn't be capitalized
  const returnValue = enumString.toLowerCase();
  return returnValue.charAt(0).toUpperCase() + returnValue.slice(1);
};
