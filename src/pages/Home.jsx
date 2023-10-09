import React, { useState, useEffect, useRef } from "react";
//import { Carousel, Button, Container, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
import Loading from "../components/Loading";
// import { BounceLoader } from "react-spinners";
// import Card from "../components/Card";
import TrendingCarousel from "../components/TrendingCarousel";
import HeroCarousel from "../components/HeroCarousel";
import RandomMovie from "../components/RandomMovie";






export default function Home() {
  const [iconicMovies, setIconicMovies] = useState([]);
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&sort_by=vote_average.desc&api_key=79b6766f2960d692019a0072eacfd852";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setIconicMovies(data.results);
    });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <HeroCarousel iconicMovies={iconicMovies} />
            <div className="home-hero m-5">
              <h1>Welcome.</h1>
              <p className="lead">
                Millions of movies to discover. Explore now.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="container">
              <p className="mt-5 h2">Trending</p>
              <div class="hr"></div>
              <TrendingCarousel
                orientation={"poster_path"}
                movieList={"popular"}
              />
            </div>
          </div>
          <div className="row mt-5">
            <div className="container">
              <p className="mt-5 h2">Trailers on theater</p>
              <div class="hr"></div>
              <TrendingCarousel
                orientation={"backdrop_path"}
                movieList={"now_playing"}
              />
            </div>
          </div>
          <div className="row">
            <div className="container">
              <p className="mt-5 h2">Upcoming</p>
              <div class="hr"></div>
              <TrendingCarousel
                orientation={"poster_path"}
                movieList={"upcoming"}
              />
            </div>
          </div>
          <div className="container">
            <div class="hr"></div>
            <RandomMovie />
          </div>
        </div>
      )}
    </>
  );
}
