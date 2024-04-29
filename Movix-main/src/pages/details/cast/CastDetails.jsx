import React from "react";
import useFetch from "../../../hooks/useFetch";
import "./castdetailStyle-2.scss";
import { useParams } from "react-router-dom";
import VideosSection from "./MoviesCast/Act"; // Import the generic VideosSection component
import { useState } from "react";

const Castdetail = () => {
  const { person_id } = useParams();
  const { data: personData, loading: personLoading, error: personError } = useFetch(`/person/${person_id}`);
  const { data: movieCreditsData, loading: movieCreditsLoading, error: movieCreditsError } = useFetch(`/person/${person_id}/movie_credits`);
  const { data: tvCreditsData, loading: tvCreditsLoading, error: tvCreditsError } = useFetch(`/person/${person_id}/tv_credits`);
  const [showFullBiography, setShowFullBiography] = useState(false);

  const toggleBiography = () => {
    setShowFullBiography(!showFullBiography);
  };

  if (personLoading || movieCreditsLoading || tvCreditsLoading) {
    return <p>Loading...</p>;
  }

  if (personError || movieCreditsError || tvCreditsError) {
    return <p>Error: {personError || movieCreditsError || tvCreditsError.message}</p>;
  }
  

    return (
        <div className="cast-detail-container">
            {personLoading && movieCreditsLoading && <p>Loading...</p>}
            {(personError || movieCreditsError) && <p>Error: {personError || movieCreditsError.message}</p>}
            {personData && movieCreditsData && (
                <>
                    <div className="cast-header">
                        <img
                            className="profileImg"
                            src={`https://image.tmdb.org/t/p/w300${personData.profile_path}`}
                            alt={personData.name}
                        />
                        <div className="cast-details">
                            <h1 className="name">{personData.name}</h1>
                            <p>
                                <strong>Birthday:</strong> {personData.birthday}
                            </p>
                            <p>
                                <strong>Place of Birth:</strong> {personData.place_of_birth}
                            </p>
                            <p>
                                <strong>Known For:</strong> {personData.known_for_department}
                            </p>
                            <p>
                                <strong>Gender:</strong> {personData.gender === 1 ? "Female" : "Male"}
                            </p>
                            <p>
                                <strong>Popularity:</strong> {personData.popularity}
                            </p>
                            <p>
                                <strong>Biography:</strong>{" "}
                                {showFullBiography ? personData.biography : `${personData.biography.slice(0, 200)}...`}
                                <button onClick={toggleBiography} className="read-more-button">
                                    {showFullBiography ? "Read Less" : "Read More"}
                                </button>
                            </p>
                        </div>
                    </div>
                   
                    
                    <div>
                    <VideosSection mediaType="movie" movieCreditsData={movieCreditsData} />
                    <VideosSection mediaType="tv" movieCreditsData={tvCreditsData} />

                    </div>
                </>
            )}
        </div>
    );
};

export default Castdetail;