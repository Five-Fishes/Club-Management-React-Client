export const convertDaysDurationToTimeFormat = duration => {
  const days = Math.floor(duration / 1);
  duration = duration - days;
  const hours = Math.floor(duration * 24);
  duration = duration - hours / 24;
  const minutes = Math.floor(duration * (24 * 60));
  duration = duration - minutes / 24 / 60;
  return { days, hours, minutes };
};

export const convertTimeFormatToDaysDuration = ({ days, hours, minutes }) => {
  let duration = (days ? days : 0) + (hours ? hours / 24.0 : 0) + (minutes ? minutes / 60.0 / 24.0 : 0);
  return Number.parseFloat(duration).toFixed(5);
};
