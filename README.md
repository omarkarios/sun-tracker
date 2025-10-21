# ☀️ SunTracker Kenya

SunTracker Kenya is a simple **Single Page Application (SPA)** that allows users to view the **current sunlight and weather conditions** across all **47 counties of Kenya**.  
It is built using **HTML, CSS, and JavaScript**, and integrates with the **OpenWeatherMap API** to display real-time sunlight data (via temperature, cloud cover, and solar visibility indicators).

---

## 🌍 Project Overview

As an **Aftersales Electrical Engineer at SunCulture Kenya**, this project demonstrates how solar energy performance can be monitored based on weather and sunlight data across the country.  
It can be used to:
- Identify the best solar-producing regions.
- Assist in customer service planning and maintenance.
- Support solar irrigation and power system optimization.

---

## 🎯 Learning Goals

- Design and architect a JavaScript frontend feature.
- Integrate and consume data from a **public API** (OpenWeatherMap).
- Handle asynchronous requests using `fetch()` and JSON.
- Apply multiple **event listeners** for interactivity.
- Implement **array iteration** (`forEach`, `map`, `filter`) to manipulate data.
- Follow **DRY** coding practices and clean structure.
- Build and deploy a working **MVP (Minimum Viable Product)**.

---

## 🧠 User Stories

1. **As a user**, I want to select any county in Kenya so that I can view real-time sunlight and weather data.  
2. **As a user**, I want to see a clear visual display of the temperature, sunlight condition, and humidity for the selected county.  
3. **As a user**, I want the interface to be responsive and easy to use so that I can check conditions on any device.

---

## ⚙️ Minimum Viable Product (MVP) Features

1. **Interactive County Selector** — Dropdown menu with all 47 counties of Kenya.  
2. **Weather API Integration** — Uses OpenWeatherMap to fetch and display real-time data.  
3. **Sunlight Condition Display** — Shows temperature, cloud percentage, and weather description.  
4. **Asynchronous Fetch Handling** — Uses `fetch()` and JSON to handle API data.  
5. **Event Listeners** — For dropdown change, button click, and mode toggle (three distinct event types).  
6. **Dynamic DOM Updates** — Data updates instantly without page reloads.

---

## 🧩 Technologies Used

- **HTML5**  
- **CSS3**  
- **JavaScript (ES6+)**  
- **OpenWeatherMap API** (no key required for basic access)

---

## 🔗 Public API Used

**API Name:** [OpenWeatherMap API](https://openweathermap.org/api)  
**Endpoint Example:**  
```
https://api.openweathermap.org/data/2.5/weather?lat=-1.2864&lon=36.8172&units=metric&appid=YOUR_API_KEY
```

---

## 🧩 Project Structure

```
suntracker/
│
├── index.html       # Main HTML file
├── style.css        # Styling for the app
├── script.js        # JavaScript logic and API integration
└── README.md        # Project documentation
```

---

## 🚀 How to Run the Project

1. **Clone the repository**  
   ```bash
   git clone https://github.com/yourusername/suntracker.git
   ```

2. **Open in VS Code**

3. **Run a local server**  
   You can use VS Code’s Live Server extension or run:
   ```bash
   npx serve
   ```

4. **View in browser:**  
   Open [http://localhost:5000](http://localhost:5000) (or the port shown).

5. **Select a county** and view the current sunlight and weather data!

---

## 🧠 Example Use Case

> A technician in Makueni wants to know how much sunlight the area receives before scheduling a solar irrigation maintenance visit.  
> They open SunTracker, select “Makueni,” and instantly see weather and solar data such as temperature, sunlight condition, and humidity — all fetched in real-time.

---


## 🧾 License

This project is open source and available under the **MIT License**.

---

## 👨🏾‍💻 Author

**Name:** Markarios Oketch  
**Role:** Aftersales Electrical Engineer, SunCulture Kenya  
**Bootcamp Project:** Phase 1 — JavaScript Frontend Project  
**GitHub:** [https://github.com/omarkarios](https://github.com/omarkarios)

---

☀️ *SunTracker Kenya — Empowering clean energy through smart sunlight monitoring.*
