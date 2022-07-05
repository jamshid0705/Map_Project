'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
// const inputDuration = document.querySelector('.form__input--duration');
// const inputCadence = document.querySelector('.form__input--cadence');
// const inputElevation = document.querySelector('.form__input--elevation');
let map;
let startCoords;
let endCoords;
let markerEnd;
let markerStart;
let a = 0;
let masofa;
let event1;


class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-8);
  constructor(speed,markerStart,markerEnd) {
    this.speed = speed;
    this.markerStart = markerStart;
    this.markerEnd = markerEnd;
  }
  
}

class Yugurish extends Workout{
  type='running';
  rasm='🏃‍♂️';
    constructor(speed,markerStart,markerEnd){
      super(markerStart,markerEnd);
      this.speed=speed;
    }
}

class Velik extends Workout{
  type='cycling';
  rasm='🚴‍♀️';
  constructor(speed,markerStart,markerEnd){
    super(markerStart,markerEnd);
    this.speed=speed;

  }
}

class Mashina extends Workout{
  type='driving';
  rasm="🚗";
  constructor(speed,markerStart,markerEnd){
    super(markerStart,markerEnd);
    this.speed=speed;
  }
}

class App {
 mashq=[];
  constructor() {
    this.openMap();
    this.getLocal();
    // inputType.addEventListener('change',this.tanlash);
    window.addEventListener('keydown', this.showForm.bind(this));
  }
  openMap() {
    navigator.geolocation.getCurrentPosition(
      this.showMap.bind(this),
      function () {
        alert('Geolokatsiyani ola olmadik. Qayta urinib ko`rin');
      }
    );
  }

  // Marker chiqarish

  showMap(e) {
    event1=e
    map = L.map('map').setView([e.coords.latitude, e.coords.longitude], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      map
    );

    var greenIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    
    markerStart = L.marker([e.coords.latitude, e.coords.longitude], {
      draggable: true,
      icon: greenIcon,
    })
      .addTo(map)
      .bindPopup('Bordigan joyingiz')
      .openPopup();

      this.setLocal()
  }
   
  // markerlarni siljitish
  showForm() {
    a++;
    if (!(a == 1 || a == 2)) return;
    if (a == 1) {
      startCoords = markerStart.getLatLng();

      var greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      var redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      
      map.removeLayer(markerStart);
      let startMarker = L.marker([startCoords.lat, startCoords.lng], {
        draggable: false,
        icon:greenIcon,
      })
        .addTo(map)
        .bindPopup('Boradigan joy belgilandi')
        .openPopup();

      markerEnd = L.marker([startCoords.lat + 0.01, startCoords.lng + 0.01], {
        draggable: true,
        icon:redIcon,
      })
        .addTo(map)
        .bindPopup('Boshlangich joyni belgilang')
        .openPopup();
    }
    if (a == 2) {

      var redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      endCoords = markerEnd.getLatLng();
      map.removeLayer(markerEnd);
      let endMarker = L.marker([endCoords.lat, endCoords.lng], {
        draggable: false,
        icon:redIcon,
      })
        .addTo(map)
        .bindPopup('Boshlanish joyi belgilandi')
        .openPopup();

// Yo'l chizib berish

      this.drawMap();
// Formni ekranga chiqishi

      form.classList.remove('hidden');
      //inputDistance.focus();
      this.hiddenForm();
    }
  }

// Formni ekrandan o'chishi  

  hiddenForm() {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      this.creatObject();
      let speed = inputDistance.value;
      form.classList.add('hidden');
      
    }.bind(this));
  }
 // Formni ekranga chiqishi
  drawMap() {
    L.Routing.control({
      createMarker(){
        return null
      },
      waypoints: [
        L.latLng(startCoords.lat,startCoords.lng),
        L.latLng(endCoords.lat,endCoords.lng),
      ],
      draggableWaypoints: false,

      lineOptions:{
        styles:[{color:'red',opacity:1,weight:4,line: false}],
        
      },
     
    }).on('routesfound', function (e) {
      masofa=e.routes[0].summary.totalDistance
      console.log(e.routes[0].summary.totalDistance);
      // console.log(route.summary.totalDistance);
    }).addTo(map);
    
    
    
      
  }

  // formdan malumotlarni o'qib obekt yaratish
  creatObject(e){
    
    let saqla='';
    let kiruvchi=+inputDistance.value;
    let type=inputType.value;

    if(type==='running'){
      saqla=new Yugurish(kiruvchi,[startCoords.lat, startCoords.lng],[endCoords.lat, endCoords.lng]);
    }
    else if(type==='driving'){
      saqla=new Mashina(kiruvchi,[startCoords.lat, startCoords.lng],[endCoords.lat, endCoords.lng]);
    }

    else if(type==='cycling'){
      saqla=new Velik(kiruvchi,[startCoords.lat, startCoords.lng],[endCoords.lat, endCoords.lng]);
    }
    console.log(saqla)
    console.log(this.mashq);
   this.mashq.push(saqla);
   
   
   this.tanlash(saqla);
   this.setLocal();

  }

  // tanlash

  tanlash(saqla){
     
     console.log(saqla.id);
       let html=
       `<li class="workout workout--running" data-id="${saqla.id}">
       <h2 class="workout__title">Running on April 14</h2>
       <div class="workout__details">
         <span class="workout__icon">${saqla.rasm}</span>
         <span class="workout__value">${(masofa/1000).toFixed(1)}</span>
         <span class="workout__unit">km</span>
       </div>
       <div class="workout__details">
         <span class="workout__icon">⏱</span>
         <span class="workout__value">${(((masofa/1000).toFixed(1))/inputDistance.value)*60}</span>
         <span class="workout__unit">min</span>
       </div>
       <div class="workout__details">
         <span class="workout__icon">⚡️</span>
         <span class="workout__value">${inputDistance.value}</span>
         <span class="workout__unit">km/soat</span>
       </div>
  
     </li>`
     form.insertAdjacentHTML('afterend',html);
     
     
    
  }

  setLocal(){
    localStorage.setItem('mashqlar',JSON.stringify(this.mashq));
  }
  getLocal(){
    let bir=JSON.parse(localStorage.getItem("mashqlar"));
    if(!bir){
      return;
    }
    this.mashq=bir;
    this.mashq.forEach(val=>{
       this.tanlash(val)
    })
  }


  _moveCenter(e){
    let element=e.target.closest('.workout');
    if(!element) return;

    let elementId=element.getAttribute('data-id');

    let  objs=this.mashq.find(val=>{
      return val.id===elementId;
    })
    console.log(objs);

    map.setView(objs.markerStart,markerEnd,16,{
      animate:true,
      pan:{
        duration:2,
      },
    });
    // L.circle(objs.coords,{radius:100}).addTo(map);
 }

}

const magicMap = new App();
