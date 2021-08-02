const getCoordFromInput= (input: string): number[] | undefined => {
  const coords = input.split(',');
  if (!coords[0] || !coords[1]) {
    return undefined;
  }
  const row = parseInt(coords[0].trim());
  const column = parseInt(coords[1].trim());
  if (isNaN(row) || isNaN(column)) {
    return undefined;
  }
  return [row, column];
};

export default getCoordFromInput;
