import * as axios from "axios";

export const getGifs = (query, offset = 0) => {
    return axios(`http://api.giphy.com/v1/gifs/search?api_key=Bu1pJ0qJA24PX7CAY8tbcuyarrvzURYl&q=${query}&offset=${offset}`);
};

export const getTrendingGifs = (offset = 0) => {
    return axios(`http://api.giphy.com/v1/gifs/trending?api_key=Bu1pJ0qJA24PX7CAY8tbcuyarrvzURYl&offset=${offset}`);
};

export const getStickers = (query, offset = 0) => {
    return axios(`http://api.giphy.com/v1/stickers/search?api_key=Bu1pJ0qJA24PX7CAY8tbcuyarrvzURYl&q=${query}&offset=${offset}`);
};