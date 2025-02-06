<script setup>
import { NButton } from 'naive-ui';
import {useRouter} from 'vue-router'

const router = useRouter()

const goHomePage = () => {
    return router.replace("/"); 
}
  </script>

<template>
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Got fooled !!!</p>
      <n-button type="error" @click="goHomePage()">
      Go to Home
    </n-button>
    </div>
  </template>
  
  <style scoped>
  .not-found {
    text-align: center;
    padding: 50px;
  }
  
  .not-found h1 {
    font-size: 2rem;
    color: red;
  }
  
  .not-found p {
    color: #888;
  }
  </style>
  