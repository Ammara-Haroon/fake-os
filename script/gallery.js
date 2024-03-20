const galleryIcon = document.getElementById("galleryIcon");

const createMenuButton = (txt, className) => {
  const menuBtn = document.createElement("p");
  menuBtn.classList.add(className);
  const txtNode = document.createTextNode(txt);
  menuBtn.appendChild(txtNode);
  return menuBtn;
};
const createMenuBar = () => {
  const menuBar = document.createElement("div");
  menuBar.classList.add("menu-bar");

  const minBtn = createMenuButton("-", "minimize-btn");
  menuBar.appendChild(minBtn);

  const szBtn = createMenuButton("\u25A1", "screen-size-btn");
  menuBar.appendChild(szBtn);

  const closeBtn = createMenuButton("x", "close-btn");
  menuBar.appendChild(closeBtn);

  closeBtn.addEventListener("click", () => {
    const modal = document.getElementById("galleryModal");
    document.querySelector("body").removeChild(modal);
  });

  return menuBar;
};

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
  const gallery = document.createElement("div");
  gallery.id = "photoGallery";
  gallery.classList.add("gallery");

  imgfNames.forEach((fname) => {
    const img = document.createElement("img");
    img.classList.add("gallery__item");
    img.src = fname;
    gallery.appendChild(img);
  });
  return gallery;
};

const createButton = (id, lbl) => {
  const btn = document.createElement("button");
  btn.id = id;
  const txtNode = document.createTextNode(lbl);
  btn.appendChild(txtNode);
  return btn;
};
const createNavigationArrows = () => {
  const fArr = createButton("galleryRArr", "-->");
  const bArr = createButton("galleryLArr", "<--");
  const arrGp = document.createElement("div");
  arrGp.classList.add("arrows-group");
  arrGp.appendChild(fArr);
  arrGp.appendChild(bArr);

  return arrGp;
};

let offset = 0;
const NUMBER_OF_DISPLAY_IMAGES = 1;

const createGalleryModal = () => {
  if (document.querySelector("#galleryModal")) {
    return;
  }

  offset = 0;
  const galleryModal = document.createElement("div");
  galleryModal.classList.add("modal");
  galleryModal.id = "galleryModal";
  const menuBar = createMenuBar();
  galleryModal.appendChild(menuBar);
  const heading = document.createElement("h1");
  heading.appendChild(document.createTextNode("Gallery"));
  galleryModal.appendChild(heading);
  const imgGallery = createImageGallery();
  galleryModal.appendChild(imgGallery);
  const navArrows = createNavigationArrows();
  galleryModal.appendChild(navArrows);

  document.getElementsByTagName("body")[0].appendChild(galleryModal);

  const gallery = document.getElementsByClassName("gallery__item");

  for (let i = 0; i < NUMBER_OF_DISPLAY_IMAGES; ++i) {
    gallery[i].classList.add("gallery__item--active");
  }

  const bkwdArr = document.getElementById("galleryLArr");
  const fwdArr = document.getElementById("galleryRArr");

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

    // for (let i = 0; i < gallery.length; ++i) {
    //   console.log(
    //     i,
    //     gallery[i].classList.contains("gallery__item--active")
    //       ? "active"
    //       : "not there"
    //   );
    // }
  });

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

    // for (let i = 0; i < gallery.length; ++i) {
    //   console.log(
    //     i,
    //     gallery[i].classList.contains("gallery__item--active")
    //       ? "active"
    //       : "not there"
    //   );
    // }
  });
};
galleryIcon.addEventListener("click", () => {
  createGalleryModal();
});

//
// const gallery = document.getElementsByClassName("gallery__item");
// for (let i = 0; i < NUMBER_OF_DISPLAY_IMAGES; ++i) {
//   gallery[i].classList.add("gallery__item--active");
// }
// bkwdArr.addEventListener("click", function () {
//   const gallery = document.getElementsByClassName("gallery__item");
//   let count = 0;
//   offset = offset - 1 < 0 ? gallery.length - 1 : offset - 1;
//   gallery[
//     (offset + NUMBER_OF_DISPLAY_IMAGES) % gallery.length
//   ].classList.remove("gallery__item--active");

//   while (count < NUMBER_OF_DISPLAY_IMAGES) {
//     gallery[(offset + count) % gallery.length].classList.add(
//       "gallery__item--active"
//     );
//     count++;
//   }
//   for (let i = 0; i < gallery.length; ++i) {
//     console.log(
//       i,
//       gallery[i].classList.contains("gallery__item--active")
//         ? "active"
//         : "not there"
//     );
//   }
// });

// fwdArr.addEventListener("click", function () {
//   const gallery = document.getElementsByClassName("gallery__item");
//   let count = 0;

//   gallery[offset].classList.remove("gallery__item--active");

//   offset = (offset + 1) % gallery.length;

//   while (count < NUMBER_OF_DISPLAY_IMAGES) {
//     gallery[(offset + count) % gallery.length].classList.add(
//       "gallery__item--active"
//     );
//     count++;
//   }
//   for (let i = 0; i < gallery.length; ++i) {
//     console.log(
//       i,
//       gallery[i].classList.contains("gallery__item--active")
//         ? "active"
//         : "not there"
//     );
//   }
// });
