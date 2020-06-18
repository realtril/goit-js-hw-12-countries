import { error } from "@pnotify/core";
import _ from "lodash";
import "../../node_modules/@pnotify/core/dist/BrightTheme.css";
import markupAdd from "../templates/markup.hbs";
const divInfo = document.querySelector("#main-container");
const search_input = document.querySelector(".input-field");
const myError = function () {
  error({
    text: "Too many mathes. Please enter a more specific query",
    type: "error",
    width: "400px",
    minHeight: "auto",
    icon: true,
    closer: false,
    sticker: false,
    remove: true,
    delay: 1000,
  });
};

const handleSearchQueryChange = (e) => {
  fetch(`https://restcountries.eu/rest/v2/name/${e.target.value}`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(`${response.status} error while your search has occured`);
    })
    .then((data) => {
      if (data.length > 10) {
        myError();
        return;
      }
      if (data.length > 1) {
        let markup = "";
        data.map((country) => (markup += `<p>${country.name}</p>`));
        console.log(markup);
        divInfo.innerHTML = markup;
      }
      if (data.length === 1) {
        divInfo.innerHTML = markupAdd(...data);
      }
    })
    .catch(console.error);
};

search_input.addEventListener(
  "input",
  _.debounce(handleSearchQueryChange, 500)
);

window.addEventListener(
  "error",
  function (e) {
    console.log(e);
  },
  true
);

//filter option no debounce

// import markupAdd from "../templates/markup.hbs";
// const divInfo = document.querySelector("#main-container");
// const search_input = document.querySelector(".input-field");
// let search_term = "";

// const fetchCountries = () => {
//   return fetch(
//     "https://restcountries.eu/rest/v2/all?fields=name;flag;capital;population;languages"
//   ).then((res) => res.json());
// };

// const showCountries = () => {
//   divInfo.innerHTML = "";
//   fetchCountries().then((data) => {
//     data
//       .filter((country) =>
//         country.name.toLowerCase().includes(search_term.toLowerCase())
//       )
//       .map((item) => markupAdd(item))
//       .join("");
//     divInfo.insertAdjacentHTML("beforeend", infoBlock);
//   });
// };

// search_input.addEventListener("input", (e) => {
//   search_term = e.target.value;
//   showCountries();
// });
