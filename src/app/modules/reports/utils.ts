export const millionsToOutputFormat = (millions: number) => {
  const tins = (millions / 80).toFixed(1);
  return `${millions} Millions | ${tins} Tins`;
};

export const frozenCupsToOutputFormat = (frozenCups: number) => {
  const millions = frozenCups * 5;
  const tins = (frozenCups / 16).toFixed(1);
  return `${frozenCups} Frozen Cups | ${millions} Millions | ${tins} Tins`;
};
