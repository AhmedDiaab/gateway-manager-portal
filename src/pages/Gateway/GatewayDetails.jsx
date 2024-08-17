import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGateway } from '../../hooks/Gateway/showGatewayDetails'; // Assuming you have a hook to fetch a single gateway
import {
    Box,
    Heading,
    Text,
    Spinner,
    Alert,
    AlertIcon,
    Button
} from '@chakra-ui/react';

const GatewayDetailPage = () => {
    const { serial } = useParams(); // Extract the serial number from the URL
    const { data: gateway, isLoading, isError, error } = useGateway(serial);

    if (isLoading) return <Spinner size="xl" />;
    if (isError) return (
        <Alert status="error">
            <AlertIcon />
            Error: {error.message}
        </Alert>
    );

    return (
        <Box p="5">
            <Heading mb="4">Gateway Details</Heading>
            <Text><strong>Name:</strong> {gateway.name}</Text>
            <Text><strong>Serial:</strong> {gateway.serial}</Text>
            <Text><strong>Address:</strong> {gateway.address}</Text>
            {/* Add more details as needed */}
            <Link to="/gateways">
                <Button mt="4" colorScheme="teal">Back to List</Button>
            </Link>
        </Box>
    );
};

export default GatewayDetailPage;
