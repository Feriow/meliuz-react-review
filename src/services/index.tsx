import axios from "axios";

export const animes = axios.create({
  baseURL: "https://api.jikan.moe/v3/",
});
