import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';


// lazy load pages
const HomePage = lazy(() => import('../pages/Home/Home'));
const GatewayList = lazy(() => import('../pages/Gateway/GatewayList'));

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gateways" element={<GatewayList />} />
        </Routes>
    );
};

export default AppRoutes;
