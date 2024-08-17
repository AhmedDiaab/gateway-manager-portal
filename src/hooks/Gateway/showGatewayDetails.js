export const showGatewayDetails = async (serial) => {
    const { data } = await axios.get(`/api/gateways/${serial}`);
    return data;
};