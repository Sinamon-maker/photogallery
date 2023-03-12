import { API_URL_PHOTOS } from "./const.js";

export const handlerLike = (btn) => {
  const url = new URL(`${API_URL_PHOTOS}/${btn.id}/like`);
  const toggleLike = (data) => {
    if (data.photo.liked_by_user) {
      btn.classList.remove("photo__like_o");
    } else {
      btn.classList.add("photo__like_o");
    }
    btn.likedByUser = data.photo.liked_by_user;
    btn.textContent = data.photo.likes;
  };

  fetch(url, {
    method: btn.likedByUser ? "DELETE" : "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Bearer")}`,
    },
  })
    .then((res) => res.json())
    .then(toggleLike);
};
