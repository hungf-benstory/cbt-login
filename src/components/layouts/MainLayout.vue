<script setup>
import { NLayout, NLayoutContent } from 'naive-ui';
import NavBar from '../NavBar.vue';
</script>

<template>
    <div>
        <n-layout>
            <NavBar />
            <n-layout-content>
                <router-view />
            </n-layout-content>
        </n-layout>
    </div>
</template>
<style scoped>
.n-layout {
    width: 100%;
}

.n-layout-content {
    max-width: 1200px;
    margin: 10px auto;
}
</style>