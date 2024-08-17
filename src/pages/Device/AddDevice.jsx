import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Heading, FormControl, FormLabel, Input, Select, Button, useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { addDevice } from '../../hooks/Device/AddDevice';

const AddDevicePage = () => {
    const { serial } = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    const [uid, setUid] = useState(0);
    const [vendor, setVendor] = useState('');
    const [status, setStatus] = useState('online');

    const mutation = useMutation((newDevice) => addDevice(serial, newDevice), {
        onSuccess: () => {
            toast({
                title: 'Device added.',
                description: "The device has been added successfully.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            navigate(`/gateways/${serial}`);
        },
        onError: (error) => {
            toast({
                title: 'Error adding device.',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newDevice = {
            uid,
            vendor,
            status,
        };
        mutation.mutate(newDevice);
    };

    return (
        <Box p="5">
            <Heading mb="4">Add Device</Heading>
            <form onSubmit={handleSubmit}>
                <FormControl id="uid" mb="4" isRequired>
                    <FormLabel>UID</FormLabel>
                    <Input
                        type="number"
                        value={uid}
                        onChange={(e) => setUid(parseInt(e.target.value))}
                        placeholder="Enter UID"
                    />
                </FormControl>

                <FormControl id="vendor" mb="4" isRequired>
                    <FormLabel>Vendor</FormLabel>
                    <Input
                        type="text"
                        value={vendor}
                        onChange={(e) => setVendor(e.target.value)}
                        placeholder="Enter Vendor"
                    />
                </FormControl>

                <FormControl id="status" mb="4" isRequired>
                    <FormLabel>Status</FormLabel>
                    <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                    </Select>
                </FormControl>

                <Button colorScheme="teal" type="submit" isLoading={mutation.isLoading}>
                    Add Device
                </Button>
            </form>
        </Box>
    );
};

export default AddDevicePage;
