export function formatBalance(raw: string): string {
  const match = raw.match(/^(\d+)(\w+)$/);
  if (!match) return raw;

  const [, amount, unit] = match;
  const formatted = Number(amount).toLocaleString();
  return `${formatted} ${unit}`;
}
