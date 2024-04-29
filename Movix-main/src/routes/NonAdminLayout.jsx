// File: src/layouts/NonAdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const NonAdminLayout = () => (
    <>
        <Outlet />
        {/* <Footer />        <Header /> */}

    </>
);

export default NonAdminLayout;
