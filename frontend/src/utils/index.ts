export const getTimeLeft = (targetDate: Date | string) => {
  const total = new Date(targetDate).getTime() - new Date().getTime();

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
};

export const formateDate = (date: string) => {
  return new Date(date)?.toDateString() || new Date(Date.now()).toDateString();
};

export const convertStringToDate = (date: string) => {
  return new Date(date).toISOString().slice(0, 10);
};
