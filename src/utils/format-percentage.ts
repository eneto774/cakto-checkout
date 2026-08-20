export const formatPercentage = (rate: number): string =>
  `${(rate * 100).toFixed(2).replace(".", ",")}%`;
