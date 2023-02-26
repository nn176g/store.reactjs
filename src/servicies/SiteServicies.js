import axios from "axios";

const API = "https://localhost:7024/api"
// Create instance called instance
const instance = axios.create({
    baseURL: API,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});


export default {
    getIndex: () =>
    instance({
        'method':'GET',
        'url':'/Cinema/index',
    }),
    GetCinemaByHours: (starTime, endTime) =>
    instance({
        'method':'GET',
        'url':'/Cinema/GetCinemaByHours',
        'params': {
            'starTime': starTime,
            'endTime': endTime
        }
    })
}