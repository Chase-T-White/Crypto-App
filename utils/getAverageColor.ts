import { FastAverageColor } from "fast-average-color";

export const getAverageColor = (imageURL: string) => {
  const fac = new FastAverageColor();

  fac
    .getColorAsync(`${imageURL}`, {
      ignoredColor: [
        [255, 255, 255, 255],
        [0, 0, 0, 255],
      ],
      algorithm: "dominant",
    })
    .then((color) => console.log(color))
    .catch((e) => console.log(e.message));
};
