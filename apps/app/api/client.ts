import axios from "axios";

// export const baseUrl = 'https://smary-cycle-market-server.fly.dev';
export const baseUrl = 'http://localhost:3000';

const client = axios.create({
    baseURL: baseUrl,
})

export default client