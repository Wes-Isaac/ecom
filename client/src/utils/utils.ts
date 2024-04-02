import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: " http://localhost:8080/",
});

// change tag string to an array

export const toArray = (tags: string) => {
  return tags.trim().split(",");
};
