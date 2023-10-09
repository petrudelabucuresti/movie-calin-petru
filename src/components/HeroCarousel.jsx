import React from "react";
import { Carousel } from "react-bootstrap";

function HeroCarousel({ iconicMovies }) {
    return (
      <Carousel controls={false} indicators={false}>
        {iconicMovies.map((item, i) => {
          return (
            <Carousel.Item key={i} style={{ height: "20em", opacity: ".8" }}>
              <img
                className="d-block w-100 img-fluid"
                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                alt="movie backdrop"
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }

  export default HeroCarousel;