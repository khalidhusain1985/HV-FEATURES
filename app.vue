<template>
  <div class="p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
    <!-- Recording Box -->
    <div class="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
      <div class="flex justify-center items-center">
        <button
          @click="startRecording"
          v-if="!isRecording"
          class="btn bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out animate-pulse"
        >
          Start Recording
        </button>
        <button
          @click="stopRecording"
          v-if="isRecording"
          class="btn bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300 ease-in-out animate-bounce"
        >
          Stop Recording
        </button>
      </div>
    </div>

    <!-- Audio Player -->
    <div v-if="audioUrl" class="mt-6 w-full max-w-md">
      <div
        class="audio-player bg-blue-100 p-4 rounded-lg shadow-md flex items-center justify-between"
      >
        <audio :src="audioUrl" controls class="w-full"></audio>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="mt-4">
      <p class="text-green-600 animate-fade-in">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isRecording = ref(false)
const audioUrl = ref(null)
const successMessage = ref('')
let mediaRecorder = null
let audioChunks = []

const startRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  mediaRecorder = new MediaRecorder(stream)

  mediaRecorder.ondataavailable = (e) => {
    audioChunks.push(e.data)
  }

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
    audioUrl.value = URL.createObjectURL(audioBlob)
    sendAudioMessage(audioBlob)
  }

  mediaRecorder.start()
  isRecording.value = true
}

const stopRecording = () => {
  mediaRecorder.stop()
  isRecording.value = false
}

const sendAudioMessage = async (audioBlob) => {
  const formData = new FormData()
  formData.append('audio', audioBlob)

  try {
    await fetch('/api/upload-audio', {
      method: 'POST',
      body: formData,
    })
    successMessage.value = 'Audio message sent successfully'
    setTimeout(() => (successMessage.value = ''), 3000) // Fade-out success message
  } catch (error) {
    console.error('Error uploading audio', error)
  }
}
</script>

<style>
/* Custom animation for success message */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s forwards, fadeOut 2.5s 2s forwards;
}
</style>