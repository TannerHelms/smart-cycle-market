import axios from "axios";

const baseUrl = 'http://10.0.2.2:3000';

const client = axios.create({
    baseURL: baseUrl,
})

export default client