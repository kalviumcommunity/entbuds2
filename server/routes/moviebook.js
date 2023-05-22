const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();


router.get('/movies/:city', async (req, res) => {
    const { city } = req.params;
    try {
      // Make an HTTP GET request to the BookMyShow URL for the selected city
      const response = await axios.get(`https://paytm.com/movies/${city}`);
      const html = response.data;
      
      // Use cheerio to parse the HTML
      const $ = cheerio.load(html);
      
      // Extract movie details from the parsed HTML
      const movies = [];
      const images = [];

      $('div.RunningMovies_runningMovies__z9eib > span.RunningMovies_moviesList__vSQOU > div.ViewMore_runningMoviesCon__NluIk > div.DesktopRunningMovie_movieCard__SDJqf > div.DesktopRunningMovie_runningMovie__RuRZy > div.DesktopRunningMovie_imgCon__AHQUt > div.lazyload-wrapper img').each((index, element) => {
        const image = $(element).attr('src');
        images.push({
          image: image
        })
      })


      $('a').each((index, element) => {
        const bookingUrl = $(element).attr('href');
        if(bookingUrl.includes('-movie-detail-')){
        movies.push({
          bookingUrl:  `https://paytm.com${bookingUrl}`
        });
      }
      });
      
      // Send the movie details as the API response
      res.json({ movies, images });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred while fetching movie listings.' });
    }
  });
  

  module.exports = router;
