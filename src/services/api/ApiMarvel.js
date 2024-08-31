import axios from "axios";
import CryptoJS from 'crypto-js';

const API_KEY = import.meta.env.VITE_SOME_KEY || "";
const PRIVATE_KEY = import.meta.env.VITE_SOME_PRIVATE_KEY || "";
const timestamp = new Date().getTime().toString();
const HASH = CryptoJS.MD5(timestamp + PRIVATE_KEY + API_KEY).toString();

export default axios.create({
  baseURL: "https://gateway.marvel.com/v1/public/",
  params: {
    ts: timestamp,
    apikey: API_KEY,
    hash: HASH,
  },
  headers: {
    "content-type": "application/json",
  },
});
