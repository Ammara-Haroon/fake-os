import { createMenuBar, createElementWithText } from "./DOM-utils.js";

const galleryIcon = document.getElementById("galleryIcon");

//creates an image gallery
const createImageGallery = () => {
  // const fs = require("fs");
  // const directoryPath = "../assets/photos/";
  // const files = fs.readdirSync(directoryPath);
  // console.log(files);

  const imgfNames = [
    "../assets/photos/pexels-ave-calvar-martinez-7878167.jpg",
    "../assets/photos/pexels-catalina-carvajal-herrera-9677898.jpg",
    "../assets/photos/pexels-joseba-garcia-moya-18133772.jpg",
    "../assets/photos/pexels-tamara-velazquez-5199145.jpg",
    "../assets/photos/pexels-thuong-d-14262264.jpg",
  ];
  const gallery = createElementWithText("div", null, "gallery", "photoGallery");
  imgfNames.forEach((fname) => {
    const img = createElementWithText("img", null, "gallery__item");
    img.src = fname;
    gallery.appendChild(img);
  });
  return gallery;
};

//creates the navigation arrows
const createNavigationArrows = () => {
  const fArr = createElementWithText("button", "←", "click-btn", "galleryRArr");
  const bArr = createElementWithText("button", "→", "click-btn", "galleryLArr");

  const arrGp = createElementWithText("div", null, "arrows-group");
  arrGp.appendChild(fArr);
  arrGp.appendChild(bArr);

  return arrGp;
};

let offset = 0;
const NUMBER_OF_DISPLAY_IMAGES = 1;

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
  //adds a menu bar
  const menuBar = createMenuBar("galleryModal", "Photo Gallery");
  galleryModal.appendChild(menuBar);
  //adds a gallery
  const imgGallery = createImageGallery();
  galleryModal.appendChild(imgGallery);
  //add navigation arrows
  const navArrows = createNavigationArrows();
  galleryModal.appendChild(navArrows);

  //add it to the desktop screen
  document.getElementsByTagName("body")[0].appendChild(galleryModal);

  //make a few images visible at a time
  const gallery = document.getElementsByClassName("gallery__item");
  for (let i = 0; i < NUMBER_OF_DISPLAY_IMAGES; ++i) {
    gallery[i].classList.add("gallery__item--active");
  }

  const bkwdArr = document.getElementById("galleryLArr");
  const fwdArr = document.getElementById("galleryRArr");

  //backward arrow displays the previous photo
  bkwdArr.addEventListener("click", function () {
    const gallery = document.getElementsByClassName("gallery__item");
    let count = 0;
    offset = offset - 1 < 0 ? gallery.length - 1 : offset - 1;
    gallery[
      (offset + NUMBER_OF_DISPLAY_IMAGES) % gallery.length
    ].classList.remove("gallery__item--active");

    while (count < NUMBER_OF_DISPLAY_IMAGES) {
      gallery[(offset + count) % gallery.length].classList.add(
        "gallery__item--active"
      );
      count++;
    }
  });

  //forward arrow display the next photo by changing active class property of images
  fwdArr.addEventListener("click", function () {
    const gallery = document.getElementsByClassName("gallery__item");
    let count = 0;

    gallery[offset].classList.remove("gallery__item--active");

    offset = (offset + 1) % gallery.length;

    while (count < NUMBER_OF_DISPLAY_IMAGES) {
      gallery[(offset + count) % gallery.length].classList.add(
        "gallery__item--active"
      );
      count++;
    }
  });
};

//open up a gallery when desktop icon is clicked
galleryIcon.addEventListener("dblclick", () => {
  createGalleryModal();
});
