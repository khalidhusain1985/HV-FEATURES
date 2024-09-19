<template>
    <div class="card">
      <div class="card-header">
        <div class="left-section">
          <img src="@/assets/images/profile.png" alt="Profile" class="profile-img" />
          <div class="user-info">
            <span class="username">Anupam Raj</span>
            <span class="post-time">A Day Ago</span>
          </div>
        </div>
        <button class="option-icon">
          <img src="@/assets/images/vector.png" alt="Options" height="18" width="5" />
        </button>
      </div>
  
      <img src="@/assets/images/pomogranade.png" alt="Pomegranate" class="card-img" />
  
      <div class="card-actions">
        <div class="class-icons">
          <button @click="toggleLike" :class="{ liked: isLiked }" class="action-button">
            <span class="material-icons">{{ isLiked ? 'favorite' : 'favorite_border' }}</span>
            <span>{{ likes }}</span>
          </button>
          <button @click="toggleComments" class="action-button">
            <span class="material-icons">chat_bubble_outline</span>
            <span>40</span>
          </button>
          <button class="share-button">
            <img src="@/assets/images/share.png" alt="Share" height="22" width="22" />
            <span>20</span>
          </button>
        </div>
        <button class="action-button">
          <span class="material-icons">send</span>
        </button>
      </div>
  
      <!-- Comment Section -->
      <div v-if="showComments" class="comments-section">
        <h4>Comments (12)</h4>
        <div class="comment-list">
          <!-- Comment 1 -->
          <div class="comment">
            <img src="@/assets/images/patient4.png" alt="Michelle's Profile" class="comment-profile-img" />
            <div class="comment-content">
              <div class="comment-header">
                <span class="username">Michelle Fairfax</span>
                <span class="comment-date">Dec 6, 2023</span>
              </div>
              <p class="comment-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <button class="reply-button">
                <span class="material-icons">reply</span>
                Reply
              </button>
  
              <!-- Reply Section -->
              <div class="reply-section">
                <div class="comment reply-comment">
                    <img src="@/assets/images/profile.png" alt="Michelle's Profile" class="comment-profile-img" />
                  <div class="comment-content">
                    <div class="comment-header">
                      <span class="username">Lena</span>
                      <span class="comment-date">Dec 7, 2023</span>
                    </div>
                    <p class="comment-text">This is a reply to the original comment.</p>
                    <button class="reply-button">
                      <span class="material-icons">reply</span>
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Comment 2 -->
          <div class="comment">
            <img src="@/assets/images/patient7.png" alt="Gina's Profile" class="comment-profile-img" />
            <div class="comment-content">
              <div class="comment-header">
                <span class="username">Gina Moore</span>
                <span class="comment-date">Dec 6, 2023</span>
              </div>
              <p class="comment-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <button class="reply-button">
                <span class="material-icons">reply</span>
                Reply
              </button>
            </div>
          </div>
        </div>
  
        <div class="new-comment">
          <img src="@/assets/images/profile.png" alt="Your Profile" class="comment-profile-img" />
          <input type="text" placeholder="Add a comment..." />
          <button class="add-comment-btn">Post</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const likes = ref(80)
  const isLiked = ref(false)
  const showComments = ref(false)
  
  function toggleLike() {
    isLiked.value = !isLiked.value
    likes.value = isLiked.value ? likes.value + 1 : likes.value - 1
  }
  
  function toggleComments() {
    showComments.value = !showComments.value
  }
  </script>
  
  <style scoped>
  .card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    margin: 10px;
  }
  
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
  }
  
  .card-header .left-section {
    display: flex;
    align-items: center;
  }
  
  .profile-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 12px;
  }
  
  .class-icons {
    display: flex;
  }
  
  .user-info {
    display: flex;
    flex-direction: column;
  }
  
  .share-button {
    background-color: white;
    border: none;
  }
  
  .option-icon {
    background: white;
    border: none;
  }
  
  .username {
    font-weight: bold;
    font-family: Poppins;
  }
  
  .post-time {
    font-size: 0.8em;
    color: #65676b;
  }
  
  .card-img {
    width: 100%;
    height: auto;
  }
  
  .card-actions {
    display: flex;
    justify-content: space-between;
    padding: 12px;
  }
  
  .action-button {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    color: #65676b;
  }
  
  .action-button:hover {
    color: #1877f2;
  }
  
  .action-button .material-icons {
    font-size: 20px;
    margin-right: 4px;
  }
  
  .liked {
    color: #ed4956;
  }
  
  .comments-section {
    padding: 12px;
    border-top: 1px solid #e0e0e0;
  }
  
  h4 {
    margin: 0 0 10px 0;
    font-size: 16px;
  }
  
  .comment-list {
    max-height: 200px;
    overflow-y: auto;
    margin-bottom: 10px;
  }
  
  .comment {
    display: flex;
    align-items: flex-start;
    margin-bottom: 12px;
  }
  
  .comment-profile-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 12px;
  }
  
  .comment-content {
    flex: 1;
  }
  
  .comment-header {
    display: flex;
    flex-direction: column;
  }
  
  .comment-header .username {
    font-weight: bold;
  }
  
  .comment-date {
    font-size: 0.8em;
    color: #65676b;
  }
  
  .comment-text {
    margin: 4px 0;
    font-size: 14px;
    color: #333;
  }
  
  .reply-button {
    background: none;
    border: none;
    color: #132d4e;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
  }
  
  .reply-button .material-icons {
    font-size: 18px;
  }
  
  .reply-button:hover {
    color: #155db2;
  }
  
  .reply-section {
    margin-left: 50px;
    margin-top: 10px;
  }
  
  .reply-comment {
    margin-top: 5px;
  }
  
  .new-comment {
    display: flex;
    align-items: center;
  }
  
  .new-comment input {
    flex: 1;
    padding: 8px;
    border-radius: 20px;
    border: 1px solid #e0e0e0;
    outline: none;
    margin-right: 8px;
  }
  
  .new-comment button {
    background-color: #1877f2;
    border: none;
    color: white;
    padding: 8px 12px;
    border-radius: 20px;
    cursor: pointer;
  }
  
  .new-comment button:hover {
    background-color: #155db2;
  }
  
  /* Responsive Design */
  @media (max-width: 600px) {
    .card {
      max-width: 100%;
      margin: 5px;
    }
  
    .card-header, .card-actions, .comments-section {
      padding: 8px;
    }
  
    .action-button .material-icons {
      font-size: 18px;
      margin-right: 2px;
    }
  
    .class-icons button span {
      display: none;
    }
  
    .username {
      font-size: 0.9em;
    }
  
    .post-time {
      font-size: 0.7em;
    }
  
    .comment-profile-img {
      width: 30px;
      height: 30px;
    }
  
    .comment-text, .comment-date {
      font-size: 0.8em;
    }
  }
  </style>
  