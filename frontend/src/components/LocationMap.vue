<template>
  <div id="map" style="height: 400px; width: 100%;"></div>
</template>

<script>
import L from 'leaflet';

export default {
  name: 'LocationMap',
  props: {
    center: {
      type: Array,
      default: () => [51.505, -0.09]
    },
    zoom: {
      type: Number,
      default: 13
    }
  },
  mounted() {
    this.map = L.map('map').setView(this.center, this.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.marker = L.marker(this.center, {
      draggable: true
    }).addTo(this.map);

    this.map.on('click', this.onMapClick);
    this.marker.on('dragend', this.onMarkerDragEnd);
  },
  methods: {
    onMapClick(e) {
      this.marker.setLatLng(e.latlng);
      this.updateLocation(e.latlng);
    },
    onMarkerDragEnd(e) {
      this.updateLocation(e.target.getLatLng());
    },
    updateLocation(latlng) {
      this.$emit('update:location', [latlng.lat, latlng.lng]);
    }
  }
};
</script>

<style>
#map {
  height: 100%;
}
</style>
