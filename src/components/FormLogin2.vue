<template>
    <div class="login-container">
      <div class="login-header">
        <h2 class="login-title">Sign in to your account</h2>
        <p class="login-subtitle">
          Or
          <n-link class="create-account-link" href="#">
            create an account
          </n-link>
        </p>
      </div>
  
      <n-card class="login-card">
        <n-form class="login-form" @submit="handleSubmit">
          <n-form-item label="Email address">
            <n-input
              v-model="email"
              type="email"
              placeholder="Enter your email address"
              required
            />
          </n-form-item>
  
          <n-form-item label="Password">
            <n-input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </n-form-item>
  
          <div class="login-options">
            <n-checkbox v-model="rememberMe">Remember me</n-checkbox>
            <n-link href="#" class="forgot-password-link">
              Forgot your password?
            </n-link>
          </div>
  
          <n-button type="primary" block>Sign in</n-button>
        </n-form>
  
        <div class="divider">
          <span>Or continue with</span>
        </div>
  
        <div class="social-login">
          <n-button class="social-btn" text>
            <img class="social-icon" src="https://www.svgrepo.com/show/512120/facebook-176.svg" alt="Facebook" />
          </n-button>
          <n-button class="social-btn" text>
            <img class="social-icon" src="https://www.svgrepo.com/show/513008/twitter-154.svg" alt="Twitter" />
          </n-button>
          <n-button class="social-btn" text>
            <img class="social-icon" src="https://www.svgrepo.com/show/506498/google.svg" alt="Google" />
          </n-button>
        </div>
      </n-card>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useMessage, NCard, NForm, NFormItem, NInput, NButton, NImage, NText, NGrid, NGi, NIcon,NCheckbox } from "naive-ui";
  const email = ref('')
  const password = ref('')
  const rememberMe = ref(false)
  
  const handleSubmit = () => {
    console.log({
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value
    })
  }
  </script>
  
  <style>
  .login-container {
    min-height: 100vh;
    background-color: #f7fafc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 12px 24px;
  }
  .login-header {
    text-align: center;
  }
  .login-title {
    font-size: 24px;
    font-weight: 700;
    color: #1a202c;
    margin-top: 24px;
  }
  .login-subtitle {
    font-size: 14px;
    color: #718096;
  }
  .create-account-link {
    color: #3182ce;
  }
  .login-card {
    margin-top: 24px;
    padding: 32px 24px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  .login-form {
    display: flex;
    flex-direction: column;
  }
  .login-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
  }
  .forgot-password-link {
    color: #3182ce;
  }
  .divider {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 24px 0;
  }
  .divider::before,
  .divider::after {
    content: '';
    flex-grow: 1;
    height: 1px;
    background-color: #e2e8f0;
  }
  .divider::before {
    margin-right: 8px;
  }
  .divider::after {
    margin-left: 8px;
  }
  .social-login {
    display: flex;
    justify-content: space-around;
  }
  .social-btn {
    padding: 0;
  }
  .social-icon {
    width: 24px;
    height: 24px;
  }
  </style>
  