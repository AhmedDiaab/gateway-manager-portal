import AxiosInstance from "../../core/axios";

export const addDevice = async (gatewaySerial, deviceData) => {
    const { data } = await AxiosInstance.post(`/gateways/${gatewaySerial}/devices`, deviceData);
    return data;
};
