import React, { useState} from "react";
import { BounceLoader } from "react-spinners";
function RandomMovie() {
    const [loading, setLoading] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [randomMovie, setRandomMovie] = useState({});
  
    const handleClick = () => {
      setLoading(true);
      fetch(
        "https://api.themoviedb.org/3/movie/latest?api_key=79b6766f2960d692019a0072eacfd852"
      )
        .then((response) => response.json())
        .then((data) => {
          const randNum = Math.floor(Math.random() * data.id);
          fetch(
            `https://api.themoviedb.org/3/movie/${randNum}?language=en-US&api_key=79b6766f2960d692019a0072eacfd852&include_adult=false`
          )
            .then((response) => response.json())
            .then((data) => {
              setRandomMovie(data);
              setClicked(true);
              setLoading(false);
            });
        });
    };
   // || randomMovie.adult === true
    if (randomMovie.success === false ) {
      return (
        <div className="container">
          <button
            className="btn mt-5"
            style={{ border: "3px solid #74d6da" }}
            onClick={handleClick}
          >
            Surprise me
          </button>
          <div
            className="my-5"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1533654918788-bb60458d80aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80)`,
              backgroundPosition: "0 30%",
              backgroundSize: "cover",
              height: "10em",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1 style={{ color: "#FF0A01", fontSize: "5em" }}>TRY AGAIN</h1>
          </div>
        </div>
      );
    }
  
    let genres = [];
    if (randomMovie.genres && randomMovie.genres.length > 0) {
      genres = randomMovie.genres.map((item) => {
        return item.name + " ";
      });
    } else {
      genres.push("unknown");
    }
  
    const backdropUrl = randomMovie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
      : "";
  
    return (
      <div className="container">
        <button
          className="btn mt-5"
          style={{ border: "3px solid #74d6da" }}
          onClick={handleClick}
        >
          Surprise me
        </button>
        {loading ? (
          <div
            className="container d-flex justify-content-center align-items-center"
            style={{ height: "10em" }}
          >
            <BounceLoader color={"#fff"} size={50} />
          </div>
        ) : (
          <div>
            {!clicked ? (
              <div
                className="my-5"
                style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1533654918788-bb60458d80aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80)`,
                  backgroundPosition: "0 30%",
                  backgroundSize: "cover",
                  height: "10em",
                  borderRadius: "15px",
                }}
              ></div>
            ) : (
              <div className="movieDetailsPage container">
                <div className="row p-2">
                  <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <img
                      src={
                        randomMovie.poster_path
                          ? `https://image.tmdb.org/t/p/original${randomMovie.poster_path}`
                          : "https://media.istockphoto.com/id/1023946126/vector/big-movie-reel-open-clapper-board-popcorn-box-package-ticket-admit-one-three-star-cinema.jpg?s=612x612&w=0&k=20&c=_f9dhpn1WUxbLsxXWuJb0jhmn4dBS2yAEa2TVIkn70E="
                      }
                      className="img-fluid rounded shadow"
                      alt="..."
                    />
                  </div>
                  <div
                    className="col-md-9 my-5 p-4"
                    style={{
                      backgroundImage: `linear-gradient(rgba(70,70,70,.6), rgba(70,70,70,.6)), url(${backdropUrl})`,
                      backgroundPosition: "center center",
                      backgroundSize: "cover",
                      borderRadius: "15px",
                    }}
                  >
                    <h2 className="mb-4">{randomMovie.original_title}</h2>
                    <p className="lead">
                      <span className="h3">Genres: </span>
                      {genres}
                    </p>
                    <p className="lead">
                      <span className="h3">Release date: </span>
                      {randomMovie.release_date
                        ? randomMovie.release_date
                        : "unknown"}
                    </p>
                    <p className="lead">
                      <span className="h3">Rating: </span>{" "}
                      {randomMovie.vote_average &&
                        randomMovie.vote_average.toFixed(1)}{" "}
                      ({randomMovie.vote_count} votes)
                    </p>
                    <p className="lead">{randomMovie.overview}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  export default RandomMovie;