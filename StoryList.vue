<template>
    <div>
      <h1>Your Stories</h1>
      <ul>
        <li v-for="story in stories" :key="story.id">
          <p>{{ story.content }}</p>
          <!-- Display story image if any -->
          <img v-if="story.image" :src="story.image" alt="Story Image" />
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const stories = ref([]);
  
  const fetchStories = async () => {
    try {
      const response = await axios.get('/api/get-stories');
      stories.value = response.data;
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };
  
  onMounted(() => {
    fetchStories();
  });
  </script>
  