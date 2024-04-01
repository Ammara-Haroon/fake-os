//making onewindow active at a time
export const makeModalWindowActive = (modal) => {
  const allOpenModals = document.querySelectorAll(".modal");
  allOpenModals.forEach((mod) => {
    mod.style.zIndex = "0";
  });
  modal.style.zIndex = "2";
};
//a generic function to create an element with a text, class and id if respective arguments are provided
export const createElementWithText = (
  tag,
  txt = null,
  cl = null,
  id = null
) => {
  const el = document.createElement(tag);
  if (txt) el.append(txt);
  if (cl) el.classList.add(cl);
  if (id) el.setAttribute("id", id);

  return el;
};

//creates menu bar with a title and three buttons
export const createMenuBar = (modalName, appName) => {
  const menuBar = createElementWithText("div", null, "menu-bar");

  const title = createElementWithText("p", appName, "title");
  menuBar.appendChild(title);

  const container = document.createElement("div");
  const minBtn = createElementWithText("p", "-", "btn");
  container.appendChild(minBtn);

  const szBtn = createElementWithText("p", "\u25A1", "btn");
  container.appendChild(szBtn);

  const closeBtn = createElementWithText("p", "x", "btn");
  container.appendChild(closeBtn);
  menuBar.appendChild(container);

  //adding event listener to resize button
  szBtn.addEventListener("click", () => {
    const modal = document.getElementById(modalName);
    modal.classList.toggle("modal--maximized");
    modal.style.top = "0";
    modal.style.left = "0";
    if (modalName === "gameModal") {
      const overlay = document.querySelector(".overlay");
      if (overlay) {
        document.querySelector(".btn-container").replaceChild(overlay);
      }
    }
  });

  //adding event listener to close button
  closeBtn.addEventListener("click", () => {
    const modal = document.getElementById(modalName);
    document.querySelector("body").removeChild(modal);
  });

  minBtn.addEventListener("click", () => {
    const modal = document.getElementById(modalName);
    modal.style.display = "none";
    const tray = document.querySelector("#iconTray");
    const tab = createElementWithText("p", appName, "btn");
    tray.appendChild(tab);
    tab.addEventListener("click", () => {
      modal.style.display = "block";
      tray.removeChild(tab);
    });
  });
  /////////////////////////////
  //on dragging change modals position
  const onDrag = ({ movementX, movementY }) => {
    const modal = document.getElementById(modalName);
    let getStyle = window.getComputedStyle(modal);
    let leftValue = parseInt(getStyle.left);
    let topValue = parseInt(getStyle.top);
    let rightValue = parseInt(getStyle.right);
    let bottomValue = parseInt(getStyle.bottom);
    menuBar.style.backgroundColor = "rgb(0, 11, 124)";

    modal.style.left =
      leftValue + movementX < 0 || rightValue - movementX < 10
        ? `${leftValue}px`
        : `${leftValue + movementX}px`;
    modal.style.top =
      topValue + movementY < 0 || bottomValue - movementY < 10
        ? `${topValue}px`
        : `${topValue + movementY}px`;
  };

  //stop dragging the window .clean up
  const stopDrag = () => {
    //console.log("stop drag");
    menuBar.style.cursor = "default";
    menuBar.style.backgroundColor = "blue";
    menuBar.removeEventListener("mousemove", onDrag);
    //document.getElementById(modalName).zIndex = "0";
  };

  //drag a modal with menu bar
  menuBar.addEventListener("mousedown", () => {
    //console.log("mouse down");
    menuBar.style.cursor = "pointer";
    menuBar.style.backgroundColor = "blue";
    //console.dir(menubar);
    makeModalWindowActive(document.getElementById(modalName));
    menuBar.addEventListener("mousemove", onDrag);
    menuBar.addEventListener("mouseout", stopDrag);
    menuBar.addEventListener("mouseup", stopDrag);
  });

  return menuBar;
};
