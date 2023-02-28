import { NavBar, NavBarProps } from 'antd-mobile';
import React, { FC, ReactChild } from 'react';

import { history } from 'umi';

import styles from './index.less';

interface AppHeaderPropsType extends NavBarProps {
  canBack?: boolean; // 返回按钮，默认true
  children: any;
  leftContent?: ReactChild;
  rightContent?: ReactChild;
}

/** 头部导航组件,可以在这里固定rightContent或是leftContent */
const AppHeader: FC<AppHeaderPropsType> = ({
  children,
  leftContent,
  rightContent,
  onBack,
  canBack = true,
}) => {
  const handleOnLeftClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onBack ? onBack() : history.goBack();
  };

  /** 需要做样式调整可统一添加 */
  const NavBarClass = {
    // backgroundColor: 'skyBlue',
    // paddingTop: requestMobileContext() === 'ios'&&process.env.NODE_ENV !== 'development' ? IOSTOP : '0px',
  };

  return (
    <div className={styles.topSafeArea} style={NavBarClass}>
      <NavBar
        left={leftContent}
        right={rightContent}
        onBack={handleOnLeftClick}
        backArrow={canBack}
      >
        {children}
      </NavBar>
    </div>
  );
};

export default AppHeader;
