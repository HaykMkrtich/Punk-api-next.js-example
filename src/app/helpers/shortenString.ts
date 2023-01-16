export default function shortenString(longString: string, length = 140): string {
  if (longString.length <= length) return longString;
  return longString.substring(0, length) + '...';
}
