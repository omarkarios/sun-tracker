const counties = [
  { name: "Nairobi", lat: -1.2864, lon: 36.8172 },
  { name: "Makueni", lat: -1.803, lon: 37.6203 },
  { name: "Machakos", lat: -1.5177, lon: 37.2634 },
  { name: "Nakuru", lat: -0.3031, lon: 36.0800 },
  { name: "Eldoret", lat: 0.5143, lon: 35.2698 },
  { name: "Kisumu", lat: -0.0917, lon: 34.7679 },
  { name: "Garissa", lat: -0.4569, lon: 39.6583 },
  { name: "Nyeri", lat: -0.4197, lon: 36.9476 },
  { name: "Kitui", lat: -1.3667, lon: 38.0167 }
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