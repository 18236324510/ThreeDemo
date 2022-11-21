<script setup lang="ts">
import { ref, toRefs } from "vue";
import type { lightType } from "../type";
interface IProps {
  disabled: boolean;
}
const props = withDefaults(defineProps<IProps>(), {});
const { disabled } = toRefs(props);
const lightList = ref<lightType[]>(["PointLight"]);
const emit = defineEmits<{
  (e: "onLightChange", type: lightType[]): void;
}>();
</script>

<template>
  <div class="wrap">
    <p class="item">
      光源
      <el-checkbox-group
        v-model="lightList"
        @change="(value:lightType[])=>emit('onLightChange',value)"
        :disabled="disabled"
      >
        <el-checkbox label="PointLight">点光源</el-checkbox>
        <el-checkbox label="AmbientLight">环境光</el-checkbox>
        <el-checkbox label="DirectionalLight">平行光</el-checkbox>
      </el-checkbox-group>
    </p>
  </div>
</template>

<style scoped lang="less">
.wrap {
  width: 300px;
  position: fixed;
  top: 50px;
  right: 50px;
  padding: 20px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.7);
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
  }
}
</style>
