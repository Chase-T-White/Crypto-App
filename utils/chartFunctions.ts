export function setVolumeChartParams(
  timeScale: string,
  volumeData: number[][]
) {
  let labels = [];
  let interval;
  let dataPointsPerInterval;
  let averageVolumePerInterval = [];

  // Create chart labels based on selected timeScale
  switch (timeScale) {
    case "1day":
      // hour interval
      for (let i = 1; i <= 24; i++) {
        labels.push(i);
      }
      interval = 24;
      dataPointsPerInterval = 12;
      break;
    case "7days":
      // 12 hour interval
      for (let i = 12; i <= 168; i += 12) {
        labels.push(i);
      }
      interval = 14;
      dataPointsPerInterval = 12;
      break;
    case "14days":
      // 1 day interval
      for (let i = 1; i <= 14; i++) {
        labels.push(i);
      }
      interval = 14;
      dataPointsPerInterval = 24;
      break;
    case "1month":
      // 1 day interval 31 days
      for (let i = 1; i <= 31; i++) {
        labels.push(i);
      }
      interval = 31;
      dataPointsPerInterval = 24;
      break;
    case "6months":
      // 1 week interval 182 days
      for (let i = 1; i <= 26; i++) {
        labels.push(i);
      }
      interval = 26;
      dataPointsPerInterval = 7;
      break;
    case "1year":
      // 2 week interval
      for (let i = 2; i <= 52; i += 2) {
        labels.push(i);
      }
      interval = 26;
      dataPointsPerInterval = 14;
      break;
  }

  // Seperate volume data from date date. Group volume data by interval then get an average value for bar chart to display
  let volumeOnlyData = volumeData.map((data) => {
    return data[1];
  });

  const reversedVolumeData = volumeOnlyData.reverse();

  if (interval && dataPointsPerInterval) {
    for (let i = 1; i <= interval; i++) {
      let groupedDataPoints = [];
      for (let j = 1; j <= dataPointsPerInterval; j++) {
        groupedDataPoints.push(reversedVolumeData[i * j - 1]);
      }
      const sum = groupedDataPoints.reduce((ac, cV) => ac + cV, 0);
      averageVolumePerInterval.push(sum / groupedDataPoints.length);
    }
  }

  return { labels, averageVolumePerInterval };
}
