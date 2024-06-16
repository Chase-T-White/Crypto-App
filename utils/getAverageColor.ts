import { FastAverageColor } from "fast-average-color";

export async function getAverageColor(imageURL: string) {
  const fac = new FastAverageColor();

  const averageColor = fac
    .getColorAsync(`${imageURL}`, {
      ignoredColor: [
        [255, 255, 255, 1, 5],
        [11, 3, 26, 255, 5],
        [13, 4, 27, 255, 5],
        [30, 36, 43, 255, 5],
        [31, 41, 67, 255, 5],
        [32, 42, 68, 255, 5],
        [45, 48, 72, 255, 5],
        [48, 52, 85, 255, 5],
        [9, 16, 14, 255, 5],
        [17, 20, 44, 255, 5],
        [24, 26, 55, 255, 5],
        [35, 35, 44, 255, 5],
        [20, 41, 50, 255, 5],
        [32, 28, 27, 255, 5],
        [0, 0, 0, 255, 5],
      ],
      algorithm: "dominant",
    })
    .then((color) => {
      return color;
    })
    .catch((e) => console.log(e.message));

  return averageColor;
}
