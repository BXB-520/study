import React from 'react';
import homeIcon from '@/assets/images/tabs/home.png';
import athomeIcon from '@/assets/images/tabs/athome.png';
import videoIcon from '@/assets/images/tabs/video.png';
import atvideoSIcon from '@/assets/images/tabs/atvideo.png';
import mineIcon from '@/assets/images/tabs/mine.png';
import atmineIcon from '@/assets/images/tabs/atmine.png';
import Home from '@/pages/tabs/home';
import AppTabs from '@/components/system/AppTabs';
import TabsWork from '@/pages/test1';
// import TabsMine from '@/pages/tabs/mine';
// import { AppTabs } from '@/components/_core';

// tab组件
const tabss = [
  {
    title: '首页',
    key: 'home',
    component: Home,
    badge: 0,
    icon: homeIcon,
    selectedIcon: athomeIcon,
  },
  {
    title: 'demo',
    key: 'video',
    component: TabsWork,
    badge: 0,
    icon: mineIcon,
    selectedIcon: atmineIcon,
  },
  // {
  //   title: '我的',
  //   key: 'mine',
  //   component: TabsMine,
  //   badge: 0,
  //   icon: mineIcon,
  //   selectedIcon: atmineIcon,
  // },
  // {
  //   title: '我的',
  //   key: 'mines',
  //   component: TabsMine,
  //   badge: '1',
  //   icon: mineIcon,
  //   selectedIcon: atmineIcon,
  // },
];

export default () => <AppTabs tabs={tabss} />;
