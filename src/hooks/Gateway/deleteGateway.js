import { useMutation, useQueryClient } from 'react-query';
import AxiosInstance from '../../core/axios';

export const useDeleteGateway = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (serial) => AxiosInstance.delete(`/gateways/${serial}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('gateways'); // Invalidate the gateways query to refetch the data
      },
    }
  );
};
