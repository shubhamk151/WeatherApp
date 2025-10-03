const btn = document.getElementById("btn");
const form = document.getElementById("form");
const loader = document.getElementById("loader");
let city;
let data;

geoFindMe();

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
    alert("City not found. please try again!");
    console.log(err);
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
        alert("City not found please try again");
        console.log(err);
      }
    };

    weatherData();
  });
}

function setData(data) {
  const date = document.getElementById("date");
  const options = { month: "short", day: "numeric" };
  const now = new Date();
  date.innerText = `${now.toLocaleDateString("en-US", options)}, ${
    now.getHours() % 12 || 12
  }:${now.getMinutes().toString().padStart(2, "0")} ${
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

  let cicon = document.getElementById("cicon");
  if (
    data.list[0].weather[0].icon === "01n" ||
    data.list[0].weather[0].icon === undefined
  ) {
    cicon.innerHTML = `<img src="http://openweathermap.org/img/wn/02d@2x.png" alt="icon">`;
  } else {
    cicon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" alt="icon">`;
  }

  const cdata2 = document.querySelector(".cdata2");
  cdata2.innerHTML = `
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

  // forecast data
  //day one

  let date1 = new Date(data.list[9].dt * 1000);
  const options1 = { month: "short", day: "numeric", year: "numeric" };
  let forecastIcon = document.getElementById("forecast-icon-1");
  forecastIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${
    data.list[9].weather[0].icon
  }@2x.png" alt="icon"> <span>${date1.toLocaleDateString(
    "en-US",
    options1
  )}</span>`;

  let forecastTemp = document.getElementById("forecast-temp-1");
  forecastTemp.innerText = `${Math.round(data.list[9].main.temp - 273.15)}°C`;
  let forecastDesc = document.getElementById("forecast-cond-1");
  forecastDesc.innerText = data.list[9].weather[0].description;
  let forecastHumidity = document.getElementById("forecast-humidity-1");
  forecastHumidity.innerText = `Humidity: ${data.list[9].main.humidity}%`;
  let forecastVisibility = document.getElementById("forecast-visibility-1");
  forecastVisibility.innerText = `Visibility: ${data.list[9].visibility} m`;
  let forecastWind = document.getElementById("forecast-wind-1");
  forecastWind.innerText = `Wind: ${data.list[9].wind.speed} m/s`;

  //day two
  let date2 = new Date(data.list[16].dt * 1000);
  let forecastIcon2 = document.getElementById("forecast-icon-2");
  forecastIcon2.innerHTML = `<img src="http://openweathermap.org/img/wn/${
    data.list[16].weather[0].icon
  }@2x.png" alt="icon"> <span>${date2.toLocaleDateString(
    "en-US",
    options1
  )}</span>`;

  let forecastTemp2 = document.getElementById("forecast-temp-2");
  forecastTemp2.innerText = `${Math.round(data.list[16].main.temp - 273.15)}°C`;
  let forecastDesc2 = document.getElementById("forecast-cond-2");
  forecastDesc2.innerText = data.list[16].weather[0].description;
  let forecastHumidity2 = document.getElementById("forecast-humidity-2");
  forecastHumidity2.innerText = `Humidity: ${data.list[16].main.humidity}%`;
  let forecastVisibility2 = document.getElementById("forecast-visibility-2");
  forecastVisibility2.innerText = `Visibility: ${data.list[16].visibility} m`;
  let forecastWind2 = document.getElementById("forecast-wind-2");
  forecastWind2.innerText = `Wind: ${data.list[16].wind.speed} m/s`;

  //day three
  let date3 = new Date(data.list[25].dt * 1000);
  let forecastIcon3 = document.getElementById("forecast-icon-3");
  forecastIcon3.innerHTML = `<img src="http://openweathermap.org/img/wn/${
    data.list[25].weather[0].icon
  }@2x.png" alt="icon"> <span>${date3.toLocaleDateString(
    "en-US",
    options1
  )}</span>`;

  let forecastTemp3 = document.getElementById("forecast-temp-3");
  forecastTemp3.innerText = `${Math.round(data.list[25].main.temp - 273.15)}°C`;
  let forecastDesc3 = document.getElementById("forecast-cond-3");
  forecastDesc3.innerText = data.list[25].weather[0].description;
  let forecastHumidity3 = document.getElementById("forecast-humidity-3");
  forecastHumidity3.innerText = `Humidity: ${data.list[25].main.humidity}%`;
  let forecastVisibility3 = document.getElementById("forecast-visibility-3");
  forecastVisibility3.innerText = `Visibility: ${data.list[25].visibility} m`;
  let forecastWind3 = document.getElementById("forecast-wind-3");
  forecastWind3.innerText = `Wind: ${data.list[25].wind.speed} m/s`;

  //day four
  let date4 = new Date(data.list[33].dt * 1000);
  let forecastIcon4 = document.getElementById("forecast-icon-4");
  forecastIcon4.innerHTML = `<img src="http://openweathermap.org/img/wn/${
    data.list[33].weather[0].icon
  }@2x.png" alt="icon"> <span>${date4.toLocaleDateString(
    "en-US",
    options1
  )}</span>`;

  let forecastTemp4 = document.getElementById("forecast-temp-4");
  forecastTemp4.innerText = `${Math.round(data.list[33].main.temp - 273.15)}°C`;
  let forecastDesc4 = document.getElementById("forecast-cond-4");
  forecastDesc4.innerText = data.list[33].weather[0].description;
  let forecastHumidity4 = document.getElementById("forecast-humidity-4");
  forecastHumidity4.innerText = `Humidity: ${data.list[33].main.humidity}%`;
  let forecastVisibility4 = document.getElementById("forecast-visibility-4");
  forecastVisibility4.innerText = `Visibility: ${data.list[33].visibility} m`;
  let forecastWind4 = document.getElementById("forecast-wind-4");
  forecastWind4.innerText = `Wind: ${data.list[33].wind.speed} m/s`;

  //day five
 let date5 = new Date(data.list[38].dt * 1000);
  let forecastIcon5 = document.getElementById("forecast-icon-5");
  forecastIcon5.innerHTML = `<img src="http://openweathermap.org/img/wn/${
    data.list[38].weather[0].icon
  }@2x.png" alt="icon"> <span>${date5.toLocaleDateString(
    "en-US",
    options1
  )}</span>`;
  
  let forecastTemp5 = document.getElementById("forecast-temp-5");
  forecastTemp5.innerText = `${Math.round(data.list[38].main.temp - 273.15)}°C`;
  let forecastDesc5 = document.getElementById("forecast-cond-5");
  forecastDesc5.innerText = data.list[38].weather[0].description;
  let forecastHumidity5 = document.getElementById("forecast-humidity-5");
  forecastHumidity5.innerText = `Humidity: ${data.list[38].main.humidity}%`;
  let forecastVisibility5 = document.getElementById("forecast-visibility-5");
  forecastVisibility5.innerText = `Visibility: ${data.list[38].visibility} m`;
  let forecastWind5 = document.getElementById("forecast-wind-5");
  forecastWind5.innerText = `Wind: ${data.list[38].wind.speed} m/s`;
}
