import { createCardPhoto } from "./createCardPhoto.js";
import { getData } from "./getData.js";

export const scrollLoad = (gallery, grid, endElem) => {
  let i = 1;
  const observer = new IntersectionObserver(
    async (entries) => {
      if (entries[0].isIntersecting) {
        const photos = await getData({ page: ++i, count: 30 });
        const cards = photos.map(createCardPhoto);
        Promise.all(cards).then((cards) => {
          gallery.append(...cards);
          grid.appended(cards);
        });
      }
    },
    {
      rootMargin: "150px",
    }
  );
  observer.observe(endElem);
};
