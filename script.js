let myLat = 18.9641443;
let myLong = 28.6840156;

let coords2 = [myLat, myLong];

const map = L.map("map").setView(coords2, 15);

L.tileLayer("http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
}).addTo(map);

/* Going to the user location */

const goToLoc = function (ipAdd) {
  const apiKey = "at_rbpIkXs4GpBQfjQkGlHgNSREhP9hc";

  const url_2 =
    "https://geo.ipify.org/api/v1?apiKey=" + apiKey + "&ipAddress=" + ipAdd;

  const request = new XMLHttpRequest();

  request.open("GET", url_2);

  request.send();

  request.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);
    const coords = [data.location.lat, data.location.lng];

    map.setView(coords, 15, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    var bIcon = new L.Icon({
      iconUrl: "images/icon-location.svg",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [46, 56],
      shadowSize: [41, 41],
    });

    L.marker(coords, { icon: bIcon }).addTo(map);

    document.querySelector(".data--ip").textContent = data.ip;
    document.querySelector(".data--loc").textContent = `${
      (data.location.city, data.location.region)
    }`;
    document.querySelector(
      ".data--time"
    ).textContent = `UTC${data.location.timezone}`;
    document.querySelector(".data--isp").textContent = data.isp;
  });
};

let url = "https://api.ipify.org?format=json";

const request = new XMLHttpRequest();

request.open("GET", url);

request.send();

request.addEventListener("load", function () {
  const data = JSON.parse(this.responseText);
  const ip = data.ip;

  goToLoc(ip);
});

const submit = document.querySelector(".submit");

submit.addEventListener("click", function () {
  const ipAdd = document.querySelector(".ip").value;
  goToLoc(ipAdd);
});

document.querySelector(".ip").addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    const ipAdd = document.querySelector(".ip").value;
    goToLoc(ipAdd);
  }
});
