document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

mapboxgl.accessToken = 'pk.eyJ1IjoibWF5YW5rMjAwMiIsImEiOiJjbDR0ZXNma3QwcGMxM3BvNjcxcHAzNG1lIn0.aF8_qn6O-OXr7yWSG7llZw';
var map = new mapboxgl.Map({
    container: 'maps',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [0, 20],
    zoom: 1
});