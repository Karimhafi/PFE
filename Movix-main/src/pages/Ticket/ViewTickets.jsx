// ViewTickets.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewTickets.scss'; // Import your custom SCSS for styling
import { useSelector } from 'react-redux';
import dayjs from "dayjs";
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';

const ViewTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const user = useSelector((state) => state.user); // Access user data from the Redux store

    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/tickets/user/${user.id}`)
            .then((response) => {
                setTickets(response.data);
                console.log(response.data)   ;             setLoading(false);
            })
            .catch((error) => {
                setError('Failed to fetch tickets');
                setLoading(false);
            });
    }, []);

    const handleEditClick = async (id, movie_id, showtime, cinema_name, seat_number) => {
        try {
            const response = await axios.get(`http://localhost:3001/info/movies/${movie_id}`);
            const movieDetails = response.data;

            const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;
            const headers = {
                Authorization: "Bearer " + TMDB_TOKEN,
            };
            const imagesResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/images`, {
                headers: headers
            });
            const imagesData = imagesResponse.data;
            const poster = imagesData.posters[0].file_path;
            const posterUrl = `https://image.tmdb.org/t/p/original/${poster}`;
            const doc = new jsPDF("p", "mm", [510, 297]); // A4 size: [width, height]

            const logoImage = new Image();
            logoImage.src = '/movix-logo.png';
            doc.addImage(logoImage, 'PNG', doc.internal.pageSize.width - 30, 10, 20, 20);

            doc.setFont('times', 'bold');
            doc.setFontSize(14);
            doc.setTextColor('#000000'); // Black color
            doc.text('Movie Ticket', doc.internal.pageSize.width / 2, 30, null, null, 'center');

            // Add movie image
            const movieImage = new Image();
            movieImage.src = posterUrl;
            doc.addImage(movieImage, 40, 40, 60, 90);

            // Add movie title
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(18);
            doc.text(`Title: ${movieDetails.title}`, 120, 60);

            // Add genre
            doc.setFontSize(16);
            doc.text(`Genres: ${movieDetails.genres.map(genre => genre.name).join(', ')}`, 120, 80);

            // Add showtime
            doc.text(`Showtime: ${dayjs(movieDetails.showtime).format('MMMM D, YYYY h:mm A')}`, 120, 100);

            // Add cinema name and seat number
            doc.text(`Cinema: ${cinema_name}`, 120, 120);
            doc.text(`Seat: ${seat_number%100}`, 120, 140);

            // Save the PDF as a file
            doc.save(`movie_ticket_${id}.pdf`);
        } catch (error) {
            console.error('Error fetching or generating movie ticket:', error);
            // Handle error, e.g., show an error message to the user
        }
    };

    return (
        <div className="view-tickets-page">
            <div className="tickets-container">
                {loading ? (
                    <p>Loading...</p>
                ) : tickets.length > 0 ? (
                    <>
                        <h2>Your Tickets</h2>
                        <table className="ticket-table">
                            <thead>
                                <tr>
                                    <th>Ticket ID</th>
                                    <th>Date</th>
                                    <th>Cinema</th>
                                    <th>Seat</th>
                                    <th>Print</th>

                                </tr>
                            </thead>
                            <tbody>
                            {tickets.sort((a, b) => a.id - b.id).map((ticket) => (
                                    <tr key={ticket.id}>
                                        <td>{ticket.id}</td>
                                        <td>{dayjs(ticket.showtime).format('MMMM D, YYYY h:mm A')}</td>
                                        <td>{ticket.cinema_name}</td>
                                        <td>{ticket.seat_number}</td>
                                        <button style={{background:'none',color:'white'}} onClick={() => handleEditClick(ticket.id,ticket.movie_id,ticket.showtime,ticket.cinema_name,ticket.seat_number)} className="delete-button">
                                            <DownloadIcon style={{width:'20px',background:'none',color:'white'}}/></button>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <p className="no-tickets-message">No tickets found.</p>
                )}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default ViewTickets;
