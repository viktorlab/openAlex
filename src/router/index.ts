import { createRouter, createWebHistory } from 'vue-router';
import Works from '@/views/Works.vue';
import WorkDetail from '@/views/WorkDetail.vue';
import Favorites from '@/views/Favorites.vue';
import { routeConfig } from './routeConfig';

const routes = [
  { path: routeConfig.works.path, name: routeConfig.works.name, component: Works },
  {
    path: routeConfig.workDetail.path,
    name: routeConfig.workDetail.name,
    component: WorkDetail
  },
  { path: routeConfig.favorites.path, name: routeConfig.favorites.name, component: Favorites }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
