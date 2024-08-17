// hooks/Device/toggleDeviceStatus.js

import AxiosInstance from '../../core/axios';

export const toggleDeviceStatus = async (serial, uid, newStatus) => {
    const { data } = await AxiosInstance.patch(`/gateways/${serial}/devices/${uid}`, { status: newStatus });
    return data.data || { status: newStatus };
};
