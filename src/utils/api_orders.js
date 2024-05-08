import axios from "axios";

const url = "http://localhost:5000";

export const getOrders = async () => {
    try {
        const response = await axios.get(url + "/orders");
        return response.data
    } catch (error) {
        console.log(error)
    }
};

export const addNewOrder = async (data) => {
  const response = await axios.post(
    `${url}/orders`, // url of the POST API
    JSON.stringify(data), // data you want to pass through the API in JSON format
    {
      headers: {
        "Content-Type": "application/json", // telling the API you are sending JSON data
      },
    }
  );
  return response.data;
};

export const updateOrder = async (data) => {
    const response = await axios.put(
        `${url}/orders/${data.id}`, // url of the PUT API
        JSON.stringify(data), // data you want to pass through the API in JSON format
        {
          headers: {
            "Content-Type": "application/json", // telling the API you are sending JSON data
          },
        }
      );
      return response.data;
};

export const deleteOrder = async (_id) => {
    const res = await axios.delete(`${url}/orders/${_id}`);
  return res.data;
};
