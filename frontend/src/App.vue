<template>
  <div id="app">
    <nav class="bg-white shadow-md py-4">
      <div class="container mx-auto flex justify-center">
        <router-link to="/login" class="mx-4 text-indigo-600 hover:text-indigo-800">Login</router-link>
        <router-link to="/register" class="mx-4 text-indigo-600 hover:text-indigo-800">Register</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>
