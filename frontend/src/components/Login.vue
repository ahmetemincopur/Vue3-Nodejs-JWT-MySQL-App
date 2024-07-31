<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="email" class="block text-gray-700">Email:</label>
            <input type="email" v-model="email" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-gray-700">Password:</label>
            <input type="password" v-model="password" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
          </div>
          <button type="submit" class="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200">Login</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  // eslint-disable-next-line vue/multi-word-component-names
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Login',
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      login() {
        // Handle login logic here
        console.log('Email:', this.email);
        console.log('Password:', this.password);
      }
    }
  };
  </script>
  