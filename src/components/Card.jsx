import React, { useState} from "react";
import { Link } from "react-router-dom";


function Card({ movie, orientation, updateBg }) {
    const target = orientation === "poster_path" ? "" : "_blank";
  
    const [isHovered, setIsHovered] = useState(false);
  
    const handleEnterHover = () => {
      setIsHovered(true);
      const bg = movie.backdrop_path;
      updateBg(bg);
    };
  
    const handleLeaveHover = () => {
      setIsHovered(false);
      updateBg("");
    };
  
    const url =
      orientation === "poster_path"
        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
        : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  
    const trailerGradient = {
      backgroundImage: isHovered
        ? `linear-gradient(rgba(68, 27, 77, 0.8), rgba(68, 27, 77, 0.8)), url(${url})`
        : `url(${url})`,
    };
  
    const date = orientation === "poster_path" && movie.release_date;
    const showButton = isHovered ? "block" : "none";
    const urlVideo = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=79b6766f2960d692019a0072eacfd852`;
  
    const [trailerKey, setTrailerKey] = useState("");
  
    if (orientation === "backdrop_path") {
      fetch(urlVideo)
        .then((response) => response.json())
        .then((data) => {
          setTrailerKey(data.results[0].key);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const ytUrl = trailerKey
      ? `https://www.youtube.com/watch?v=${trailerKey}`
      : "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";
  
    const location =
      orientation === "poster_path" ? `/movies/${movie.id}` : ytUrl;
  
    return (
      <div className="col-lg-3 d-flex align-items-stretch">
        <Link to={location} target={target} style={{ textDecoration: "none" }}>
          <div
            className="card border-0 rounded"
            style={{ backgroundColor: "transparent" }}
            onMouseEnter={handleEnterHover}
            onMouseLeave={handleLeaveHover}
          >
            {orientation === "poster_path" ? (
              <img
                src={url}
                className="card-img-top"
                alt={movie.original_title}
                style={{
                  borderRadius: "15px",
                  marginBottom: "1em",
                  zIndex: "200",
                }}
              />
            ) : (
              <div
                className="trailer-image d-flex justify-content-center align-items-center"
                style={trailerGradient}
              >
                <i
                  className="fa fa-play-circle-o"
                  style={{
                    fontSize: "50px",
                    color: "#FFF",
                    display: showButton,
                  }}
                ></i>
              </div>
            )}
            <div className="card-text">
              <p className="card-title">{movie.original_title}</p>
              <p>{date}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  export default Card;