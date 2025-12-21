import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
console.log("map.js loaded");
console.log("Start buttons found:", document.querySelectorAll(".start").length);

document.addEventListener("DOMContentLoaded", () => {
    const popupContainer = document.getElementById("popup-container");
    const closeBtn = document.getElementById("close");
    let map;

    let loggedIn = false;
    onAuthStateChanged(auth, (user) => {
        loggedIn = !!user;
    });

    document.querySelectorAll(".start").forEach(button => {
        button.addEventListener("click", () => {
            const mapContainer = document.getElementById("map");
            const loginMsg = document.getElementById("login-message");

            let marker;
            let circle;
            var greenIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            popupContainer.classList.add("open");

            loginMsg.style.display = "none";
            mapContainer.style.display = "none";

            if (loggedIn) {
                mapContainer.style.display = "block";
                loginMsg.style.display = "none";
                let latt, lang;

                if (button.id == "start-ef") {
                    [latt, lang] = [39.827321, -86.191092]
                }
                if (button.id == "start-ep") {
                    [latt, lang] = [39.740809, -86.128752]
                }
                if (button.id == "start-mc") {
                    [latt, lang] = [39.771991, -86.157072]
                }
                if (button.id == "start-mf") {
                    [latt, lang] = [39.880868, -86.310049]
                }
                if (button.id == "start-hp") {
                    [latt, lang] = [39.766771, -86.17135]
                }
                if (button.id == "start-hc") {
                    [latt, lang] = [39.768762, -86.158374]
                }

                if (!map) {
                    map = L.map("map").setView([latt, lang], 12);
                    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }).addTo(map);

                    var startEF = L.marker([39.827321, -86.191092]).bindPopup("<b>Easy Forest</b>").openPopup().addTo(map);
                    var startEP = L.marker([39.740809, -86.128752]).bindPopup("<b>Easy Park</b>").openPopup().addTo(map);
                    var startMC = L.marker([39.771991, -86.157072]).bindPopup("<b>Medium City</b>").openPopup().addTo(map);
                    var startMF = L.marker([39.880868, -86.310049]).bindPopup("<b>Medium Forest</b>").openPopup().addTo(map);
                    var startHP = L.marker([39.766771, -86.17135]).bindPopup("<b>Hard Park</b>").openPopup().addTo(map);
                    var startHC = L.marker([39.768762, -86.158374]).bindPopup("<b>Hard City</b>").openPopup().addTo(map);
                } else {
                    map.setView([latt, lang], 12);
                    map.invalidateSize();
                }
                //  adding location tracking functionality
                navigator.geolocation.watchPosition((position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const accuracy = position.coords.accuracy;

                    if (marker) {
                        map.removeLayer(marker);
                        map.removeLayer(circle);
                    }
                    marker = L.marker([lat, lng], {
                        icon: greenIcon
                    }).addTo(map);
                    circle = L.circle([lat, lng], {
                        radius: accuracy
                    }).addTo(map);
                }, (err) => {
                    if (err.code === 1) {
                        alert("Please allow location access to help guide you to your geocache!");
                    } else {
                        alert("Unable to get current location.");
                    }
                });
                setTimeout(() => {
                    map.invalidateSize();
                }, 0);
            } else {
                mapContainer.style.display = "none";
                loginMsg.style.display = "block";
            }
        });
    });

    closeBtn.addEventListener("click", () => {
        popupContainer.classList.remove("open");
    });
    
});