// src/components/layout/Layout.jsx
import React from 'react';
import './Layout.scss';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <div>{children}</div>
            <Header />

            <Footer />
        </div>
    );
}

export default Layout;
