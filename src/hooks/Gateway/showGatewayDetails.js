import { useQuery } from 'react-query';
import AxiosInstance from '../../core/axios';


export const useGateway = (serial) => {
    return useQuery(['gateway', serial], async () => {
        const { data } = await AxiosInstance.get(`/gateways/${serial}`);
        return data.data;
    });
};
