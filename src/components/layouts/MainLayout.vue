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

<style scoped></style>