import React from 'react';
import dayjs from 'dayjs'; // Needed for date formatting
import { Link } from 'react-router-dom'; // Import Link from React Router
import { useNavigate, useLocation } from "react-router-dom";

import './TVLIST.scss'
function TVCARD({ data }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/tv/${data.id}`);

    };
     return (

        <div className="movieCard2" onClick={handleCardClick}>
            <div className="posterBlock">
                <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`} alt={data.title} className="posterImage"/>
                <div className="infoOverlay">
                    <div className="circleRating">{data.vote_average.toFixed(1)}</div>
                </div>
            </div>
            <div className="textBlock">
                <div className="title">{data.title}</div>
                <div className="date">{dayjs(data.release_date).format('MMM D, YYYY')}</div>
            </div>
        </div>

    );
}

export default TVCARD;
