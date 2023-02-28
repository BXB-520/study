/**
 * @Author: BX
 * @Date:   2022-06-07 11:20:30
 * @Last Modified by:   BX
 * @Last Modified time: 2022-06-07 11:21:22
 */
const routes = [
  {
    path: '/',
    redirect: '/tabs',
  },
  {
    path: '/',
    component: '@/App',
    routes: [
      {
        path: '/tabs',
        component: '@/pages/tabs',
      },
      {
        path: '/test',
        component: '@/pages/test',
      },
      {
        path: '/abc',
        component: '@/pages/test1',
      },
      {
        path: '/abc2',
        component: '@/pages/test2',
      },
    ],
  },
];

export default routes;
