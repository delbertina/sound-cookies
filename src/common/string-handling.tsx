// format the millisecond duration to min:sec format using new pad function
export const msToTime = (s: number) => {
  var pad = (n: number, z = 2) => ("00" + n).slice(-z);
  return pad(((s % 3.6e6) / 6e4) | 0) + ":" + pad(((s % 6e4) / 1000) | 0);
};

export const getSoundAssetPath = (fileName: string): string => {
    const assetURL = "/sounds/";
    return process.env.PUBLIC_URL + assetURL + fileName + "";
}

// turn THIS into This
export const screamToInsideVoice = (enumString: string): string => {
  if (!enumString) return "";
  const returnValue = enumString.toLowerCase();
  return returnValue.charAt(0).toUpperCase() + returnValue.slice(1);
}