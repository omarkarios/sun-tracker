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