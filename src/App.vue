<script setup lang="ts">
import Layout from "@/layout/index.vue";
import { RouterView } from "vue-router";
import FloatMenu from "@/components/FloatMenu/index.vue";
import type { IMenuList } from "@/components/FloatMenu/index.vue";
import { computed, ref } from "vue";
import { routes } from "@/router";

const includeList = computed(() => {
  let list = routes.filter((i) => i.meta?.keepAlive).map((i) => i.name);
  return list as [];
});
const menuList = computed(() => {
  let hasTabList = routes.filter((route) => route.meta && route.meta.tabs);
  let tabs: Array<IMenuList> = hasTabList.map((i) => {
    return {
      path: i.path,
      label: i.meta?.tabs?.label || "",
    };
  });
  return tabs;
});
</script>

<template>
  <Layout>
    <template #main>
      <router-view v-slot="{ Component }">
        <keep-alive :include="includeList">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </template>
    <template #overlay>
      <FloatMenu :menu-list="menuList"></FloatMenu>
    </template>
  </Layout>
</template>

<style scoped></style>
