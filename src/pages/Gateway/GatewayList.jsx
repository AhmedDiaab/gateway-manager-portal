import React, { useState } from 'react';
import { useGateways } from '../../hooks/Gateway/listGateways';
import { Link } from 'react-router-dom';
import { Box, Heading, Text, List, ListItem, Button, Spinner, Alert, AlertIcon } from '@chakra-ui/react';

const GatewayListPage = () => {
    const [page, setPage] = useState(1);
    const limit = 10; // Number of items per page
    const { data: gateways, isLoading, isError, error } = useGateways(page, limit);

    if (isLoading) return <Spinner size="xl" />;
    if (isError) return (
        <Alert status="error">
            <AlertIcon />
            Error: {error.message}
        </Alert>
    );

    const handleNextPage = () => setPage((prev) => prev + 1);
    const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

    return (
        <Box p="5">
            <Heading mb="4">Gateways List</Heading>
            <Link to="/gateways/add">
                <Button colorScheme="teal" mb="4">Add New Gateway</Button>
            </Link>
            <List spacing="3">
                {gateways.gateways.map((gateway) => (
                    <ListItem key={gateway.serial} p="3" borderWidth="1px" borderRadius="md">
                        <Text><strong>Name:</strong> {gateway.name}</Text>
                        <Text><strong>Serial:</strong> {gateway.serial}</Text>
                        <Text><strong>Address:</strong> {gateway.address}</Text>
                    </ListItem>
                ))}
            </List>
            <Box mt="4" textAlign="center">
                <Button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    mr="2"
                >
                    Previous
                </Button>
                <Text as="span" mx="2">Page {page}</Text>
                <Button
                    onClick={handleNextPage}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default GatewayListPage;
