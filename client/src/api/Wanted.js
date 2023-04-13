const API_KEY = "912f7205922c4c80c39dd025aaa17da4"

const wants = {
    getLatest: `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    gettops: `/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    gethorror: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=27`,
    getaction: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=28`,
    getcomedy: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=35`,
    getromance: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10749`,
    getdocumentaries: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=99`
}

export default wants;

//Type of api key is string
//Type of wants is object


