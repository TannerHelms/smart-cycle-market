import axios from "axios";

export const baseUrl = 'https://smary-cycle-market-server.fly.dev';
// export const baseUrl = 'http://10.0.2.2:3000';

const client = axios.create({
    baseURL: baseUrl,
})

export default client