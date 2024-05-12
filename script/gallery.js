import {
  createMenuBar,
  createElementWithText,
  makeModalWindowActive,
} from "./DOM-utils.js";

const galleryIcon = document.getElementById("galleryIcon");

//creates an image gallery
const createImageGallery = (isThumbNail) => {
  // const fs = require("fs");
  // const directoryPath = "./assets/photos/";
  // const files = fs.readdirSync(directoryPath);
  // console.log(files);

  const imgfNames = [
    "./assets/photos/pexels-ave-calvar-martinez-7878167.jpg",
    "./assets/photos/pexels-catalina-carvajal-herrera-9677898.jpg",
    "./assets/photos/pexels-joseba-garcia-moya-18133772.jpg",
    "./assets/photos/pexels-tamara-velazquez-5199145.jpg",
    "./assets/photos/pexels-thuong-d-14262264.jpg",
  ];
  const gallery = isThumbNail
    ? createElementWithText("div", null, "gallery", "previewGallery")
    : createElementWithText("div", null, "gallery", "photoGallery");
  imgfNames.forEach((fname, index) => {
    let img;
    if (isThumbNail) {
      img = createElementWithText("img", null, "thumbnail");
      img.addEventListener("click", () => {
        const gallery = document.getElementsByClassName("gallery__item");
        gallery[offset].classList.remove("gallery__item--active");
        offset = index;
        gallery[offset].classList.add("gallery__item--active");
      });
    } else {
      img = createElementWithText("img", null, "gallery__item");
    }
    img.src = fname;
    gallery.appendChild(img);
  });
  if (!isThumbNail) {
    gallery.firstChild.classList.add("gallery__item--active");
  }
  return gallery;
};

//creates the navigation arrows
const createNavigationArrows = () => {
  const bArr = createElementWithText("button", "←", "btn", "galleryLArr");
  const fArr = createElementWithText("button", "→", "btn", "galleryRArr");
  const arrGp = createElementWithText("div", null, "arrows-group");
  arrGp.appendChild(bArr);
  arrGp.appendChild(fArr);
  //backward arrow displays the previous photo
  bArr.addEventListener("click", goBackwards);
  //forward arrow display the next photo by changing active class property of images
  fArr.addEventListener("click", goForwards);
  return arrGp;
};

let offset = 0;
const goForwards = () => {
  const gallery = document.getElementsByClassName("gallery__item");
  gallery[offset].classList.remove("gallery__item--active");
  offset = (offset + 1) % gallery.length;
  gallery[offset].classList.add("gallery__item--active");
};
const goBackwards = () => {
  const gallery = document.getElementsByClassName("gallery__item");
  gallery[offset].classList.remove("gallery__item--active");
  offset = offset - 1 < 0 ? gallery.length - 1 : offset - 1;
  gallery[offset % gallery.length].classList.add("gallery__item--active");
};
//creates the gallery modal
const createGalleryModal = () => {
  if (document.querySelector("#galleryModal")) {
    return;
  }

  offset = 0;
  const galleryModal = createElementWithText(
    "div",
    null,
    "modal",
    "galleryModal"
  );
  galleryModal.classList.add("modal--gallery");
  //adds a menu bar
  const menuBar = createMenuBar("galleryModal", "Photo Gallery");
  galleryModal.appendChild(menuBar);
  //adds a gallery

  const imgGallery = createImageGallery();
  galleryModal.appendChild(imgGallery);
  //add navigation arrows
  const navArrows = createNavigationArrows();
  galleryModal.appendChild(navArrows);

  const thumbNails = createImageGallery(true);
  //console.dir(thumbNails);
  galleryModal.appendChild(thumbNails);

  //add it to the desktop screen
  document.getElementsByTagName("body")[0].appendChild(galleryModal);
  makeModalWindowActive(galleryModal);

  galleryModal.addEventListener("click", () => {
    makeModalWindowActive(galleryModal);
  });
  //galleryModal.classList.add("modal--maximized");
 

};

//open up a gallery when desktop icon is clicked
galleryIcon.addEventListener("dblclick", () => {
  createGalleryModal();
});

document.querySelector("#galleryLink").addEventListener("click", () => {
  createGalleryModal();
});
