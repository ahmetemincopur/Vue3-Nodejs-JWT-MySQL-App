<template>
    <div class="bg-white p-6 rounded-lg shadow-lg mb-4 max-w-md mx-auto">
      <h3 class="text-xl font-bold mb-2">Likes</h3>
      <ul class="mb-4">
        <li v-for="like in likes" :key="like.id" class="p-2 border-b border-gray-200">{{ like.fromUser.name }}</li>
      </ul>
      <h3 class="text-xl font-bold mb-2">Dislikes</h3>
      <ul>
        <li v-for="dislike in dislikes" :key="dislike.id" class="p-2 border-b border-gray-200">{{ dislike.fromUser.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LikesDislikes',
    props: {
      userId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        likes: [],
        dislikes: []
      };
    },
    async created() {
      await this.fetchLikesDislikes();
    },
    methods: {
      async fetchLikesDislikes() {
        try {
          const response = await fetch(`http://localhost:3000/api/users/${this.userId}/likes-dislikes`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this.likes = data.likes;
          this.dislikes = data.dislikes;
        } catch (error) {
          console.error('Failed to fetch likes and dislikes:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  