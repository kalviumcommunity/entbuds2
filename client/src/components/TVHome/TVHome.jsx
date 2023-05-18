import React, { useState, useEffect } from 'react';
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
import DramaTVHome from '../Homelists/TVShows/DramaTVHome';
import ComedyTVHome from '../Homelists/TVShows/ComedyTVHome';
import CrimeTVHome from '../Homelists/TVShows/CrimeTVHome';
import DocumentaryTVHome from '../Homelists/TVShows/DocumTVHome';
import RomanticTVHome from '../Homelists/TVShows/RomanceTVHome';

const TVHome = () => {
    const [popularTV, setTV] = useState([]);

    useEffect(() => {
        axios.get(wants.getpopulartv).then((response) => {
            setTV(response.data.results);
        })
    }, [])

    console.log(popularTV);

    return (
        <div>
            {popularTV.length > 0 && (
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
                    {popularTV.map((serie) => (
                        <SwiperSlide key={serie.id}>
                            <Link
                                style={{ textDecoration: "none", color: "white" }}
                                to={`/series/${serie.id}`}
                            >
                                <div className="container1">
                                    <div className="partImage">
                                        <img
                                            alt="thumnsil"
                                            className="partimage"
                                            src={`https://image.tmdb.org/t/p/original${serie && serie.backdrop_path
                                                }`}
                                        />
                                    </div>
                                    <div className="partimage-overlay">
                                        <div className="partimage-title">
                                            {serie ? serie.name : ""}
                                        </div>
                                        <div className="partimage-run">
                                            {serie ? serie.release_date : ""}
                                            <span className="partimage-rating">
                                                {serie ? serie.vote_average : ""}
                                            </span>
                                        </div>
                                        <div className="partimage-desc">
                                            {serie ? serie.overview : ""}
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
            <div className='alltvcontainer'>
                <DramaTVHome />
                <ComedyTVHome />
                <CrimeTVHome />
                <DocumentaryTVHome />
                <RomanticTVHome />
            </div>

        </div>
    )
}

export default TVHome
