import { useMutation, useQueryClient } from "react-query";
import AxiosInstance from "../../core/axios";


const addGateway = async (gateway) => {
    const { data } = await AxiosInstance.post('/gateways', gateway);
    return data;
};

export const useAddGateway = () => {
    const queryClient = useQueryClient();

    return useMutation(addGateway, {
        onSuccess: () => {
            queryClient.invalidateQueries(['gateways']);
        },
    });
};