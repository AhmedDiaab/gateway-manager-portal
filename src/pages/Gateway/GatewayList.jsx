import React, { useState } from 'react';
import { useGateways } from '../../hooks/Gateway/listGateways';
import { useDeleteGateway } from '../../hooks/Gateway/deleteGateway'; // Import the delete hook
import { Link } from 'react-router-dom';
import {
    Box,
    Heading,
    Text,
    List,
    ListItem,
    Button,
    Spinner,
    Alert,
    AlertIcon,
    Collapse,
    useToast
} from '@chakra-ui/react';

const GatewayListPage = () => {
    const [page, setPage] = useState(1);
    const [selectedGateway, setSelectedGateway] = useState(null);
    const limit = 10;
    const { data: gateways, isLoading, isError, error } = useGateways(page, limit);
    const deleteGatewayMutation = useDeleteGateway(); // Initialize the delete mutation
    const toast = useToast();

    if (isLoading) return <Spinner size="xl" />;
    if (isError) return (
        <Alert status="error">
            <AlertIcon />
            Error: {error.message}
        </Alert>
    );

    const handleNextPage = () => setPage((prev) => prev + 1);
    const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

    const handleSelectGateway = (serial) => {
        setSelectedGateway(selectedGateway === serial ? null : serial);
    };

    const handleDeleteGateway = (serial) => {
        deleteGatewayMutation.mutate(serial, {
            onSuccess: () => {
                toast({
                    title: "Gateway deleted.",
                    description: `The gateway with serial ${serial} was successfully deleted.`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            },
            onError: (error) => {
                toast({
                    title: "Error deleting gateway.",
                    description: error.response?.data?.message || "An error occurred while deleting the gateway.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            },
        });
    };

    return (
        <Box p="5">
            <Heading mb="4">Gateways List</Heading>
            <Link to="/gateways/add">
                <Button colorScheme="teal" mb="4">Add New Gateway</Button>
            </Link>
            <List spacing="3">
                {gateways.gateways.map((gateway) => (
                    <ListItem key={gateway.serial} p="3" borderWidth="1px" borderRadius="md">
                        <Link to={`/gateways/${gateway.serial}`}>
                            <Text><strong>Name:</strong> {gateway.name}</Text>
                        </Link>
                        <Text><strong>Serial:</strong> {gateway.serial}</Text>
                        <Button
                            mt="2"
                            size="sm"
                            colorScheme="teal"
                            onClick={() => handleSelectGateway(gateway.serial)}
                        >
                            {selectedGateway === gateway.serial ? 'Hide Details' : 'Show Details'}
                        </Button>
                        <Collapse in={selectedGateway === gateway.serial} animateOpacity>
                            <Box mt="4" p="2" borderWidth="1px" borderRadius="md">
                                <Text><strong>Address:</strong> {gateway.address}</Text>
                                <Link to={`/gateways/${gateway.serial}`}>
                                    <Button mt="2" size="sm" colorScheme="blue">
                                        View Details
                                    </Button>
                                </Link>
                                <Button
                                    mt="2"
                                    ml="2"
                                    size="sm"
                                    colorScheme="red"
                                    onClick={() => handleDeleteGateway(gateway.serial)}
                                    isLoading={deleteGatewayMutation.isLoading}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </Collapse>
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
