import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import HeaderAdmin from '../components/header/HeaderAdmin';
import Footeradmin from '../components/footer/Footeradmin';
const ProtectedRouteAdmin = ({ children }) => {
    const isUserLoggedIn = useSelector(state => state.user.ison); // Fetching login status from Redux state
    const userRole = useSelector(state => state.user.role); // Fetching user role from Redux state

    // Check if user is logged in and has the 'Admin' role
    // It should be '&&' to ensure both conditions must be true
    // Also, corrected '===' from '!==='
    if (!isUserLoggedIn || userRole !== 'Admin') {
        return <Navigate to="/404" />; // Redirect to 404 page if conditions are not met
    }

    // Return children correctly wrapped in a fragment if the conditions are met
    return(   <>
    <HeaderAdmin />

    {children}

    <Footeradmin />   </>
);
};

export default ProtectedRouteAdmin;
