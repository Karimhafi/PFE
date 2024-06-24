import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './listofmovies.scss'; // Ensure this import path matches where your SCSS file is located
import Snackbar from '../../../../components/snackbar/snackbar';
import DeleteIcon from '@mui/icons-material/Delete';

function ListOfMovies() {
    const [movies, setMovies] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/showtimes/movies');
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/showtimes/movies', admin)
            .then(response => {
                setSnackbarMessage('Admin added successfully');
                setSnackbarOpen(true);
                setTimeout(() => {
                    setSnackbarOpen(false);
                }, 3000);
            })
            .catch(error => {
                console.error('Error adding admin:', error);
                setSnackbarMessage('Error adding admin');
                setSnackbarOpen(true);
                setTimeout(() => {
                    setSnackbarOpen(false);
                }, 3000);
            });
    };
    const handleDelete = (showtimeId) => {
        axios.delete(`http://localhost:3001/api/showtimes/movies/${showtimeId}`)
            .then(response => {
                setSnackbarMessage('Showtime deleted successfully');
                setSnackbarOpen(true);
                setMovies(movies.filter(movie => movie.showtime_id !== showtimeId)); // Optimistically update the UI
                setTimeout(() => {
                    setSnackbarOpen(false);
                }, 3000);
            })
            .catch(error => {
                console.error('Error deleting showtime:', error);
                setSnackbarMessage('Error deleting showtime');
                setSnackbarOpen(true);
                setTimeout(() => {
                    setSnackbarOpen(false);
                }, 3000);
            });
    };
    return (
        <div className="list-of-movies-page">
            <div className="movies-table-container">
                <h2 className="table-title">List of Movies</h2>
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Movie ID</th>
                                <th>Title</th>
                                <th>Show Datetime</th>
                                <th>Showtime ID</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {movies.map(movie => (
                                <tr key={movie.showtime_id}>
                                    <td>{movie.movie_id}</td>
                                    <td>{movie.details.title}</td>
                                    <td>{movie.show_datetime}</td>
                                    <td>{movie.showtime_id}</td>
                                    <td>
                                        <button onClick={() => handleDelete(movie.showtime_id)} className="delete-button">
                                            <DeleteIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {snackbarOpen && (
                    <Snackbar message={snackbarMessage} />
                )}
            </div>
        </div>
    );
}

export default ListOfMovies;
