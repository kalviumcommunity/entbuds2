const wants = {
    getLatest: `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    gettops: `/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    gethorror: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=27`,
    getaction: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=28`,
    getcomedy: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=35`,
    getromance: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10749`,
    getscifi: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=878`,
    getdocumentaries: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=99`,
    getsearch: `/search/movie?api_key=${process.env.REACT_APP_API_KEY}`,
    getdetails: `/movie/`,
    gettvdetails: `/tv/`,
    getpopulartv: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc`,
    getdramatv: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=18`,
    getcomedytv: `discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=35`,
    getcrimetv: `discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=80`,
    getdocumtv: `discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=99`,
    getromantictv: `discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10749`,
    getmysterytv: `discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=9648`,
    getanimtv: `discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=16`,
}

export default wants;

//Type of api key is string
//Type of wants is object


