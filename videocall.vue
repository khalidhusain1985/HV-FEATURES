<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Video/Audio Call</h1>
    
    <!-- Display local and remote videos -->
    <div class="flex space-x-4">
      <video ref="localVideo" class="w-1/2 mb-4 border" autoplay muted></video>
      <video ref="remoteVideo" class="w-1/2 mb-4 border" autoplay></video>
    </div>
    
    <!-- Input to enter the peer ID for calling -->
    <div class="mt-4">
      <input 
        type="text" 
        v-model="remotePeerId" 
        placeholder="Enter remote peer ID" 
        class="border p-2 mb-2"
      />
      <button 
        @click="makeCall(remotePeerId)" 
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Call
      </button>
      <button 
        @click="endCall" 
        class="bg-red-500 text-white px-4 py-2 rounded ml-2"
        v-if="callActive"
      >
        End Call
      </button>
    </div>
    
    <!-- Display local peer ID -->
    <div class="mt-4">
      <p>Your Peer ID: {{ peerId }}</p>
      <p>Share this ID with the other peer to start the call.</p>
    </div>

    <!-- Incoming call modal -->
    <div v-if="incomingCall" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded shadow-lg">
        <p>Incoming call from {{ incomingCall.peer }}. Do you want to accept?</p>
        <button 
          @click="acceptCall" 
          class="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Accept
        </button>
        <button 
          @click="rejectCall" 
          class="bg-red-500 text-white px-4 py-2 rounded"
        >
          Reject
        </button>
      </div>
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
const peerId = ref('');  // This will hold the local Peer ID
let localStream = null;
let callInstance = null;  // Store the current call instance
const callActive = ref(false);  // Track if a call is active
const incomingCall = ref(null);  // Track the incoming call

const getMedia = async () => {
  // Get user media (audio and video)
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.value.srcObject = localStream;
};

const makeCall = (remotePeerId) => {
  // Call the remote peer with the entered peer ID
  callInstance = peer.value.call(remotePeerId, localStream);
  callActive.value = true;

  // Listen for the remote stream and set it to the remote video element
  callInstance.on('stream', (remoteStream) => {
    remoteVideo.value.srcObject = remoteStream;
  });
};

const acceptCall = () => {
  if (incomingCall.value) {
    // Accept the call and send the local stream
    incomingCall.value.answer(localStream);
    callActive.value = true;

    // Listen for the remote stream and set it to the remote video element
    incomingCall.value.on('stream', (remoteStream) => {
      remoteVideo.value.srcObject = remoteStream;
    });
    
    // Clear the incoming call state
    incomingCall.value = null;
  }
};

const rejectCall = () => {
  if (incomingCall.value) {
    // Reject the call
    incomingCall.value.close();
    incomingCall.value = null;
  }
};

const endCall = () => {
  // End the call and close the connection
  if (callInstance) {
    callInstance.close();
    callActive.value = false;
  }

  // Stop all media tracks in the local stream
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
  }

  // Clear the remote video stream
  remoteVideo.value.srcObject = null;
};

onMounted(() => {
  // Initialize the peer with a random ID
  peer.value = new Peer();

  // When the peer is open, get and display the peer ID
  peer.value.on('open', (id) => {
    peerId.value = id;  // Set the generated Peer ID
  });

  // Get local video/audio stream
  getMedia();

  // Listen for incoming calls
  peer.value.on('call', (call) => {
    incomingCall.value = call;  // Set the incoming call state to display the modal
  });
});
</script>

<style scoped>
video {
  max-width: 100%;
  height: auto;
}
</style>
w