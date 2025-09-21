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
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}`
    );
    data = await response.json();
    console.log(data);
    setData(data);
  } catch (err) {
    console.error(err);
  }
};

function geoFindMe() {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const weatherData = async () => {
      const APIKEY = "771eefcbe74fd68d6896d00f8cc95b4f";
      try {
        loader.style.display = "block";

        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        data = await res.json();

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${data.city}&appid=${APIKEY}`
        );
        data = await response.json();
        console.log(data);
        setData(data);
        loader.style.display = "none";
      } catch (err) {
        console.error(err);
      }
    };

    weatherData();
  });
}
geoFindMe();

function setData(data) {
  const date = document.getElementById("date");
  const options = { month: "short", day: "numeric" };
  const now = new Date();
  date.innerText = `${now.toLocaleDateString(
    "en-US",
    options
  )}, ${now.getHours()}:${now.getMinutes()} ${
    now.getHours() >= 12 ? "pm" : "am"
  }`;

  const location = document.getElementById("location");
  location.innerText = `${data.city.name}, ${data.city.country}`;

  const desc = document.getElementById("desc");
  desc.innerText = `Feels like ${Math.round(
    data.list[0].main.feels_like - 273.15
  )}°C. ${data.list[0].weather[0].description}. Wind ${
    data.list[0].wind.speed
  }m/s`;

  const temp = document.getElementById("temp");
  temp.innerText = `${Math.round(data.list[0].main.temp - 273.15)}°C`;

  const cdata2 = document.querySelector(".cdata2");
  cdata2.innerHTML = `
  <p><i class="fa-solid fa-wind"></i> Wind: ${data.list[0].wind.speed}m/s</p>
  <p><i class="fa-solid fa-cloud-rain"></i> Rain: ${
    data.list[0].rain ? data.list[0].rain["3h"] : 0
  }mm</p>
  <p><i class="fa-solid fa-droplet"></i> Humidity: ${
    data.list[0].main.humidity
  }%</p>
  <p><i class="fa-solid fa-eye"></i> Visibility: ${
    data.list[0].visibility
  } m</p>
  <p><i class="fa-solid fa-gauge"></i> Pressure: ${
    data.list[0].main.pressure
  } hPa</p>
  `;

  const img = document.getElementById("img");
  if (data.list[0].weather[0].main === "Clouds") {
    img.src = "assets/cloudy.jpg";
  } else if (data.list[0].weather[0].main === "Rain") {
    img.src = "assets/rainy.jpg";
  } else if (data.list[0].weather[0].main === "Wind") {
    img.src = "assets/windy.jpg";
  } else if (data.list[0].weather[0].main === "Snow") {
    img.src = "assets/snowy.jpg";
  } else {
    img.src = "assets/clear.jpg";
  }
}
