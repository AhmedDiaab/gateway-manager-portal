import AxiosInstance from "../../core/axios";


export const addGateway = async (gateway) => {
    const { data } = await AxiosInstance.post('/gateways', gateway);
    return data;
};