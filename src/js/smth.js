import markupAdd from "../templates/markup.hbs";
const divInfo = document.querySelector("#main-container");
const search_input = document.querySelector(".input-field");
let search_term = "";
let countries;

const fetchCountries = () => {
  countries = fetch(
    "https://restcountries.eu/rest/v2/all?fields=name;flag;capital;population;languages"
  ).then((res) => res.json());
};

const showCountries = () => {
  divInfo.innerHTML = "";
  fetchCountries();
  console.log(countries);
  countries
    .filter((country) =>
      country.name.toLowerCase().includes(search_term.toLowerCase())
    )
    .map((item) => markupAdd(item))
    .join("");
  divInfo.insertAdjacentHTML("beforeend", infoBlock);
};

search_input.addEventListener("input", (e) => {
  search_term = e.target.value;
  showCountries();
});
