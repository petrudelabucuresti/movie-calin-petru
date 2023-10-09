import React, { useState, useEffect, useRef } from "react";
import { Carousel, Button, Container, Row } from "react-bootstrap";
import Card from "./Card";

function TrendingCarousel({ orientation, movieList }) {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const url = `https://api.themoviedb.org/3/movie/${movieList}?language=en-US&page=1&api_key=79b6766f2960d692019a0072eacfd852&append_to_response=videos`;
  
    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setTrendingMovies(data.results);
        });
    }, [trendingMovies, url]);
  
    const num = orientation === "poster_path" ? 4 : 3;
  
    const reduceMovies = (acc, cur, index) => {
      const groupIndex = Math.floor(index / num);
      if (!acc[groupIndex]) acc[groupIndex] = [];
      acc[groupIndex].push(cur);
      return acc;
    };
  
    const [bg, setBg] = useState();
  
    const updateBg = (bg) => {
      setBg(bg);
    };
  
    const customBg = {
      backgroundImage:
        orientation === "backdrop_path" &&
        bg &&
        `linear-gradient(rgba(70,70,70,.6), rgba(70,70,70,.6)), url(https://image.tmdb.org/t/p/original${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: orientation === "backdrop_path" && "10px",
      paddingTop: orientation === "backdrop_path" && "5em",
    };
  
    const ref = useRef(null);
  
    const onPrevClick = () => {
      ref.current.prev();
    };
    const onNextClick = () => {
      ref.current.next();
    };
  
    return (
      <div style={customBg} className="trailers-container position-relative">
        <Container
          className="position-absolute"
          style={{ zIndex: "1000", top: "50%" }}
        >
          <Row className="position-relative">
            <Button
              variant="primary"
              onClick={onPrevClick}
              style={{ position: "absolute", left: "0", borderRadius: "100px" }}
            >
              <p style={{ fontWeight: "900", margin: ".5em" }}>{"<"}</p>
            </Button>
            <Button
              variant="primary"
              onClick={onNextClick}
              style={{
                position: "absolute",
                right: "0",
                fontWeight: "900",
                borderRadius: "100px",
              }}
            >
              <p style={{ fontWeight: "900", margin: ".5em" }}>{">"}</p>
            </Button>
          </Row>
        </Container>
        <Carousel indicators={false} controls={false} className="p-5" ref={ref}>
          {trendingMovies.reduce(reduceMovies, []).map((item, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                {item.map((item, index) => {
                  return (
                    <Card
                      movie={item}
                      orientation={orientation}
                      updateBg={updateBg}
                    />
                  );
                })}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  } 

  export default TrendingCarousel;