import React, { useState, useEffect } from "react";
import axios from "axios";
import "./showtime.scss";
import SeatModal from "./modale";

const Showtime = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleBookClick = (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:3001/api/showtimes/movies");
                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="profile-page">
            <div className="movieList">
                <h1>Movie List</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="movies">
                        {movies.map((movie) => (
                            <div key={movie.movie_id} className="movie">
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${movie.details.poster_path}`}
                                    alt={`${movie.details.title} poster`}
                                    className="poster"
                                />
                                <div className="details">
                                    <h2>{movie.details.title}</h2>
                                    <p style={{color:'white'}}>Release Date: {movie.details.release_date}</p>
                                    <p style={{color:'white'}}>Showtime: {movie.show_datetime}</p>
                                    <button onClick={() => handleBookClick(movie)} aria-label={`Book ${movie.details.title}`}>
                                        Book
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {showModal && (
                <SeatModal
                    onClose={handleCloseModal}
                    movie={selectedMovie.movie_id}
                    showtimeId={selectedMovie.showtime_id}
                    date={selectedMovie.show_datetime}
                />
            )}
        </div>
    );
};

export default Showtime;
