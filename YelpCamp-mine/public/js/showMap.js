mapboxgl.accessToken = mbxMapToken;

const map = new mapboxgl.Map({
    container: 'mapUI', // container ID
    style: `mapbox://styles/mapbox/${mapStyle}`, // style URL
    center: campsite.geometry.coordinates, // starting position [lng, lat]
    zoom: 14 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
const marker1 = new mapboxgl.Marker()
    .setLngLat(campsite.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h5>${campsite.title}</h5><p>${campsite.location}</p>`)
    )
    .addTo(map);