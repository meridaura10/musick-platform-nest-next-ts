export const convertToTime = (minutes: number): string => {
  const hours: number = Math.floor(minutes / 60);
  const remainingMinutes: number = minutes % 60;
  const timeString: string = `${hours
    .toString()
    .padStart(2, "0")}:${remainingMinutes.toString().padStart(2, "0")}`;

  return timeString;
};
