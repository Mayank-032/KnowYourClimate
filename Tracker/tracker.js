async function updateMap(){
    let coords_data = [];

    await fetch("./data.json")
        .then(response => response.json())
        .then(data => {
            // console.log(data.ref_country_codes);
            data.ref_country_codes.forEach(ele => {
                let coords = {};

                let lat = ele.latitude;
                let lon = ele.longitude;

                coords.latitude = lat;
                coords.longitude = lon;

                coords_data.push(coords);
            })
        });
    
    coords_data.forEach(obj => {
        let lat = obj.latitude;
        let lon = obj.longitude;
        
        fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=bbd672373a57758125b5a2c935617694`)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                let aqi = data.list[0].main.aqi;
                // console.log(aqi);

                let color = "";
                let description = "";

                if(aqi == 1){
                    color = "#6e9eeb";
                    description = `<strong> Good Air Quality </strong><p>Air Quality Index: ${aqi}</p>`;
                }else if(aqi == 2){
                    color = "#1565e6";
                    description = `<strong> Fair Air Quality </strong><p>Air Quality Index: ${aqi}</p>`;
                }else if(aqi == 3){
                    color = "#012f78";
                    description = `<strong> Moderate Air Quality </strong><p>Air Quality Index: ${aqi}</p>`;
                }else if(aqi == 4){
                    color = "#0f213d";
                    description = `<strong> Poor Air Quality </strong><p>Air Quality Index: ${aqi}</p>`;
                }else{
                    color = "#030f21";
                    description = `<strong> Very Poor Air Quality </strong><p>Air Quality Index: ${aqi}</p>`;
                }

                const marker = new mapboxgl.Marker({
                    color: color,
                    zoom: 1,
                });

                marker
                    .setLngLat([lon,lat])
                    .addTo(map);
            });
    })
}

updateMap();

alert("Zoom inside map, click on marker and get information for that country");