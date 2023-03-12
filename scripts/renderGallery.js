import { createCardPhoto } from "./createCardPhoto.js";
import { createElement } from "./createElem.js";
import { scrollLoad } from "./scrollLoad.js";

export const renderGallery = (wrapper, data) => {
  const gallery = createElement("ul", {
    className: "grid",
  });

  const endElem = createElement("div");
  wrapper.append(gallery);

  const grid = new Masonry(gallery, {
    gutter: 10,
    itemSelector: ".card",
    columnWidth: 200,
    isFitWidth: true,
  });

  const cards = data.map((photo) => {
    return createCardPhoto(photo);
  });

  Promise.all(cards).then((cards) => {
    gallery.append(...cards);
    grid.appended(cards);
    wrapper.append(endElem);
    scrollLoad(gallery, grid, endElem);
  });
};
