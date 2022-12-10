import instance from "./instance";

const getStatisticOrders = () => {
  const api = "statistics/booking";
  return instance.post(api);
};

export { getStatisticOrders };
