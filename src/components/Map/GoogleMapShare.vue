<template>
  <div>
    <div>
      <h2
      >Enter your location below</h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add a location</button>
      </label>
      <br/>

    </div>
    <br>
    <gmap-map ref="mapRef"
      :center="center"
      :zoom="10"
      style="width:100%;  height: 400px;"
    >
      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
        <div v-html="infoContent"></div>
      </gmap-info-window>
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        @click="toggleInfoWindow(m,i)"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import {gmapApi} from 'vue2-google-maps'
export default {
  name: "GoogleMap",
  data() {
    return {
      center: { lat: -12.046374, lng: -77.042793 },
      markers: [],
      places: [],
      currentPlace: null,
      map:null,
      infoContent: '',
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },
  mounted() {
    this.geolocate()
    this.getAllServices()
    this.$refs.mapRef.$mapPromise.then((map) => {
      this.map=map
    })
  },
  computed:{
    google: gmapApi,
    services(){
      return this.$store.getters.loadedServices
    }
  },
  methods: {
    customText(id,title,description,urlToImage,price){
      return `
        <div style="">
          <h1>${title}</h1>
          <p>${description}</p>
          <div><img src="${urlToImage}" style="height:60px;border: 1px solid black"></div>
          <h2>$ ${price}</h2>
          <a href="/services/${id}"><h3>Go to the service>></h3></a>
        </div>
      `
    },
    centerMap(marker){
      this.center=marker.position;
    },
    getAllServices(){
      for(let i=0;i<this.services.length;i++){
        const newPosition = {
          id:this.services[i]._id,
          description:this.services[i].description,
          urlToImage:this.services[i].urlToImage,
          title:this.services[i].title,
          price:this.services[i].price,
          infoText:this.customText(this.services[i]._id,this.services[i].title,this.services[i].description,this.services[i].urlToImage,this.services[i].price),
          position: { lat:Number(this.services[i].position.lat) , lng:Number(this.services[i].position.lng) }
        }
        this.markers.push(newPosition)
      }
      console.log(this.markers)
    },
    setPlace(place) {
      this.currentPlace = place
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    },
    toggleInfoWindow: function(marker, idx) {
      // this.center=marker.position
      this.infoWindowPos = marker.position;
      this.infoContent = marker.infoText;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;

      }
    }
  }
}
</script>


