function extractCoordinates(){
    const coord_obj_str = localStorage.getItem('coordinates_obj');
    const coord_obj = JSON.parse(coord_obj_str);

    // coord_obj = {
    //     "latitude": coord_obj.latitude,
    //     "longitude": coord_obj.longitude
    // }

    return coord_obj;
}

let coordinates = extractCoordinates();
console.log(coordinates);

let gas1 = document.querySelectorAll("#gas1");
let gas1_d = document.getElementById("gas1_data");

let gas2 = document.querySelectorAll("#gas2");
let gas2_d = document.getElementById("gas2_data");

let gas3 = document.querySelectorAll("#gas3");
let gas3_d = document.getElementById("gas3_data");

let gas4 = document.querySelectorAll("#gas4");
let gas4_d = document.getElementById("gas4_data");

let gas5 = document.querySelectorAll("#gas5");
let gas5_d = document.getElementById("gas5_data");

let gas6 = document.querySelectorAll("#gas6");
let gas6_d = document.getElementById("gas6_data");

let gas7 = document.querySelectorAll("#gas7");
let gas7_d = document.getElementById("gas7_data");

let gas8 = document.querySelectorAll("#gas8");
let gas8_d = document.getElementById("gas8_data");

let aqi = document.getElementById("aqi");
let country = document.querySelectorAll("#country");
let description = document.getElementById("description");

function getLocation(){
    let lat = coordinates.latitude;
    let lon = coordinates.longitude;

    fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=bbd672373a57758125b5a2c935617694`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            country[0].innerHTML = data[0].name;
            country[1].innerHTML = data[0].name;
        })
}

getLocation();

function getInfo(){
    let lat = coordinates.latitude;
    let lon = coordinates.longitude;

    
    fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=bbd672373a57758125b5a2c935617694`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            let obj = data.list[0].components;

            let aq = data.list[0].main.aqi;
            aqi.textContent = aq;

            if(aq == 1){
                description.textContent = "Good Air Quality";
            }else if(aq == 2){
                description.textContent = "Fair Air Quality";
            }else if(aq == 3){
                description.textContent = "Moderate Air Quality";
            }else if(aq == 4){
                description.textContent = "Poor Air Quality";
            }else if(aq == 5){
                description.textContent = "Very Poor Air Quality";
            }

            for(let i = 0; i < gas1.length; i++){
                gas1[i].innerHTML = "Carbon Monoxide(CO)";
            }
            gas1_d.textContent = obj.co;

            for(let i = 0; i < gas2.length; i++){
                gas2[i].textContent = "Ammonia(NH3)";
            }
            gas2_d.textContent = obj.nh3;

            for(let i = 0; i < gas3.length; i++){
               gas3[i].textContent = "Nitrogen Monoxide(NO)";
            }
            gas3_d.textContent = obj.no;

            for(let i = 0; i < gas4.length; i++){
                gas4[i].textContent = "Nitrogen Dioxide(NO2)";
            }
            gas4_d.textContent = obj.no2;
            
            for(let i = 0; i < gas5.length; i++){
                gas5[i].textContent = "Ozone(O3)";
            }
            gas5_d.textContent = obj.o3;

            for(let i = 0; i < gas6.length; i++){
                gas6[i].textContent = "Fine Particles Matter(PM2.5)";
            }
            gas6_d.textContent = obj.pm2_5;

            for(let i = 0; i < gas7.length; i++){
                gas7[i].textContent = "Coarse Particulate Matter(PM10)";
            }
            gas7_d.textContent = obj.pm10;

            for(let i = 0; i < gas8.length; i++){
                gas8[i].textContent = "Sulphur Dioxide(SO2)";
            }
            gas8_d.textContent = obj.so2;
        });
}

getInfo();

alert("Here You will get further Information!! To search more GO Back :)");
