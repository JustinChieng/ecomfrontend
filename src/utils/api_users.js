import axios from "axios";

const API_URL = "http://localhost:5000";

export const getUsers = async () => {};

export const getUser = async (id) => {
  const res = await axios.get(`${API_URL}/users/${id}`);
  return res.data;
};

export const addUser = async (data) => {
  const response = await axios.post(
    `${API_URL}/users/signup`, // url of the POST API
    JSON.stringify(data), // data you want to pass through the API in JSON format
    {
      headers: {
        "Content-Type": "application/json", // telling the API you are sending JSON data
      },
    }
  );
  return response.data;
};

export const loginUser = async (data) => {
    const response = await axios.post(
        `${API_URL}/users/login`, // url of the POST API
        JSON.stringify(data), // data you want to pass through the API in JSON format
        {
          headers: {
            "Content-Type": "application/json", // telling the API you are sending JSON data
          },
        }
      );
      return response.data;
}
