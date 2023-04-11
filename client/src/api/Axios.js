import axios from "axios";

const use = axios.create({
    baseURL: "https://api.themoviedb.org/3"
});

export default use;