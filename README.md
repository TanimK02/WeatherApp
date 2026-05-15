# Weather App

A small browser app that shows current conditions, a 24-hour overview, and a five-day forecast for any searchable location. Built as part of [The Odin Project](https://www.theodinproject.com/) JavaScript curriculum (weather project).

## Features

- **Location search** — Enter a city or place and press Enter to load weather for that location (defaults to New York City on first load).
- **Current conditions** — Temperature, rain chance, condition icon, UV, humidity, visibility, “feels like,” sunrise, and sunset.
- **24-hour strip** — Hourly icons and temperatures from the current hour through the rest of the day (and into the next day when needed).
- **Five-day forecast** — Daily high/low, conditions text, and icons with labels such as Today, Tomorrow, or weekday names.
- **°F / °C** — Toggle updates all temperature displays consistently.

## Tech stack

- Vanilla JavaScript (no framework)
- Webpack 5 (`webpack.common.js`, `webpack.dev.js`, `webpack.prod.js`)
- HTML template in `src/template.html`, styles in `src/styles.css`
- Weather data from the [Visual Crossing Timeline API](https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/)

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended) and npm

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server (opens the app in your browser):

```bash
npm start
```

Create an optimized production build in `dist/`:

```bash
npm run build
```

## API key

The app calls Visual Crossing from the browser. You need a valid API key in the request URL inside `src/index.js` (`getWeather`).

1. Create a free account and key at [Visual Crossing](https://www.visualcrossing.com/weather-api/).
2. Replace the `key=` query parameter value in the `fetch` URL with your own key.

**Security note:** Any key embedded in frontend code is visible to anyone who uses or inspects the app. For learning or private demos that is often acceptable; for a public production app, prefer a small backend or serverless function that holds the key and proxies requests to Visual Crossing.

## Project layout

| Path | Purpose |
|------|---------|
| `src/index.js` | API calls, parsing, and DOM updates |
| `src/template.html` | Page structure and element IDs |
| `src/styles.css` | Layout and styling |
| `src/assets/icons/` | Condition icons (SVG) |
| `src/assets/cardIcons/` | Icons for stat cards |
| `webpack.*.js` | Bundler configuration |

## License

Font assets under `src/assets/Montserrat/` follow the license in `OFL.txt`. Icon SVGs follow any terms noted in `src/assets/icons/README` where applicable.
