<script setup lang="ts">
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { ref } from "vue";
import type { SizeType } from "../../type";
const autoPlay = ref<boolean>(false);
const emit = defineEmits<{
  (e: "onSizeChange", type: SizeType, value: "inc" | "dec"): void;
  (e: "onPlayStatusChange", status: boolean): void;
}>();

const handleStatusChange = (v: any) => {
  console.log(v);
};
</script>

<template>
  <div class="wrap">
    <p class="item">
      宽度：
      <el-button-group>
        <el-button
          type="primary"
          :icon="ArrowLeft"
          @click="() => emit('onSizeChange', 'X', 'inc')"
          >增加</el-button
        >
        <el-button
          type="primary"
          @click="() => emit('onSizeChange', 'X', 'dec')"
        >
          减少<el-icon class="el-icon--right"><ArrowRight /></el-icon>
        </el-button>
      </el-button-group>
    </p>
    <p class="item">
      长度：
      <el-button-group>
        <el-button
          type="primary"
          :icon="ArrowLeft"
          @click="() => emit('onSizeChange', 'Z', 'inc')"
          >增加</el-button
        >
        <el-button
          type="primary"
          @click="() => emit('onSizeChange', 'Z', 'dec')"
        >
          减少<el-icon class="el-icon--right"><ArrowRight /></el-icon>
        </el-button>
      </el-button-group>
    </p>
    <p class="item">
      高度：
      <el-button-group>
        <el-button
          type="primary"
          :icon="ArrowLeft"
          @click="() => emit('onSizeChange', 'Y', 'inc')"
          >增加</el-button
        >
        <el-button
          type="primary"
          @click="() => emit('onSizeChange', 'Y', 'dec')"
        >
          减少<el-icon class="el-icon--right"><ArrowRight /></el-icon>
        </el-button>
      </el-button-group>
    </p>
    <p class="item">
      旋转：
      <el-switch
        v-model="autoPlay"
        class="ml-2"
        inline-prompt
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        active-text="Y"
        inactive-text="N"
        @change="(status:boolean)=>emit('onPlayStatusChange',status)"
      />
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
