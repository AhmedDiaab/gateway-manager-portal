import React, { useState, useTransition } from 'react';
import { useAddGateway } from '../../hooks/Gateway/addGateway';
import { useNavigate } from 'react-router-dom';
import { Box, Text, FormControl, FormLabel, Input, Button, Spinner } from '@chakra-ui/react';

const AddGatewayPage = () => {
    const [name, setName] = useState('');
    const [serial, setSerial] = useState('');
    const [address, setAddress] = useState('');
    const { mutate: addGateway, isLoading } = useAddGateway();
    const navigate = useNavigate();
    const [, startTransition] = useTransition();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newGateway = { name, serial, address };
        startTransition(() => {
            addGateway(newGateway, {
                onSuccess: () => {
                    navigate('/gateways');
                },
            });
        });
    };

    if (isLoading) return <Spinner />; // Show Spinner while data is loading

    return (
        <Box padding="4" maxWidth="500px" mx="auto">
            <Text variant="h4" mb="4">Add New Gateway</Text>
            <form onSubmit={handleSubmit}>
                <Box mb="4">
                    <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input placeholder='Name' onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                </Box>
                <Box mb="4">
                    <FormControl isRequired>
                        <FormLabel>Serial</FormLabel>
                        <Input placeholder='Serial' onChange={(e) => setSerial(e.target.value)} />
                    </FormControl>
                </Box>
                <Box mb="4">
                    <FormControl isRequired>
                        <FormLabel>IP Address</FormLabel>
                        <Input placeholder='IP Address' onChange={(e) => setAddress(e.target.value)} />
                    </FormControl>
                </Box>
                <Button type="submit" variant="contained" color="secondary">Add Gateway</Button>
            </form>
        </Box>
    );
};

export default AddGatewayPage;
