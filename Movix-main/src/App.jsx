import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataFromApi } from './utils/api';
import { getApiConfiguration, getGenres } from './store/homeSlice';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';
import Castdetail from './pages/details/cast/CastDetails';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import MovieList from './pages/MovieList/Addmovie';
import TVLIST from './pages/TVlist/TVLIST';
import ProtectedRoute from './routes/ProtectedRoute';
import ProtectedRouteAdmin from './routes/ProtectedRouteAdmiin';
import NonAdminLayout from './routes/NonAdminLayout';
import Dash from './admin/pages';
import Unauthorized from './pages/404/unauthorized';
import UsersTable from './admin/pages/Users/listofusers';
import Admintable from './admin/pages/Admin/Admin';

import EditUser from './admin/pages/Users/EditUser';
import AddAdmin from './admin/pages/Admin/Users/AdminAdd';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchDataFromApi("/configuration").then((res) => {
            const apiUrl = {
                backdrop: res.images.secure_base_url + "original",
                poster: res.images.secure_base_url + "original",
                profile: res.images.secure_base_url + "original",
            };
            dispatch(getApiConfiguration(apiUrl));
        });
        genresCall();
    }, []);

    const genresCall = async () => {
        let promises = [];
        let endPoints = ["tv", "movie"];
        let allGenres = {};

        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`));
        });

        const data = await Promise.all(promises);
        data.forEach(({ genres }) => {
            genres.forEach((item) => {
                allGenres[item.id] = item;
            });
        });

        dispatch(getGenres(allGenres));
    };

    return (
        <BrowserRouter>
            <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />

                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/movielist/:mediaType" element={<ProtectedRoute><MovieList/></ProtectedRoute>} />
                <Route path="/tvlist/:mediaType" element={<ProtectedRoute><TVLIST /></ProtectedRoute>} />
                <Route path="/explore/:mediaType" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
                <Route path="/:mediaType/:id" element={<ProtectedRoute><Details /></ProtectedRoute>} />
                <Route path="/search/:query" element={<ProtectedRoute><SearchResult /></ProtectedRoute>} />
                <Route path="/Castdetail/:person_id" element={<ProtectedRoute><Castdetail /></ProtectedRoute>} />




                <Route path="/list-of-users" element={<ProtectedRouteAdmin><UsersTable /></ProtectedRouteAdmin>} />
                <Route path="/edit-user/:userId" element={<ProtectedRouteAdmin><EditUser /></ProtectedRouteAdmin>} />
                <Route path="/AddAdmin" element={<ProtectedRouteAdmin><AddAdmin /></ProtectedRouteAdmin>} />

                <Route path="/list-of-Admin" element={<ProtectedRouteAdmin><Admintable /></ProtectedRouteAdmin>} />


                </Routes>

        </BrowserRouter>
    );
}

export default App;
