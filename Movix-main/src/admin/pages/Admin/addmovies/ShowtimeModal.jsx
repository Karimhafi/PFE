import React, { useState } from "react";
import axios from "axios";
import'./modale.scss';
const ShowtimeModal = ({ movie, onClose }) => {
    const [selectedDate, setSelectedDate] = useState("");
console.log(movie.id);
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            // Perform validation if needed
            if (!selectedDate) {
                alert("Please select a date.");
                return;
            }

            // Submit new showtime
            await axios.post("http://localhost:3001/api/showtimes", {
                movie_id: movie.id,
                show_datetime: selectedDate,
            });

            // Close modal
            onClose();
        } catch (error) {
            console.error("Error submitting showtime:", error);
            // Handle error
        }
    };

    return (
        <div className="modal">
            <div className="modalContent">
                <h2>Add Showtime for {movie.title}</h2>
                <label htmlFor="date">Select Date:</label>
                <input
                   type="datetime-local"
                   id="datetime"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
                <div className="modalButtons">
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ShowtimeModal;
