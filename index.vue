<template>
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-4">Welcome to Nuxt 3 Video/Audio Call App</h1>
      <video ref="localVideo" class="w-1/2 mb-4 border" autoplay></video>
      <video ref="remoteVideo" class="w-1/2 mb-4 border" autoplay></video>
      <div>
        <input type="text" v-model="remotePeerId" placeholder="Enter remote peer ID" class="border p-2 mb-2"/>
        <button @click="makeCall(remotePeerId)" class="bg-blue-500 text-white px-4 py-2 rounded">Call</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Peer from 'peerjs';
  
  const localVideo = ref(null);
  const remoteVideo = ref(null);
  const remotePeerId = ref('');
  const peer = ref(null);
  let localStream = null;
  
  const getMedia = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.value.srcObject = localStream;
  };
  
  const makeCall = (remotePeerId) => {
    const call = peer.value.call(remotePeerId, localStream);
    call.on('stream', (remoteStream) => {
      remoteVideo.value.srcObject = remoteStream;
    });
  };
  
  onMounted(() => {
    peer.value = new Peer();
  
    getMedia();
  
    peer.value.on('call', (call) => {
      call.answer(localStream);
      call.on('stream', (remoteStream) => {
        remoteVideo.value.srcObject = remoteStream;
      });
    });
  });
  </script>
  
  <style scoped>
  video {
    max-width: 100%;
    height: auto;
  }
  </style>
  