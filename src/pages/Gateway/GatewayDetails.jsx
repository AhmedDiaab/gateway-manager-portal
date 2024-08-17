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
                    <ListItem key={device.uid} p="3" borderWidth="1px" borderRadius="md">
                        <Text><strong>UID:</strong> {device.uid}</Text>
                        <Text><strong>Vendor:</strong> {device.vendor}</Text>
                        <Text><strong>Status:</strong> {device.status}</Text>
                        <Text><strong>Created At:</strong> {new Date(device.createdAt).toLocaleString()}</Text>
                        <Button
                            mt="2"
                            size="sm"
                            colorScheme="red"
                            onClick={() => handleDelete(device.uid)}
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
