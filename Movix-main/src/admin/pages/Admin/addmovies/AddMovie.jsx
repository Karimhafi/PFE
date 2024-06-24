import React, { useState, useEffect } from "react";
import axios from "axios";

import "./style2.scss";

import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import Spinner from "../../../../components/spinner/Spinner";
import ShowtimeModal from "./ShowtimeModal";

const AdminExplore = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "https://api.themoviedb.org/3/discover/movie",
                {
                    headers: {
                        Authorization: `Bearer ${TMDB_TOKEN}`,
                    },
                }
            );
            setMovies(response.data.results);
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
        setShowModal(false);
    };

    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">Explore Movies</div>
                </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <div className="content">
                        {movies.length > 0 ? (
                            movies.map((movie, index) => (
                                <div key={index} className="movieCard">
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                        alt={movie.title}
                                        className="posterImage"
                                    />
                                    <div className="title">{movie.title}</div>
                                    <button
                                        className="addButton"
                                        onClick={() => handleMovieClick(movie)}
                                    >
                                        ADD
                                    </button>
                                </div>
                            ))
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </div>
                )}
                {showModal && (
                    <ShowtimeModal
                        movie={selectedMovie}
                        onClose={handleCloseModal}
                    />
                )}
            </ContentWrapper>
        </div>
    );
};

export default AdminExplore;
