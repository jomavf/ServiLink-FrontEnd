<template>
  <div>
    <br>
    <div><h1 style="margin-left:20px">Location</h1></div>
    <br>
    <gmap-map
      :center="center"
      :zoom="15"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  props:['position'],
  name: "GoogleMap",
  data() {
    return {
      center: { lat: -12.046374, lng: -77.042793 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },
  mounted() {
    this.geolocate()
    this.addMarker()
  },
  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place
    },
    addMarker() {
      console.log("add marker pressed")
      if (this.currentPlace) {
        if(this.markers.length >= 1){
          this.markers.pop()
        }
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
        this.position.lat = marker.lat
        this.position.lng = marker.lng
        console.log(`lat->${this.position.lat} lng->${this.position.lng}`)
      }
    },
    geolocate: function() {
        this.center = this.position
        this.markers.push({ position: this.position})
    }
  }
}
</script>