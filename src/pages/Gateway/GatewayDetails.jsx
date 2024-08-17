import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
import { useGateway } from '../../hooks/Gateway/useGateway';
import { useDevices } from '../../hooks/Device/useDevices';
import { useMutation, useQueryClient } from 'react-query';
import { deleteDevice } from '../../hooks/Device/DeleteDevice';
import { addDevice } from '../../hooks/Device/AddDevice';
import { toggleDeviceStatus } from '../../hooks/Device/useToggleDeviceStatus';

const GatewayDetailsPage = () => {
    const { serial } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: gateway, isLoading: isGatewayLoading, isError: isGatewayError, error: gatewayError } = useGateway(serial);
    const { data: devices, isLoading: isDevicesLoading, isError: isDevicesError, error: devicesError } = useDevices(serial);

    const deleteMutation = useMutation(
        (uid) => deleteDevice(serial, uid),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['devices', serial]);
            },
        }
    );

    // const addMutation = useMutation(
    //     (newDevice) => addDevice(serial, newDevice),
    //     {
    //         onSuccess: (newDevice) => {
    //             queryClient.setQueryData(['devices', serial], (oldDevices) => [...oldDevices, newDevice]);
    //         },
    //     }
    // );

    const statusMutation = useMutation(
        ({ uid, newStatus }) => toggleDeviceStatus(serial, uid, newStatus),
        {
            onMutate: async ({ uid, newStatus }) => {
                await queryClient.cancelQueries(['devices', serial]);

                const previousDevices = queryClient.getQueryData(['devices', serial]);

                queryClient.setQueryData(['devices', serial], (oldDevices) =>
                    oldDevices.map((device) =>
                        device.uid === uid ? { ...device, status: newStatus } : device
                    )
                );

                return { previousDevices };
            },
            onError: (err, { uid, newStatus }, context) => {
                queryClient.setQueryData(['devices', serial], context.previousDevices);
            },
            onSettled: () => {
                queryClient.invalidateQueries(['devices', serial]);
            },
        }
    );

    const handleDelete = (uid) => {
        deleteMutation.mutate(uid);
    };

    // const handleAddDevice = async (newDevice) => {
    //     await addMutation.mutateAsync(newDevice);
    // };

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
                            mr={2}
                            size="sm"
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
                            onClick={() => handleDelete(device.uid)}
                            isLoading={deleteMutation.isLoading && deleteMutation.variables === device.uid}
                        >
                            Delete Device
                        </Button>
                    </ListItem>
                ))}
            </List>

            <Link to={`/gateways/${serial}/add-device`}>
                <Button colorScheme="teal" mt="4" onClick={() => navigate(`/gateways/${serial}/add-device`)}>
                    Add Device
                </Button>
            </Link>
        </Box>
    );
};

export default GatewayDetailsPage;
