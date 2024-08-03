<template>
    <div class="bg-white p-6 rounded-lg shadow-lg mb-4 max-w-md mx-auto">
      <div class="text-center mb-4">
        <p class="text-xl font-bold">{{ user.name }}</p>
      </div>
      <div class="flex items-center justify-center mb-4">
        <button v-if="hasImages" @click="prevImage" class="text-xl">←</button>
        <img v-if="hasImages" :src="currentImage" alt="User Image" class="w-48 h-48 mx-4 object-cover rounded-lg" />
        <p v-else>No images available</p>
        <button v-if="hasImages" @click="nextImage" class="text-xl">→</button>
      </div>
      <div class="flex flex-col space-y-2">
        <button @click="$emit('like', user.id)" class="bg-green-500 text-white p-2 rounded">Like</button>
        <button @click="$emit('dislike', user.id)" class="bg-red-500 text-white p-2 rounded">Dislike</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserCard',
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        currentImageIndex: 0,
      };
    },
    computed: {
      currentImage() {
        return this.user.images[this.currentImageIndex];
      },
      hasImages() {
        return this.user.images && this.user.images.length > 0;
      },
    },
    methods: {
      nextImage() {
        if (this.currentImageIndex < this.user.images.length - 1) {
          this.currentImageIndex++;
        } else {
          this.currentImageIndex = 0;
        }
      },
      prevImage() {
        if (this.currentImageIndex > 0) {
          this.currentImageIndex--;
        } else {
          this.currentImageIndex = this.user.images.length - 1;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  