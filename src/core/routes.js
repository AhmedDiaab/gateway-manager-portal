import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';


// lazy load pages
const HomePage = lazy(() => import('../pages/Home/Home'));

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/todos" element={<TodoPage />} /> */}
        </Routes>
    );
};

export default AppRoutes;
