<script setup>
import { NButton, NResult } from 'naive-ui';
import { useRouter } from 'vue-router'

const router = useRouter()

const goHomePage = () => {
  return router.replace("/");
}
</script>



<template>
  <n-result style="padding:10%" status="404" title="404 Not Found" description="You know life is always ridiculous.">
    <template #footer>
      <n-button type="error" @click="goHomePage()"> Go to Home
      </n-button>
    </template>
  </n-result>
</template>