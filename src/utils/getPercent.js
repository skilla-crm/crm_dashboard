function getPercent(total, part) {
  const totalNumber = Number(total);
  const partNumber = Number(part);

  if (!totalNumber || !partNumber) {
    return 0;
  }

  return Math.round((partNumber / totalNumber) * 100);
}

export default getPercent;
