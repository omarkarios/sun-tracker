const counties = [
  { name: "Baringo", lat: 0.4667, lon: 35.9667 },
  { name: "Bomet", lat: -0.7833, lon: 35.35 },
  { name: "Bungoma", lat: 0.5667, lon: 34.5667 },
  { name: "Busia", lat: 0.4608, lon: 34.1117 },
  { name: "Elgeyo-Marakwet", lat: 0.5333, lon: 35.5833 },
  { name: "Embu", lat: -0.5333, lon: 37.45 },
  { name: "Garissa", lat: -0.4569, lon: 39.6583 },
  { name: "Homa Bay", lat: -0.5273, lon: 34.4571 },
  { name: "Isiolo", lat: 0.3546, lon: 37.5822 },
  { name: "Kajiado", lat: -1.852, lon: 36.7762 },
  { name: "Kakamega", lat: 0.2833, lon: 34.75 },
  { name: "Kericho", lat: -0.3692, lon: 35.2833 },
  { name: "Kiambu", lat: -1.1714, lon: 36.8356 },
  { name: "Kilifi", lat: -3.6333, lon: 39.8500 },
  { name: "Kirinyaga", lat: -0.6667, lon: 37.3667 },
  { name: "Kisii", lat: -0.6817, lon: 34.7667 },
  { name: "Kisumu", lat: -0.0917, lon: 34.7679 },
  { name: "Kitui", lat: -1.3667, lon: 38.0167 },
  { name: "Kwale", lat: -4.1833, lon: 39.45 },
  { name: "Laikipia", lat: 0.029, lon: 36.883 },
  { name: "Lamu", lat: -2.2717, lon: 40.902 },
  { name: "Machakos", lat: -1.5177, lon: 37.2634 },
  { name: "Makueni", lat: -1.803, lon: 37.6203 },
  { name: "Mandera", lat: 3.937, lon: 41.8569 },
  { name: "Marsabit", lat: 2.3333, lon: 37.9833 },
  { name: "Meru", lat: 0.047, lon: 37.6559 },
  { name: "Migori", lat: -1.0667, lon: 34.4667 },
  { name: "Mombasa", lat: -4.0435, lon: 39.6682 },
  { name: "Murang'a", lat: -0.783, lon: 37.033 },
  { name: "Nairobi", lat: -1.2864, lon: 36.8172 },
  { name: "Nakuru", lat: -0.3031, lon: 36.0800 },
  { name: "Nandi", lat: 0.1833, lon: 35.1 },
  { name: "Narok", lat: -1.0833, lon: 35.8667 },
  { name: "Nyamira", lat: -0.5667, lon: 34.9333 },
  { name: "Nyandarua", lat: -0.3167, lon: 36.3833 },
  { name: "Nyeri", lat: -0.4197, lon: 36.9476 },
  { name: "Samburu", lat: 1.0833, lon: 36.8833 },
  { name: "Siaya", lat: 0.0607, lon: 34.2881 },
  { name: "Taita-Taveta", lat: -3.3167, lon: 38.4833 },
  { name: "Tana River", lat: -1.8333, lon: 40.1167 },
  { name: "Tharaka-Nithi", lat: -0.3, lon: 37.8333 },
  { name: "Trans Nzoia", lat: 1.0167, lon: 35.0 },
  { name: "Turkana", lat: 3.1167, lon: 35.6 },
  { name: "Uasin Gishu", lat: 0.5143, lon: 35.2698 },
  { name: "Vihiga", lat: 0.0833, lon: 34.7167 },
  { name: "Wajir", lat: 1.75, lon: 40.05 },
  { name: "West Pokot", lat: 1.5, lon: 35.1 }
];


const countySelect = document.getElementById("county-select");
const searchInput = document.getElementById("search");
const container = document.getElementById("cards-container");
const themeToggle = document.getElementById("theme-toggle");
const compareBtn = document.getElementById("compare-btn");

let visibleCounties = [...counties];
let weatherCache = {};

// Initialize dropdown 
function populateDropdown() {
  counties.map(c => {
    const opt = document.createElement("option");
    opt.value = c.name;
    opt.textContent = c.name;
    countySelect.appendChild(opt);
  });
}

// Fetch sunlight data from Open-Meteo 
async function fetchSunlight(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,shortwave_radiation`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather");
  const data = await res.json();
  return data.current;
}

// Render cards
function renderCounties(countyList) {
  container.innerHTML = "";
  countyList.forEach(async (county) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${county.name}</h3><p>Loading data...</p>`;
    container.appendChild(card);

    try {
      const data = await fetchSunlight(county.lat, county.lon);
      weatherCache[county.name] = data;
      card.innerHTML = `
        <h3>${county.name}</h3>
        <p>☀️ Sunlight: <b>${data.shortwave_radiation} W/m²</b></p>
        <p>🌡️ Temp: <b>${data.temperature_2m} °C</b></p>
        <p>🕒 Time: ${data.time.slice(11)}</p>
        <button class="fav-btn">⭐ Add to Favorites</button>
      `;
    } catch {
      card.innerHTML = `<h3>${county.name}</h3><p style="color:red;">Error fetching data</p>`;
    }
  });
}

// Search functionality
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  visibleCounties = counties.filter(c => c.name.toLowerCase().includes(query));
  renderCounties(visibleCounties);
});

// Dropdown filter 
countySelect.addEventListener("change", (e) => {
  const selected = e.target.value;
  if (!selected) {
    visibleCounties = counties;
  } else {
    visibleCounties = counties.filter(c => c.name === selected);
  }
  renderCounties(visibleCounties);
});

// Compare sunlight 
compareBtn.addEventListener("click", () => {
  const available = Object.entries(weatherCache);
  if (available.length < 2) {
    alert("Load data for at least two counties first!");
    return;
  }
  const sorted = available.sort((a, b) => b[1].shortwave_radiation - a[1].shortwave_radiation);
  const message = sorted.map(([name, data]) => `${name}: ${data.shortwave_radiation} W/m²`).join("\n");
  alert("☀️ Sunlight Comparison:\n\n" + message);
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// Load saved theme 
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️ Light Mode";
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  populateDropdown();
  renderCounties(counties);
});