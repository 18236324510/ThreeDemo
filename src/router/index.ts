import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomeView from '../views/Home/index.vue';
import Earth from '../views/Earth/index.vue';
import Model from '../views/ModelShow/index.vue';
interface CRouteRecordRaw {
  meta?: {
    title?: string;
    keepAlive?: boolean;

    tabs?: {
      label: string;
    };
    white?: boolean;
  };
}
type RouteConfig = RouteRecordRaw & CRouteRecordRaw;
export const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      tabs: {
        label: '长方体',
      },
      keepAlive: true,
    },
  },
  {
    path: '/earth',
    name: 'Earth',
    component: Earth,
    meta: {
      tabs: {
        label: '地球',
      },
      keepAlive: true,
    },
  },
  {
    path: '/modelShow',
    name: 'ModelShow',
    component: Model,
    meta: {
      tabs: {
        label: '模型展示',
      },
      keepAlive: true,
    },
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
