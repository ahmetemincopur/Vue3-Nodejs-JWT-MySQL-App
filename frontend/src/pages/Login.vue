<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email:</label>
          <input type="email" v-model="email" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password:</label>
          <input type="password" v-model="password" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
        </div>
        <button type="submit" class="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { useToast } from 'vue-toastification';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      const credentials = {
        email: this.email,
        password: this.password,
      };

      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Login response data:', data); // Log the response data

          if (data && data.user && data.user.id) {
            localStorage.setItem('token', data.token);
            console.log('Dispatching login action with userId:', data.user.id);
            await this.login(data.user.id); // Dispatch login action with user ID
            console.log('Navigating to /discover');
            this.$router.push('/discover');
          } else {
            throw new Error('Invalid response structure');
          }
        } else {
          const error = await response.json();
          console.error('Error:', error);
          this.toast.error(error.message || 'Login failed!');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        this.toast.error(error.message || 'Fetch error!');
      }
    },
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
};
</script>
