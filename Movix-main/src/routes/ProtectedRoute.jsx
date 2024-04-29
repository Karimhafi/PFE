import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const ProtectedRoute = ({ children }) => {
    const isUserLoggedIn = useSelector(state => state.user.ison);
    const userRole = useSelector(state => state.user.role); // Consistent variable naming

    // Redirect to login if not logged in or if the user role is not 'User'
    if (!isUserLoggedIn || userRole !== 'user') {
        return <Navigate to="/login" />;
    }

    // Render the layout with header, outlet (content), and footer if the user is logged in as 'User'
    return (
        <>
            <Header />
            {children}
                   <Footer />
        </>
    );
};

export default ProtectedRoute;
