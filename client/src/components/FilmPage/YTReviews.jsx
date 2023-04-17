import React , {useState, useEffect} from 'react'
import axios from 'axios';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './YTReviews.css';


const YTReviews = ({filmId, title}) => {
    const [YTrevs, setYTrevs] = useState([]);

useEffect(() => {
    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${title}moviereview&type=video&key=${process.env.REACT_APP_API_KEY2}`)
    .then(response => setYTrevs(response.data.items))
}, [title])


  return (
    <div >
        <h1 id='ythead'>Youtube Reviews</h1>

        <Carousel 
        showThumbs={false}
        autoPlay={false}
        transitionTime={2100}
        infiniteLoop={true}
        showStatus={false}>
        {YTrevs.map((vid) => (
          <div key={vid.id.videoId} className="revvid">
            <iframe
              src={`https://www.youtube.com/embed/${vid.id.videoId}`}
              className="ytvideo"
              title="review"
            ></iframe>
          </div>
        ))}
      </Carousel>
      
    </div>
  )
}

export default YTReviews;
