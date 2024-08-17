import { Spinner } from '@chakra-ui/react';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';


// lazy load pages
const HomePage = lazy(() => import('../pages/Home/Home'));
const GatewayList = lazy(() => import('../pages/Gateway/GatewayList'));
const AddGateway = lazy(() => import('../pages/Gateway/AddGateway'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/gateways" element={<GatewayList />} />
                <Route path="/gateways/add" element={<AddGateway />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
