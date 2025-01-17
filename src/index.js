async function search(event) {
  event.preventDefault(); // Prevent the page from refreshing.

  let searchInputElement = document.querySelector("#search-input");
  let cityName = searchInputElement.value;

  const apiKey = "7a74043bab6tbb4ao2f67f8ace2cefa6";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;

  try {
    let response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("City not found. Please try again.");
    }

    let data = await response.json();

    document.querySelector("#current-city").textContent = data.city;
    document.querySelector("#current-temperature").textContent = Math.round(
      data.temperature.current
    );
    document.querySelector(
      "#humidity"
    ).textContent = `${data.temperature.humidity}%`;
    document.querySelector("#wind-speed").textContent = `${Math.round(
      data.wind.speed
    )} km/h`;
    document.querySelector("#weather-description").textContent =
      data.condition.description;

    // Change the weather icon dynamically.
    let weatherIcon = document.querySelector("#current-icon");
    if (data.condition.description.includes("rain")) {
      weatherIcon.textContent = "🌧️";
    } else if (data.condition.description.includes("cloud")) {
      weatherIcon.textContent = "☁️";
    } else if (data.temperature.current > 30) {
      weatherIcon.textContent = "☀️";
    } else {
      weatherIcon.textContent = "❄️";
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[day]} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

document.querySelector("#current-date").textContent = formatDate(new Date());
