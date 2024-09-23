export function getFormattedDateString(date) {
  const segments = date.split(/[\s:.]+/);

  return `${segments[2]}-${segments[1]}-${segments[0]}:${segments[3]}:${segments[4]} `
}