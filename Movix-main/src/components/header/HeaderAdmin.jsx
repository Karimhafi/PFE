import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import { useDispatch } from 'react-redux';
import { clearUser } from '../../store/userSlice'; // Import setUser action

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";
import axios from 'axios';



    const HeaderAdmin = () => {
        const [show, setShow] = useState("top");
        const [lastScrollY, setLastScrollY] = useState(0);
        const [mobileMenu, setMobileMenu] = useState(false);
        const [query, setQuery] = useState("");
        const [showSearch, setShowSearch] = useState("");
        const navigate = useNavigate();
        const location = useLocation();
        const user = useSelector((state) => state.user); // Access user data from the Redux store
        const dispatch = useDispatch();
        const [error, setError] = useState('');
        const [Userinfo, setUserinfo] = useState('');
        const [isOpen, setIsOpen] = useState(false);



        useEffect(() => {
            window.scrollTo(0, 0);
        }, [location]);

        const controlNavbar = () => {
            if (window.scrollY > 200) {
                if (window.scrollY > lastScrollY && !mobileMenu) {
                    setShow("hide");
                } else {
                    setShow("show");
                }
            } else {
                setShow("top");
            }
            setLastScrollY(window.scrollY);
        };

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [location]);

        useEffect(() => {
            window.addEventListener("scroll", controlNavbar);
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/api/users/${user.id}`);
                    if (response.status === 200) {
                        setUserinfo(response.data);

                    } else {
                        console.error('Failed to fetch user data:', response.statusText);
                        setError('Failed to fetch user data');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setError('Error fetching user data');
                }
            }

            fetchUser();

            return () => {
                window.removeEventListener("scroll", controlNavbar);
            };
        }, []);






        const openMobileMenu = () => {
            setMobileMenu(true);
            setShowSearch(false);
        };


        const navigationHandlerlogin = () => {

                navigate("/login");

        };

    const Logout = () => {

        dispatch(clearUser());
        navigate("/login");

    };
    const navigateusers = () => {

        navigate("/list-of-users");

    };
    const navigateAdmin = () => {

        navigate("/list-of-Admin");

    };
    const navigateAdminADD = () => {

        navigate("/AddAdmin");

    };


    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="" />
                </div>
                <ul className="menuItems">

                <li className="menuItem" >Welcome Admin, {Userinfo.username}
    </li>
                    <li
                        className="menuItem" onClick={navigateusers}
                    >

                        List of Users
                    </li>

                    <li
                        className="menuItem" onClick={navigateAdmin}
                        >
                        List of admin
                                            </li>
                                            <li
                        className="menuItem" onClick={navigateAdminADD}
                        >
                        Add a admin
                                            </li>


                    {user.id ? ( // Check if user is logged in
                        <>






        <li
                                className="menuItem"
                                onClick={() => Logout()}
                            >
                                Logout
                            </li>
                        </>
                    ) : (
                        <>
                            <li
                                className="menuItem"
                                onClick={() => navigationHandlerlogin()}
                            >
                                Login
                            </li>


                        </>
                    )}

                </ul>

                <div className="mobileMenuItems">
                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu onClick={openMobileMenu} />
                    )}
                </div>
            </ContentWrapper>
            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search for a movie or tv show...."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                                                                                   <div className="searchbutton"> <HiOutlineSearch onClick={searchQueryHandler2} /></div>

                            <VscChromeClose
                                onClick={() => setShowSearch(false)}
                            />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
    };


    export default HeaderAdmin;


