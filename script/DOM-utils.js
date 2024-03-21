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
  const menuBar = document.createElement("div");
  menuBar.classList.add("menu-bar");

  const title = createElementWithText("p", appName, "title");
  menuBar.appendChild(title);

  const container = document.createElement("div");
  const minBtn = createElementWithText("p", "-", "minimize-btn");
  container.appendChild(minBtn);

  const szBtn = createElementWithText("p", "\u25A1", "screen-size-btn");
  container.appendChild(szBtn);

  const closeBtn = createElementWithText("p", "x", "close-btn");
  container.appendChild(closeBtn);
  menuBar.appendChild(container);

  //adding event listener to close button
  closeBtn.addEventListener("click", () => {
    const modal = document.getElementById(modalName);
    document.querySelector("body").removeChild(modal);
  });

  return menuBar;
};
