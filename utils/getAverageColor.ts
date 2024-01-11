import { FastAverageColor } from "fast-average-color";

export async function getAverageColor(imageURL: string) {
  const fac = new FastAverageColor();

  const averageColor = fac
    .getColorAsync(`${imageURL}`, {
      ignoredColor: [
        [255, 255, 255, 255],
        [0, 0, 0, 0],
      ],
      algorithm: "dominant",
    })
    .then((color) => {
      return color;
    })
    .catch((e) => console.log(e.message));

  return averageColor;
}
