<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
      <form @submit.prevent="register" enctype="multipart/form-data">
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Name:</label>
          <input type="text" v-model="name" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email:</label>
          <input type="email" v-model="email" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password:</label>
          <input type="password" v-model="password" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
        </div>
        <div class="mb-4">
          <label for="avatars" class="block text-gray-700">Avatars:</label>
          <input type="file" @change="handleFileUpload" multiple class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
        </div>
        <div class="mb-4">
          <label for="bio" class="block text-gray-700">Bio:</label>
          <textarea v-model="bio" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"></textarea>
        </div>
        <div class="mb-4">
          <label for="location" class="block text-gray-700">Location:</label>
          <location-map @update:location="updateLocation" :center="location"></location-map>
        </div>
        <button type="submit" class="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import LocationMap from '../components/LocationMap.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Register',
  components: {
    LocationMap,
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      avatars: [],
      bio: '',
      location: [51.505, -0.09], // Default location
    };
  },
  methods: {
    handleFileUpload(event) {
      this.avatars = Array.from(event.target.files);
    },
    updateLocation(newLocation) {
      this.location = newLocation;
    },
    async register() {
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('email', this.email);
      formData.append('password', this.password);
      this.avatars.forEach((file) => {
        formData.append('avatars', file);
      });
      formData.append('bio', this.bio);
      formData.append('location', JSON.stringify(this.location));

      try {
        const response = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          this.$router.push('/discover');
        } else {
          const error = await response.json();
          console.error('Error:', error);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
  }
};
</script>

<style>
@import 'leaflet/dist/leaflet.css';
</style>
