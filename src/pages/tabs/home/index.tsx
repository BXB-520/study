import AppHeader from '@/components/system/AppHeader';
import { AppContent } from '@/components/system/AppPages';
import { AddSquareOutline } from 'antd-mobile-icons';
import React, { useState } from 'react';
import styles from './index.less';
import { history } from 'umi';

const Home = () => {
  const [list, setList] = useState<any[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 12, 13, 14, 15,
  ]);
  return (
    <>
      <div className={styles.header}>
        <AppHeader
          canBack={false}
          leftContent={
            <div style={{ fontSize: '18px', fontWeight: '600' }}></div>
          }
          children={"首页"}
        />
      </div>

      <AppContent>
        <div className={styles.titleContent}>
          <div
            onClick={() => {
              history.push('/test');
            }}
          >
            <AddSquareOutline />
          </div>
        </div>
        <div className={styles.title}></div>
        <div className={styles.Content}>
          {/* {list.map((items: any) => {
            return (
              <div
                className={styles.listBox}
                onClick={() => {
                  window.open('https://www.baidu.com/', '_blank');
                }}
              >
                <span></span>
              </div>
            );
          })} */}
        </div>
      </AppContent>
    </>
  );
};

export default Home;
