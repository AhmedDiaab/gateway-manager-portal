import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </ChakraProvider>,
);
