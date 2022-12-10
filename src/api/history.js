import axios from "axios";
const token = "abc";
const instance = axios.create({
  baseURL: "https://api-booking-baber.up.railway.app/api/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
const listHistories = () => {
  const api = "history";
  return instance.get(api);
};
const detailHistory = (id) => {
  const api = `comments/${id}`;
  return instance.get(api);
};
const addHistory = (id, data) => {
  const api = `comments/${id}`;
  return instance.post(api, data);
};

export { listHistories, detailHistory, addHistory };
