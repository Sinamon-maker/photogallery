import { API_URL } from "./const.js";

export const getUserData = () => {
  return fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Bearer")}`,
    },
  }).then((res) => res.json());
};
