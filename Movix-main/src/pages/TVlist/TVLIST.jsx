import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import TVCARD from "./TVCARD";
import './TVLIST.scss'

function TVLIST() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useSelector((state) => state.user); // Access user data from the Redux store

    useEffect(() => {
        fetch(`http://localhost:3001/user-tvshows/${user.id}`)
            .then(res => res.json())
            .then(data => {
                setMovies(data);
                console.log(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error:', err);
                setError('Failed to load movies');
                setLoading(false);
            });
    }, [user.id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="moviesPage">

        <ContentWrapper>
            <div className="moviesContainer">
                {movies.map((movie, index) => (
                    <TVCARD key={index} data={movie} />
                ))}
            </div>

        </ContentWrapper>            </div>

    );
}

export default TVLIST;
