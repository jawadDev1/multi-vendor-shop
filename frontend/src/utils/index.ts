export const getTimeLeft = (
  targetDate: Date | string,
  start_date?: Date | string
) => {
  const startDate = start_date
    ? new Date(start_date).getTime()
    : new Date().getTime();
  const total = new Date(targetDate).getTime() - startDate;

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
};

export const formateDate = (date: string) => {
  return new Date(date)?.toDateString() || new Date(Date.now()).toDateString();
};

export const formateDateTime = (date: string) => {
  return (
    new Date(date)?.toUTCString() || new Date(Date.now()).toUTCString()
  ).replace("GMT", "");
};

export const convertStringToDate = (date: string) => {
  return new Date(date).toISOString().slice(0, 10);
};

export const calculatePriceAfterDiscount = (
  originalPrice: number,
  discount: number
): number => {
  return originalPrice - (1 - discount / 100);
};
