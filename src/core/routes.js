import { Spinner } from '@chakra-ui/react';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';


// lazy load pages
const HomePage = lazy(() => import('../pages/Home/Home'));
const GatewayList = lazy(() => import('../pages/Gateway/GatewayList'));
const AddGateway = lazy(() => import('../pages/Gateway/AddGateway'));
const GatewayDetails = lazy(() => import('../pages/Gateway/GatewayDetails'));
const AddDevice = lazy(() => import('../pages/Device/AddDevice'));


const AppRoutes = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/gateways" element={<GatewayList />} />
                <Route path="/gateways/add" element={<AddGateway />} />
                <Route path="/gateways/:serial" element={<GatewayDetails />} />
                <Route path="/gateways/:serial/add-device" element={<AddDevice />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
