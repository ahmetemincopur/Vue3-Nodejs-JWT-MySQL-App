<template>
  <div>
    <nav class="bg-gray-800 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-white font-bold">MyApp</div>
        <div>
          <router-link v-if="!isAuthenticated" to="/login" class="text-white mr-4">Login</router-link>
          <router-link v-if="!isAuthenticated" to="/register" class="text-white mr-4">Register</router-link>
          <button v-if="isAuthenticated" @click="handleLogout" class="text-white">Logout</button>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout();
      this.$router.push('/login');
    }
  },
};
</script>
