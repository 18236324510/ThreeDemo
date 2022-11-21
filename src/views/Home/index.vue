<script lang="ts">
export default {
  name: "Home",
};
</script>
<script setup lang="ts">
import Controller from "./components/Controller/index.vue";
import * as THREE from "three";
import { onMounted, ref } from "vue";
import type { SizeType, IMeshSize } from "./type";
const width = window.innerWidth; //窗口宽度
const height = window.innerHeight; //窗口高度
let scene: THREE.Scene = new THREE.Scene(); //场景
let camera: THREE.Camera = createCamera(width / height, 200); //相机
let mesh: THREE.Mesh | null = null; //材质
let renderer: THREE.WebGLRenderer = createRenderer({
  width,
  height,
  color: "#b9d3ff",
}); //渲染器
let pointLight = creatPointLight({ x: 400, y: 200, z: 300, color: "#ffffff" });
let geometry: THREE.BoxGeometry | null = null;

const autoPlay = ref<boolean>(false);

/**
 * 设置坐标轴
 */
function init() {
  setAxisHelper();
  geometry = createGeometry("Box", {
    a: 100,
    b: 150,
    c: 200,
  }) as THREE.BoxGeometry;
  let material = createMaterial();
  mesh = createMesh(geometry, material);
  sceneAdd([mesh]);
  document.getElementById("threeEle")?.appendChild(renderer.domElement); //body元素中插入canvas对象
  //执行渲染操作   指定场景、相机作为参数
  render();
}

/**
 * 设置辅助线
 */
function setAxisHelper() {
  let axisHelper = new THREE.AxesHelper(250);
  scene.add(axisHelper);
}

/**
 * 向场景中添加元素
 */
function sceneAdd(item: any[]) {
  item.forEach((i) => {
    scene.add(i);
  });
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
  //点光源
  let point = new THREE.PointLight(config.color);
  point.position.set(config.x, config.y, config.z); //点光源位置x
  scene.add(point); //点光源添加到场景中
  return point;
}

/**
 * 相机设置
 */
function createCamera(k: number, s: number) {
  //k窗口宽高比
  //s三维场景显示范围控制系数，系数越大，显示的范围越大
  //创建相机对象
  let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
  camera.position.set(200, 300, 200); //设置相机位置
  if (scene) {
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
  }
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
  return renderer;
}

/**
 * 创建几何体
 */
function createGeometry(
  type: "Sphere" | "Box",
  config: { a: number; b: number; c: number }
) {
  switch (type) {
    case "Sphere":
      return new THREE.SphereGeometry(config.a, config.b, config.c); //创建一个球体几何对象
    case "Box":
      return new THREE.BoxGeometry(config.a, config.b, config.c); //创建一个立方体几何对象Geometry
    default:
      return;
  }
}
/**
 * 创建网格模型
 */
function createMesh(
  geometry: THREE.BufferGeometry,
  material: THREE.Material | THREE.Material[]
) {
  return new THREE.Mesh(geometry, material); //网格模型对象Mesh
}

/**
 * 创建材质
 */
function createMaterial() {
  let material = new THREE.MeshLambertMaterial({
    color: 0x0000ff,
  }); //材质对象Material
  return material;
}

/**
 * 进行渲染
 */
function render() {
  if (scene && camera) {
    renderer.render(scene, camera);
    if (autoPlay.value) {
      mesh?.rotateY(0.01);
      requestAnimationFrame(render);
    }
  }
}

/**
 * 尺寸修改
 */
function handleSizeChange(type: SizeType, value: "inc" | "dec") {
  let meshSize: IMeshSize = {
    X: 1,
    Y: 1,
    Z: 1,
  };
  meshSize[type] = value === "inc" ? 1.01 : 0.99;
  geometry?.scale(meshSize.X, meshSize.Y, meshSize.Z);
  if (autoPlay.value) {
    return;
  }
  render();
}

/**
 * 自动旋转
 */
function handlePlayChange(status: boolean) {
  autoPlay.value = status;
  render();
}

onMounted(() => {
  init();
});
</script>

<template>
  <div id="threeEle"></div>
  <Controller
    @on-size-change="handleSizeChange"
    @on-play-status-change="handlePlayChange"
  ></Controller>
</template>
