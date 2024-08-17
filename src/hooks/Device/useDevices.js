import { useQuery } from 'react-query';
import AxiosInstance from '../../core/axios';

export const useDevices = (serial) => {
    return useQuery(
        ['devices', serial],
        async () => {
            const { data } = await AxiosInstance.get(`/gateways/${serial}/devices`);
            return data.data; // Adjust based on your API response structure
        },
        {
            enabled: !!serial, // Ensures query only runs if serial is provided
            retry: 1,
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 60 * 1000,
        }
    );
};
