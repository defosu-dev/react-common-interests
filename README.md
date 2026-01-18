# Common Interests

Interactive map that helps you discover users by shared interests.  
Enter an interest in the search field and the map will show only matching users.

Live demo: https://react-common-interests.vercel.app/

## Features
- Map with 10,000 mock users
- Marker clustering
- Fast filtering by interest
- User popups with name and interests

## Tech stack
- React + TypeScript
- Leaflet + Leaflet.markercluster
- MobX (state management)
- Web Worker (filtering optimization)

## Run locally
```bash
npm install
npm run dev
````

## Notes

Filtering is handled in a Web Worker to keep the UI responsive.
Clearing the filter may still cause a short redraw delay due to DOM marker rendering in Leaflet.
One possible future optimization is switching to a WebGL-based map library (for example MapLibre/Mapbox GL).
