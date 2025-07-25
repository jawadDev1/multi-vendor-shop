import { ProductSearchParams } from "@/app/(user)/products/page";

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

// Calculate price after the discount
export const calculatePriceAfterDiscount = (
  originalPrice: number,
  discount: number
): number => {
  return Number((originalPrice - (1 - discount / 100)).toFixed(2));
};

export const formatMessageTime = (dateString: string) => {
  const date = new Date(dateString);

  const today = new Date();

  const isToday = today.toLocaleDateString() === date.toLocaleDateString();

  const options: Intl.DateTimeFormatOptions = isToday
    ? {
        hour: "numeric",
        minute: "numeric",
      }
    : {
        day: "numeric",
        month: "short",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
      };

  return new Intl.DateTimeFormat(undefined, options).format(date);
};

// generate qury params for products filter
export const generateQuery = (params: ProductSearchParams) => {
  const { category, min_price, max_price, search } = params;
  let query = "";

  if (category) query += `category=${category}&`;
  if (min_price) query += `min_price=${min_price}&`;
  if (max_price) query += `max_price=${max_price}&`;
  if (search) query += `search=${encodeURIComponent(search)}`;

  return query;
};

export const isPriceFilterActive = (
  currentFilter: { min_price: number; max_price: number },
  param_value: { min_price: string; max_price: string }
) => {
  return (
    String(currentFilter.min_price) == param_value.min_price &&
    String(currentFilter.max_price) == param_value.max_price
  );
};
