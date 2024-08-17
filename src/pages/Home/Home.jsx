import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Text } from '@chakra-ui/react'; // Import Chakra UI components

const HomePage = () => {
  return (
    <Box textAlign="center" py="5">
      <Heading mb="4">Home Page</Heading>
      <Text fontSize="lg">
        <Link to="/gateways" style={{ textDecoration: 'none', color: 'teal.500' }}>
          Go to Gateways
        </Link>
      </Text>
    </Box>
  );
};

export default HomePage;
