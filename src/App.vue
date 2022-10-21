<script setup lang="ts">
import Layout from "@/layout/index.vue";
import {RouterView} from 'vue-router'
import FloatMenu from '@/components/FloatMenu/index.vue'
</script>

<template>
  <Layout>
    <template #main>
      <RouterView></RouterView>
    </template>
    <template #overlay>
      <FloatMenu></FloatMenu>
    </template>
  </Layout>
</template>

<style scoped></style>
