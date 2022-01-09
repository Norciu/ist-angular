export const recordTranslator = (total: number | string): string => {
  const t = typeof total === 'string' ? Number(total) : total;

  if (t === 0) {
    return 'rekordów';
  }
  if (t === 1) {
    return 'rekord';
  }
  if (total > 1 && total < 5) {
    return 'rekordy';
  }
  return 'rekordów';
}
