export const routeLengthParser = (arr) => {
  switch (arr.length) {
    case 1:
      return "Non Stop";
    case 2:
      return "2 Stops";
    default:
      return `${arr.length} Stops`;
  }
};