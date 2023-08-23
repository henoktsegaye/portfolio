const oneWord = .3; // .3sec

export const predictReadMinutes = (text?: string) => {
  if (!text) {
    return 0;
  }
  const eachWord = text.split(" ").filter(el => el.length > 2);
  return ((eachWord.length * oneWord) / 60).toFixed(0);
};
