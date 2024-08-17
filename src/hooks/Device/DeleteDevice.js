// hooks/Device/deleteDevice.js
import AxiosInstance from '../../core/axios'; // Ensure AxiosInstance is correctly configured

export const deleteDevice = async (serial, uid) => {
    try {
        // Make a DELETE request to the API
        await AxiosInstance.delete(`/gateways/${serial}/devices/${uid}`);
    } catch (error) {
        // Handle errors if the request fails
        throw new Error(error.response?.data?.message || 'An error occurred while deleting the device.');
    }
};
