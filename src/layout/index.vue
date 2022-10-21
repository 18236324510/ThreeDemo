<script setup lang="ts"></script>

<template>
  <div id="layout">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot name="main"></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
    <div class="overlay">
      <slot name="overlay"> overlay </slot>
    </div>
  </div>
</template>

<style scoped lang="less">
#layout {
  width: 100%;
  height: 100%;
  position: relative;
  .overlay {
    position: absolute;
  }
}
</style>
