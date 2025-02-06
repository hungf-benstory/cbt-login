<script setup>
import { NDataTable, NButton, useMessage, useLoadingBar } from 'naive-ui';
import { ref, h, onMounted } from 'vue';

import { certificatesApi } from "../services/api";
const certificatesData = ref([]);
const isLoading = ref(false);
const loadingBar = useLoadingBar();

// Test API call with token
const getCertificatesData = async () => {
  try {
    isLoading.value = true;
    loadingBar.start(); 
    const res = await certificatesApi.getCertificates();
    certificatesData.value = res.data.data;
    loadingBar.finish();
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
    loadingBar.finish();
  }
};

onMounted(() => {
  getCertificatesData();
});

const message = useMessage();

const play = (row) => {
  message.info(`Play ${row.title}`);
};

const columns = [
  {
    title: "No",
    key: "no"
  },
  {
    title: "Title",
    key: "title"
  },
  {
    title: "Length",
    key: "length"
  },
  {
    title: "Action",
    key: "actions",
    render: (row) => h(
      NButton,
      {
        strong: true,
        tertiary: true,
        size: "small",
        onClick: () => play(row)
      },
      { default: () => "Play" }
    )
  }
];

const pagination = false;
</script>

<template>
  <h1>Test call api with token</h1>
  <n-data-table :columns="columns" :data="certificatesData" :pagination="pagination" :bordered="false" />
</template>
