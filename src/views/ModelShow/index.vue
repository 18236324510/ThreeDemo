<script lang="ts">
export default {
  name: "ModelShow",
};
</script>
<script setup lang="ts">
import * as THREE from "three";
import { onMounted, ref } from "vue";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const cancasRef = ref<HTMLDivElement | null>(null);
const width = window.innerWidth; //窗口宽度
const height = window.innerHeight; //窗口高度
const scene = new THREE.Scene();
const loader = new FBXLoader();
const camera = createCamera(45, width / height, 10, 2000);
// 该对象用于跟踪时间
const clock = new THREE.Clock();
// AnimationActions 用来调度存储在AnimationClips中的动画
let actions: THREE.AnimationAction[] = [];
// 动画混合器是用于场景中特定对象的动画的播放器
let mixer: THREE.AnimationMixer | null = null;

let renderer: THREE.WebGLRenderer = createRenderer({
  width,
  height,
  color: "#b9d3ff",
}); //渲染器
const controls = new OrbitControls(camera, renderer.domElement);
let ambientLight = creatPointLight({
  x: 400,
  y: 200,
  z: 300,
  color: "#ffffff",
});

/**
 * 相机设置
 */
function createCamera(fov: number, aspect: number, near: number, far: number) {
  // fov — 摄像机视锥体垂直视野角度
  // aspect — 摄像机视锥体长宽比
  // near — 摄像机视锥体近端面
  // far — 摄像机视锥体远端面
  //创建相机对象
  let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(200, 300, 200); //设置相机位置
  camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
  return camera;
}

/**
 * 创建渲染器对象
 */
function createRenderer(config: {
  width: number;
  height: number;
  color: string;
}) {
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(config.width, config.height); //设置渲染区域尺寸
  renderer.setClearColor(config.color, 1); //设置背景颜色
  renderer.setAnimationLoop(render);
  return renderer;
}

/**
 * 光源设置
 */
function creatPointLight(config: {
  x: number;
  y: number;
  z: number;
  color: string;
}) {
  //环境光
  let ambientLight = new THREE.AmbientLight(config.color, 3);
  scene.add(ambientLight); //环境光添加到场景中
  return ambientLight;
}
function render() {
  renderer.render(scene, camera);
  if (mixer) {
    // 获取自 .oldTime 设置后到当前的秒数。 同时将 .oldTime 设置为当前时间。
    // 如果 .autoStart 设置为 true 且时钟并未运行，则该方法同时启动时钟。
    mixer.update(clock.getDelta());
  }
}

onMounted(() => {
  cancasRef.value?.appendChild(renderer.domElement);
  setAxisHelper();
  loadFBX();
});

function loadFBX() {
  loader.load("../../../Flair.fbx", (mesh) => {
    scene.add(mesh);
    mixer = new THREE.AnimationMixer(mesh);
    mesh.animations.forEach((animation) => {
      if (mixer) {
        let am = mixer?.clipAction(animation);
        actions.push(am);
      }
    });
    actions[0].play();
  });
}
/**
 * 设置坐标轴
 */
const setAxisHelper = () => {
  let axisHelper = new THREE.AxesHelper(250);
  scene.add(axisHelper);
};
</script>
<template>
  <div id="cancasRef" ref="cancasRef"></div>
</template>
<style scoped lang="less">
#cancasRef {
  height: 100%;
  width: 100%;
}
</style>
