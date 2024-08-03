<template>
  <div>
    <UserCard
      v-for="user in users"
      :key="user.id"
      :user="user"
      @like="likeUser"
      @dislike="dislikeUser"
    />
  </div>
</template>

<script>
import UserCard from '../components/UserCard.vue';
import { useToast } from 'vue-toastification';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Discover',
  components: {
    UserCard,
  },
  data() {
    return {
      users: [],
      userId: 1, // Replace with actual user ID logic
      socket: null,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:3000/api/users/nearby');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.users = await response.json();
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    },
    async likeUser(likedUserId) {
      try {
        await fetch('http://localhost:3000/api/interactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fromUserId: this.userId, toUserId: likedUserId, type: 'LIKE' }),
        });
        this.toast.success('You liked the user!', { 
          style: { background: 'green', color: 'white' } 
        });
      } catch (error) {
        console.error('Failed to like user:', error);
        this.toast.error('Failed to like the user.');
      }
    },
    async dislikeUser(dislikedUserId) {
      try {
        await fetch('http://localhost:3000/api/interactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fromUserId: this.userId, toUserId: dislikedUserId, type: 'DISLIKE' }),
        });
        this.toast.error('You disliked the user!', { 
          style: { background: 'red', color: 'white' } 
        });
      } catch (error) {
        console.error('Failed to dislike user:', error);
        this.toast.error('Failed to dislike the user.');
      }
    },
    handleSocketMessage(event) {
      const message = JSON.parse(event.data);
      if (message.type === 'LIKE') {
        this.toast.success(`${message.userName} liked you`, { 
          style: { background: 'green', color: 'white' } 
        });
      } else if (message.type === 'DISLIKE') {
        this.toast.error(`${message.userName} disliked you`, { 
          style: { background: 'red', color: 'white' } 
        });
      }
    },
  },
  created() {
    this.fetchUsers();

    // Establish WebSocket connection
    this.socket = new WebSocket(`ws://localhost:3000/websocket?userId=${this.userId}`);
    this.socket.onopen = () => {
      console.log('WebSocket connection established');
    };
    this.socket.onmessage = this.handleSocketMessage;
    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.close();
    }
  },
};
</script>

<style scoped>
.user-card {
  margin-bottom: 20px;
}
</style>
