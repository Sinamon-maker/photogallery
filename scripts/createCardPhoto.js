import { createElement } from "./createElem.js";

const loadImage = (url, descr) => {
  return new Promise((resolve, reject) => {
    const photo = new Image();
    photo.width = "200";
    photo.src = url;
    photo.alt = descr;
    photo.addEventListener("load", () => {
      resolve(photo);
    });
    photo.addEventListener("error", (err) => {
      reject(new Error(err));
    });
  });
};

export const createCardPhoto = async (data) => {
  const card = createElement("li", {
    className: "card",
  });

  const cardItem = createElement("a", {
    id: data.id,
    className: "grid-item",
    href: `page.html?photo=${data.id}`,
  });

  const photo = await loadImage(data.urls.small, data.alt?.description);

  const author = createElement("a", {
    className: "card__author",
    href: data.user.links.html,
  });

  const avatarAuthor = new Image();
  avatarAuthor.className = "author__name";
  avatarAuthor.src = data.user.profile_image.medium;
  avatarAuthor.width = "32";
  avatarAuthor.height = "32";
  avatarAuthor.alt = data.user.bio;
  avatarAuthor.title = data.user.username;

  author.append(avatarAuthor);

  const likeBtn = createElement("button", {
    className: "card__photo-like",
    textContent: data.likes,
  });

  const downloadLink = createElement("a", {
    className: "card__download",
    href: data.links.download,
    download: true,
    target: "_blank",
  });

  cardItem.append(photo, author, likeBtn, downloadLink);
  card.append(cardItem);

  return card;
};
