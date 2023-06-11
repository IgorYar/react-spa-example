import axios from "axios";

const REACT_APP_URL= "https://jsonplaceholder.typicode.com"

const axiosApi = axios.create({
    baseURL: REACT_APP_URL,
});

axios.interceptors.request.use(function (config) {
    return config;
});

axiosApi.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
);

export async function get(url, config) {
    return await axiosApi
        .get(url, {
            ...config,
        })
        .then(response => response.data);
}