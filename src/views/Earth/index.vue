<script lang="ts">
export default {
  name: "Earth",
};
</script>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { onMounted, ref } from "vue";
import Controller from "./components/Controller/index.vue";
import type { lightType } from "./components/type";

import earth from "./earth.jpg";
const disabled = ref<boolean>(true);
let scene: THREE.Scene | null = null; //场景
let camera: THREE.Camera | null = null; //相机
let mesh: THREE.Mesh | null = null; //材质
let renderer: THREE.WebGLRenderer | null = null; //渲染器
let geometry: THREE.SphereGeometry | null = null;
let control: OrbitControls | null = null;
let lightList: {
  PointLight: THREE.PointLight | null;
  AmbientLight: THREE.AmbientLight | null;
  DirectionalLight: THREE.DirectionalLight | null;
} = { PointLight: null, AmbientLight: null, DirectionalLight: null };
const init = () => {
  /**
   * 创建场景对象Scene
   */
  scene = new THREE.Scene();
  /**
   * 创建网格模型
   */
  geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
  //   geometry = new THREE.BoxGeometry(100, 150, 200); //创建一个立方体几何对象Geometry
  let material = new THREE.MeshLambertMaterial({
    color: 0x0000ff,
  }); //材质对象Material
  mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  // 纹理贴图映射到一个矩形平面上
  // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
  let textureLoader = new THREE.TextureLoader();
  // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
  textureLoader.load(earth, function (texture) {
    let material = new THREE.MeshLambertMaterial({
      // color: 0x0000ff,
      // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
      map: texture, //设置颜色贴图属性值
    }); //材质对象Material
    if (scene && geometry) {
      let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      scene.add(mesh); //网格模型添加到场景中
    }
    disabled.value = false;
    //纹理贴图加载成功后，调用渲染函数执行渲染操作
    render();
  });

  scene.add(mesh); //网格模型添加到场景中、
  // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
  let axisHelper = new THREE.AxesHelper(250);
  scene.add(axisHelper);
  /**
   * 光源设置
   */
  initLight();

  /**
   * 相机设置
   */
  let width = window.innerWidth; //窗口宽度
  let height = window.innerHeight; //窗口高度
  let k = width / height; //窗口宽高比
  let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
  //创建相机对象
  camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
  camera.position.set(200, 300, 200); //设置相机位置
  camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
  /**
   * 创建渲染器对象
   */
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height); //设置渲染区域尺寸
  renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
  document.getElementById("threeEle")?.appendChild(renderer.domElement); //body元素中插入canvas对象
  //执行渲染操作   指定场景、相机作为参数
  render();
  initControl();
};
const render = () => {
  if (scene && camera) {
    renderer?.render(scene, camera);
  }
};
const initControl = () => {
  if (camera && renderer) {
    control = new OrbitControls(camera, renderer.domElement);
    control.addEventListener("change", render);
  }
};
const handlelightChange = (value: lightType[]) => {
  if (
    scene &&
    lightList.AmbientLight &&
    lightList.DirectionalLight &&
    lightList.PointLight
  ) {
    scene.remove(lightList.AmbientLight);
    scene.remove(lightList.PointLight);
    scene.remove(lightList.DirectionalLight);
    // @ts-ignore
    value.map((v: lightType) => scene?.add(lightList[v]));
    render();
  }
};
const initLight = () => {
  if (scene === null) return;
  //点光源
  lightList.PointLight = new THREE.PointLight(0xffffff);
  lightList.PointLight.position.set(400, 200, 300); //光源位置x
  //环境光
  lightList.AmbientLight = new THREE.AmbientLight(0xffffff);
  // 平行光
  lightList.DirectionalLight = new THREE.DirectionalLight(0xffffff);
  lightList.DirectionalLight.position.set(400, 200, 300); //光源位置x

  scene.add(lightList.PointLight); //点光源添加到场景中
};

onMounted(() => {
  init();
});
</script>

<template>
  <div id="threeEle"></div>
  <Controller
    @on-light-change="handlelightChange"
    :disabled="disabled"
  ></Controller>
</template>
