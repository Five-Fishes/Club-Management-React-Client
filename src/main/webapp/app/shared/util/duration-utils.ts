export function convertDaysDurationToTimeFormat(duration?: number): ITimeFormatProps {
  if (typeof duration === 'undefined') duration = 0;
  const days = Math.floor(duration / 1);
  duration = duration - days;
  const hours = Math.floor(duration * 24);
  duration = duration - hours / 24;
  const minutes = Math.floor(duration * (24 * 60));
  duration = duration - minutes / 24 / 60;
  return { days, hours, minutes };
}

interface ITimeFormatProps {
  days: number;
  hours: number;
  minutes: number;
}

export function convertTimeFormatToDaysDuration(timeFormatProps: ITimeFormatProps): string {
  const { days, hours, minutes } = timeFormatProps;
  const duration = (days ? days / 1.0 : 0) + (hours ? hours / 24.0 : 0) + (minutes ? minutes / 60.0 / 24.0 : 0);
  return duration.toFixed(5);
}

export function timeFormatDurationToString(timeFormatProps: ITimeFormatProps): string {
  const { days, hours, minutes } = timeFormatProps;
  let stringDuration = '';
  if (days) {
    stringDuration += days + ' days ';
  }
  if (hours) {
    stringDuration += hours + ' hours ';
  }
  if (minutes) {
    stringDuration += minutes + ' minutes';
  }
  return stringDuration;
}
