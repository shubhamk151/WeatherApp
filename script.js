const btn = document.getElementById("btn");
const form = document.getElementById("form");
const loader = document.getElementById("loader");
let city;
let data;

form.addEventListener("submit", async (e) => {
  loader.style.display = "block";
  e.preventDefault();
  city = document.getElementById("input").value;

  await weatherData();
  e.target.input.value = "";
  loader.style.display = "none";
});

const weatherData = async () => {
  const APIKEY = "771eefcbe74fd68d6896d00f8cc95b4f";
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKEY}`
    );
    data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
