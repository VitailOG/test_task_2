const routes = [
  {
    path: '/',
    component: () => import('../pages/MainTable')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
