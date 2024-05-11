import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SeatModal.scss";
import { useSelector } from 'react-redux';
import dayjs from 'dayjs'; // Ensure dayjs is installed via npm

const SeatModal = ({ onClose, movie, showtimeId,date }) => {
    const [seats, setSeats] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);

    const user = useSelector((state) => state.user); // Access user data from the Redux store
    const cinemaName = 'Pathe';
    const cinemaAddress = 'Tunisia';
    const showtime = date; // Calculates a showtime 5 hours from now

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/available-seats/${showtimeId}`);
                setSeats(response.data);
                console.log(seats);
            } catch (error) {
                console.error("Error fetching seats:", error);
            }
        };

        if (showtimeId) {
            fetchSeats();
        }
    }, [showtimeId]);

    const handleSeatClick = (seatId, isBooked) => {
        if (!isBooked) {
            setSelectedSeat(seatId);
        }
    };

    const handleBookSeat = async () => {

        try {
            const response = await axios.post('http://localhost:3001/api/tickets', {
                userId: user.id,
                movie_id: movie,
                seatNumber: selectedSeat,
                cinemaName: cinemaName,
                cinemaAddress: cinemaAddress,
                showtime: showtime,
                showtimeId:showtimeId

            });
            onClose(); // Close modal after booking
        } catch (error) {
            console.error("Error booking seat:", error);
        }
    };

    const handleCloseModal = () => {
        setSelectedSeat(null);
        onClose();
    };

    return (
        <div className="seatModal">
            <div className="modalContent">
                <h2>Select a Seat</h2>
                <div className="seatGrid">
                    {seats.map((seat) => (
                        <div
                            key={seat.seat_id}
                            className={`seat ${selectedSeat === seat.seat_id ? "selected" : ""} ${seat.is_booked ? "occupied" : "available"}`}
                            onClick={() => handleSeatClick(seat.seat_id, seat.is_booked)}
                        >
                            <img src='/seat.png' alt="Seat" style={ {width:'20px',height:'20px'}}/>
                        </div>
                    ))}
                </div>
                <div className="modalButtons">
                    <button onClick={handleCloseModal}>Cancel</button>
                    <button onClick={handleBookSeat} disabled={!selectedSeat}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default SeatModal;
