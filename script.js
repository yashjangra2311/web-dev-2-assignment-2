const API_KEY = "b4521f3a7cc11f2b97185fdf2a95e3f4";
//    const API_KEY = "af9f63c59a649f27d602b96a43d0bd14";

const weatherBox = document.getElementById("weather");
const historyBox = document.getElementById("history");

/* ---------- WEATHER FETCH ---------- */
async function getWeather(city) {

    // small delay for smoother UI
    // await new Promise(r => setTimeout(r, 500));

    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) {
        alert("city not found");
        throw new Error("City not found");
    }
    const data = await res.json();
    return data;
}

 /* ---------- BUTTON CLICK ---------- */
document.getElementById("searchBtn").onclick = () => {
    const city = cityInput.value.trim();
    if (city) {
        search(city);
    }
};

/* ---------- UI RENDER ---------- */
function renderWeather(d) {
    weatherBox.innerHTML = `
<div class="weather-item"><label>City</label><span>${d.name}, ${d.sys.country}</span></div>
<div class="weather-item"><label>Temperature</label><span>${d.main.temp} °C</span></div>
<div class="weather-item"><label>Weather</label><span>${d.weather[0].main}</span></div>
<div class="weather-item"><label>Humidity</label><span>${d.main.humidity}%</span></div>
<div class="weather-item"><label>Wind Speed</label><span>${d.wind.speed} m/s</span></div>
`;
}

/* ---------- SAVE SEARCH HISTORY ---------- */
function saveHistory(city) {

}

/* ---------- SHOW HISTORY ---------- */
function showHistory() {

}

/* ---------- SEARCH FUNCTION ---------- */
async function search(city) {
    weatherBox.innerHTML = "";
    try {
        const data = await getWeather(city);
        renderWeather(data);
        saveHistory(data.name); 
    } catch (error) {
        weatherBox.innerHTML = `<p style="color:red">${error.message}</p>`;
    }
}

/* ---------- ENTER KEY SEARCH ---------- */
cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) {
            search(city);
        }
    }
});
/* ---------- INITIAL LOAD ---------- */
showHistory();


function saveHistory(city) {
    // 1. Read the saved list (or empty array if nothing saved yet)
    let history = JSON.parse(localStorage.getItem("weatherHistory") || "[]");

    // 2. Add the new city at the start
    history.unshift(city);

    // 3. Save the updated list back
    localStorage.setItem("weatherHistory", JSON.stringify(history));

    // 4. Refresh what's shown on screen
    showHistory();
}

function showHistory() {
    // 1. Read the saved list
    let history = JSON.parse(localStorage.getItem("weatherHistory") || "[]");

    // 2. For each city, make a button and show it
    historyBox.innerHTML = "";
    history.forEach(function(city) {
        let btn = document.createElement("button");
        btn.textContent = city;
        btn.onclick = function() { search(city); };
        historyBox.appendChild(btn);
    });
}
