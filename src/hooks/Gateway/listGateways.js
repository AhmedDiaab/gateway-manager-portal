import { useQuery } from "react-query";
import AxiosInstance from "../../core/axios";

const listGateways = async (limit = 10, page = 1) => {
  const { data } = await AxiosInstance.get('/gateways', {
    params: { currentPage: page, itemsLimit: limit }
  });
  return data.data;
};

export const useGateways = (page, limit) => {
  return useQuery(['gateways', page, limit], () => fetchGateways(page, limit));
};