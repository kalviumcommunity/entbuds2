import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "../../api/Axios";
import wants from "../../api/Wanted";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";
import TopHomeList from "../Homelists/Movies/TopRatedHome";
import ActionHomeList from "../Homelists/Movies/ActionHome";
import ComedyHomeList from "../Homelists/Movies/ComedyHome";
import DocHomeList from "../Homelists/Movies/DocumentaryHome";
import HorrorHomeList from "../Homelists/Movies/HorrorHome";
import RomanceHomeList from "../Homelists/Movies/RomanceHome";
import SciFiHomeList from "../Homelists/Movies/SciFiHome";


const Home = () => {
  console.log(`${process.env.REACT_APP_API_KEY}`)
  const [latestmovie, setMovie] = useState([]);

  useEffect(() => {
    axios.get(wants.getLatest).then((response) => {
      setMovie(response.data.results);
    });
  }, []);

  console.log(latestmovie);

  return (
    <div>
      {latestmovie.length > 0 && (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 0,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          {latestmovie.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/movie/${movie.id}`}
              >
                <div className="container1">
                  <div className="partImage">
                    <img
                      alt="thumnsil"
                      className="partimage"
                      src={`https://image.tmdb.org/t/p/original${
                        movie && movie.backdrop_path
                      }`}
                    />
                  </div>
                  <div className="partimage-overlay">
                    <div className="partimage-title">
                      {movie ? movie.original_title : ""}
                    </div>
                    <div className="partimage-run">
                      {movie ? movie.release_date : ""}
                      <span className="partimage-rating">
                        {movie ? movie.vote_average : ""}
                      </span>
                    </div>
                    <div className="partimage-desc">
                      {movie ? movie.overview : ""}
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
          </div>
        </Swiper>
      )}
      <div className="allCategoriesContainer">
        <TopHomeList />
        <ActionHomeList />
        <ComedyHomeList />
        <DocHomeList />
        <HorrorHomeList />
        <RomanceHomeList /> 
        <SciFiHomeList />
      </div>
    </div>
  );
};

export default Home;
