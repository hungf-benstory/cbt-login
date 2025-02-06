<script setup>
import { NLayout, NLayoutContent } from 'naive-ui';
</script>
<template>
    <div>
        <n-layout>
            <n-layout-content>
                <router-view />
            </n-layout-content>
        </n-layout>
    </div>
</template>
<style scoped></style>