import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Box,
    Heading,
    Text,
    Spinner,
    Alert,
    AlertIcon,
    List,
    ListItem,
    Button,
    Divider,
} from '@chakra-ui/react';
import { useGateway } from '../../hooks/Gateway/useGateway'; // Ensure correct hook import
import { useDevices } from '../../hooks/Device/useDevices';
import { useMutation, useQueryClient } from 'react-query';
import { deleteDevice } from '../../hooks/Device/DeleteDevice'; // Ensure correct function import
import { toggleDeviceStatus } from '../../hooks/Device/useToggleDeviceStatus';

const GatewayDetailsPage = () => {
    const { serial } = useParams();
    const queryClient = useQueryClient();

    const { data: gateway, isLoading: isGatewayLoading, isError: isGatewayError, error: gatewayError } = useGateway(serial);
    const { data: devices, isLoading: isDevicesLoading, isError: isDevicesError, error: devicesError } = useDevices(serial);

    const mutation = useMutation(
        (uid) => deleteDevice(serial, uid),
        {
            onSuccess: () => {
                // Invalidate devices query to update the list
                queryClient.invalidateQueries(['devices', serial]);
            },
        }
    );

    const handleDelete = (uid) => {
        mutation.mutate(uid);
    };

    const statusMutation = useMutation(
        ({ uid, newStatus }) => toggleDeviceStatus(serial, uid, newStatus),
        {
            onSuccess: (updatedDevice) => {
                queryClient.setQueryData(['devices', serial], (oldDevices) => {
                    return oldDevices.map((device) =>
                        device.uid === updatedDevice.uid ? updatedDevice : device
                    );
                });
            },
        }
    );

    const handleToggleStatus = (uid, currentStatus) => {
        const newStatus = currentStatus === 'online' ? 'offline' : 'online';
        statusMutation.mutate({ uid, newStatus });
    };

    if (isGatewayLoading || isDevicesLoading) return <Spinner size="xl" />;
    if (isGatewayError || isDevicesError) return (
        <Alert status="error">
            <AlertIcon />
            Error: {gatewayError?.message || devicesError?.message}
        </Alert>
    );

    return (
        <Box p="5">
            <Heading mb="4">Gateway Details</Heading>
            <Text><strong>Serial:</strong> {gateway.serial}</Text>
            <Text><strong>Name:</strong> {gateway.name}</Text>
            <Text><strong>Address:</strong> {gateway.address}</Text>

            <Divider my="4" />

            <Heading size="md" mb="2">Devices</Heading>
            <List spacing="3">
                {devices.map((device) => (
                    <ListItem key={device._id} p="3" borderWidth="1px" borderRadius="md">
                        <Text><strong>UID:</strong> {device.uid}</Text>
                        <Text><strong>Vendor:</strong> {device.vendor}</Text>
                        <Text><strong>Status:</strong> {device.status}</Text>
                        <Text><strong>Created At:</strong> {new Date(device.createdAt).toLocaleString()}</Text>
                        <Button
                            mt="2"
                            size="sm"
                            mr={2}
                            colorScheme="teal"
                            onClick={() => handleToggleStatus(device._id, device.status)}
                            isLoading={statusMutation.isLoading && statusMutation.variables.uid === device.uid}
                        >
                            Toggle Status
                        </Button>
                        <Button
                            mt="2"
                            size="sm"
                            colorScheme="red"
                            onClick={() => handleDelete(device._id)}
                            isLoading={mutation.isLoading && mutation.variables === device.uid}
                        >
                            Delete Device
                        </Button>
                    </ListItem>
                ))}
            </List>

            <Link to={`/gateways/${serial}/add-device`}>
                <Button colorScheme="teal" mt="4">
                    Add Device
                </Button>
            </Link>
        </Box>
    );
};

export default GatewayDetailsPage;
