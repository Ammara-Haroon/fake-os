import {
  createMenuBar,
  createElementWithText,
  makeModalWindowActive,
} from "./DOM-utils.js";

const forexIcon = document.getElementById("forexIcon");

//makes a call to api to get exchange rates
async function getDataFromAPI() {
  let response = await fetch(
    "https://v6.exchangerate-api.com/v6/3e9aab49ec3c157eae6c2563/latest/AUD"
  );
  let data = await response.json();
  let rates = data.conversion_rates;
  return rates;
}

//gets all the currency types
const getCurrencyTypesOptions = () => {
  getDataFromAPI().then((data) => {
    return Object.keys(data);
  });
};

//makes a selection drop down based on the available currency types
const createCurrencySelector = () => {
  const select = document.createElement("select");
  getDataFromAPI().then((data) => {
    const currencyList = Object.keys(data);
    currencyList.forEach((curr) => {
      const option = document.createElement("option");
      option.setAttribute("value", curr);
      option.append(curr);
      select.appendChild(option);
    });
  });

  return select;
};

const createForm = () => {
  const form = createElementWithText(
    "form",
    null,
    null,
    "currencyConverterForm"
  );
  form.setAttribute("type", "submit");
  const inputLbl = createElementWithText("label", "from:");
  inputLbl.setAttribute("for", "inputAmount");
  form.appendChild(inputLbl);
  const divFrom = document.createElement("div");
  const input = createElementWithText(
    "input",
    "1.00",
    "form-text",
    "inputAmount"
  );
  input.setAttribute("type", "number");
  input.setAttribute("value", "1.00");
  input.required = true;
  const selectFrom = createCurrencySelector();
  divFrom.appendChild(input);
  divFrom.appendChild(selectFrom);
  form.appendChild(divFrom);
  const outputLbl = createElementWithText("label", "to:");
  outputLbl.setAttribute("for", "outputAmount");
  form.appendChild(outputLbl);
  const divTo = document.createElement("div");
  const output = createElementWithText(
    "input",
    "1.00",
    "form-text",
    "outputAmount"
  );
  output.classList.add("output");
  output.setAttribute("value", "1.00");
  output.disabled = true;
  divTo.appendChild(output);
  const selectTo = createCurrencySelector();
  divTo.appendChild(selectTo);
  form.appendChild(divTo);

  //creates button to get conversion
  const btn = createElementWithText("button", "Convert", "click-btn");
  form.appendChild(btn);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const result = convertRates(
      Number(input.value),
      selectFrom.value,
      selectTo.value,
      output
    );
  });
  return form;
};
//calls api and makes a rate conversion between selected currencies
const convertRates = (amount, from, to, output) => {
  getDataFromAPI().then((data) => {
    const result = (amount * data[to]) / data[from];
    output.value = result
      .toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace("$", "");
  });
};

//creates a currency converter app
const createCurrencyConverter = () => {
  //if the app is already opened don't open another one
  if (document.querySelector("#currencyConverterModal")) {
    return;
  }

  const currencyConverterModal = createElementWithText(
    "div",
    null,
    "modal",
    "currencyConverterModal"
  );
  currencyConverterModal.classList.add("modal--forex");
  //adds a menu bar
  const menuBar = createMenuBar("currencyConverterModal", "Currency Converter");
  currencyConverterModal.appendChild(menuBar);
  //adds a form that takes in input amount and allows the user to select currency types
  const form = createForm();
  currencyConverterModal.appendChild(form);
  //adds the app to desktop
  document.getElementsByTagName("body")[0].appendChild(currencyConverterModal);
  makeModalWindowActive(currencyConverterModal);
  currencyConverterModal.addEventListener("click", () => {
    //console.log("cc got clicked");
    makeModalWindowActive(currencyConverterModal);

    //currencyConverterModal.classList.add("modal--maximized");
  });
};

//when icon is clicked open up the app
forexIcon.addEventListener("dblclick", () => {
  createCurrencyConverter();
});
