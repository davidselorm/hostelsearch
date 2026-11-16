# 🏨 HostelSearch — Student Accommodation Finder

> **A high-speed, interactive web platform that helps university students find verified hostels easily, powered by Google Maps data, real pricing, and direct manager contact.**

![HostelSearch Platform](https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&auto=format&fit=crop&q=80)

---

## 🌟 Key Features

### 1. 🗺️ Google Maps Live Integration
* **Places API (New) Integration:** Fetches place details, formatted addresses, precise latitude/longitude, Google star ratings, user reviews, opening hours, photos, and verified phone numbers.
* **Live Zero-Key Spatial Extractor:** Uses spatial queries around campus centers to extract real-world hostels directly without requiring a paid API key.
* **Turn-by-Turn Directions:** 1-click links to open exact Google Maps walking or driving routes from campus gates.

### 2. ⚡ Crucial Student Housing Intelligence
* **Dumsor-Proof Tagging:** Highlights hostels equipped with automatic industrial standby generators or solar microgrids.
* **Water Security Guarantee:** Verified borehole and high-capacity Polytank water reserves.
* **Campus Transit:** Free dedicated shuttle bus indicators and walking time calculations.

### 3. 🛏️ Transparent Room Configurations & Rates
* **Room Capacity Options:** Filter by 1-in-a-room (Single), 2-in-a-room (Double), 3-in-a-room (Triple), and 4-in-a-room (Quad).
* **Flexible Pricing:** Toggle between **Per Semester** and **Full Academic Year** rates.
* **Ensuite & AC Badges:** Instant view of private bathrooms and air conditioning.

### 4. 💬 Instant Manager Booking via WhatsApp & Call
* **WhatsApp Booking Generator:** Pre-constructs a personalized inquiry message with student details, selected room tier, duration, and price.
* **Direct Call Button:** Tap to dial verified hostel front desks immediately.

### 5. 📍 Interactive Leaflet Map
* Custom map pins displaying starting price tags and generator badges.
* Interactive popups with photos, distance, and quick access.
* Switch between **Cards Grid**, **Interactive Map**, or **Split View**.

### 6. ⚖️ Side-by-Side Comparison & Bookmarks
* Compare up to 3 hostels simultaneously across pricing, amenities, power backup, and distance.
* Bookmark favorite hostels for easy retrieval.

---

## 🏛️ Supported Universities & Campuses

* **University of Ghana (UG Legon)** — Legon, Bani, Pentagon, Atomic, Haatso, West Legon
* **KNUST (Kumasi)** — Ayeduase, Kotei, Gaza Area, Boadi, Kentinkrono
* **University of Cape Coast (UCC)** — Amamoma, Apewosika, Kwaprow, Ayensu
* **UPSA (Accra)** — Madina, Atomic Junction, Legon Extension
* **Ashesi University** — Berekuso Hills, Kitase
* **Accra Technical University (ATU)** — Tudu, Kinbu, Adabraka
* **Expandable to Any Campus or City Nationwide**

---

## 🛠️ Tech Stack

* **Framework:** React 19 + TypeScript + Vite
* **Styling:** Tailwind CSS + PostCSS
* **Icons:** Lucide React
* **Maps:** Leaflet & OpenStreetMap / CartoDB Voyager tiles
* **Data Sources:** Google Places API (New) & OpenStreetMap Overpass Spatial Engine
* **Persistence:** LocalStorage with persistent cache

---

## 🚀 Getting Started

### Prerequisites
* Node.js v18+ (tested on Node v26.7.0)
* npm v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/davidselorm/hostelsearch.git
cd hostelsearch

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at: `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

---

## 🔑 Google Maps API Configuration (Optional)

HostelSearch includes a built-in extractor that works **without an API key**. 

To connect your own Google Cloud account for live Google Places API (New) queries:
1. Open the app and click **"Sync Maps"** in the top navigation bar.
2. Select the **"Google Places API (New)"** tab.
3. Paste your Google Cloud API key (with `Places API (New)` enabled).
4. Click **"Save Key"** and start scanning!

---

## 📄 License

MIT © [davidselorm](https://github.com/davidselorm)
