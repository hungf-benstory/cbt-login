<script setup>
import { NMessageProvider } from 'naive-ui';
import { RouterView } from 'vue-router';
import { NLoadingBarProvider } from 'naive-ui';
</script>

<template>
  <n-message-provider placement="top">
    <div class="wrapper">
      <div class="main">
        <n-loading-bar-provider>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </n-loading-bar-provider>
      </div>
    </div>
  </n-message-provider>
</template>


<style>
.wrapper {
  display: flex;
  flex-direction: row;
}
.main {
  flex: 1;
}
.loading-bar-style {
  height:20px
}
</style>