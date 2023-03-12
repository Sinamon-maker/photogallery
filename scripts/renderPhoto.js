import { createElement } from "./createElem.js";

export const renderPhoto = (wrapper, photo) => {
  const img = createElement("img", {
    className: "photo__picture",
    src: photo.urls.regular,
    alt: photo.description || photo.alt_description,
    style: "max-height: 80vh;",
  });

  const photoAuthor = createElement("a", {
    className: "photo__author",
    href: photo.user.links.html,
  });
  const avatarAuthor = createElement("img", {
    src: photo.user.profile_image.medium,
    alt: photo.user.bio,
    title: photo.user.username,
  });
  const userName = createElement("span", {
    textContent: photo.user.username,
  });

  const photoControl = createElement("div", {
    className: "photo__control",
  });

  const photoLike = createElement("button", {
    id: photo.id,
    className: "photo__like",
    textContent: photo.likes,
    likedByUser: photo.liked_by_user,
  });

  if (!photoLike.likedByUser) {
    photoLike.classList.add("photo__like_o");
  }

  const photoDownload = createElement("a", {
    className: "photo__download",
    download: "true",
    href: photo.links.download,
    target: "_blank",
  });

  photoAuthor.append(avatarAuthor, userName);

  photoControl.append(photoLike, photoDownload);

  wrapper.append(img, photoAuthor, photoControl);

  return photoLike;
};
