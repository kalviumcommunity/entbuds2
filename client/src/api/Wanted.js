const wants = {
    getLatest: `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    gettops: `/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    gethorror: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=27`,
    getaction: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=28`,
    getcomedy: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=35`,
    getromance: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10749`,
    getdocumentaries: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=99`,
    getsearch: `/search/movie?api_key=${process.env.REACT_APP_API_KEY}`,
    getdetails: `/movie/`,
    gettvdetails: `/tv/`,
    getpopulartv: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc`
}

export default wants;

//Type of api key is string
//Type of wants is object


