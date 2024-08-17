import AxiosInstance from "../../core/axios";

export const fetchGateways = async (serial) => {
    const { data } = await AxiosInstance.delete(`/gateways/${serial}`);
    return data;
  };