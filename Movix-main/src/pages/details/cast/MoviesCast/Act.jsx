// VideosSection.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const VideosSection = ({ mediaType, movieCreditsData }) => {
  const navigate = useNavigate();

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    arrows: false,
    speed: 1000,
    useWheel: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const title = mediaType === "tv" ? " TV Shows Featuring" : " Movies Featuring";

  return (
    <div className="videos-section">
      <h2>{title}</h2>
      <Slider {...settings}>
        {movieCreditsData.cast.map((media) => (
          <div key={media.id}>
            <img
              src={`https://image.tmdb.org/t/p/w300${media.poster_path}`}
              alt={media.title || media.name}
              onClick={() =>
                {
                navigate(

                  `/${mediaType}/${media.id}`
                )
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VideosSection;
