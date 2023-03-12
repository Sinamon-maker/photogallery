import { getData } from "./getData.js";
import { renderGallery } from "./renderGallery.js";
import { renderPhoto } from "./renderPhoto.js";
import { authorization } from "./authorization.js";
import { handlerLike } from "./handleLike.js";

const init = async ({
  selectorGalleryWrapper,
  selectorPhotoWrapper,
  selectorAuthBtn,
}) => {
  const galleryWrapper = document.querySelector(selectorGalleryWrapper);
  const photoWrapper = document.querySelector(selectorPhotoWrapper);
  const authBtn = document.querySelector(selectorAuthBtn);
  authorization(authBtn);
  if (galleryWrapper) {
    const data = await getData({ count: 30 });
    renderGallery(galleryWrapper, data);
  }
  if (photoWrapper) {
    const url = new URL(location.href);
    const idPhoto = url.searchParams.get("photo");

    if (idPhoto) {
      const photo = await getData({ idPhoto });

      const photoLike = renderPhoto(photoWrapper, photo);
      photoLike.addEventListener("click", () => {
        if (localStorage.getItem("Bearer")) {
          handlerLike(photoLike);
        }
      });
    }
  }
};
init({
  selectorGalleryWrapper: ".gallery__wrapper",
  selectorPhotoWrapper: ".photo__wrapper",
  selectorAuthBtn: ".header__login-button",
});
