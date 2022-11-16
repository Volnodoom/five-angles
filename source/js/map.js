const ZOOM = 14;
const START_OF_COORDINATES = {
  lat: 59.846950,
  lng: 30.451630,
};


const mapElement = $('.basket__map').get(0);
const map = L
  .map(mapElement)
  .setView(START_OF_COORDINATES, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const marker = L.marker(START_OF_COORDINATES);

marker.addTo(map);
