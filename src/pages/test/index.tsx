import styles from './index.less';
import { history } from 'umi';
import { useContext, useEffect, useState } from 'react';
import {
  RouteInfoContext,
  RouteInfoContextType,
} from '@/components/system/AppMain';
import AppHeader from '@/components/system/AppHeader';
import { AppContent, AppPage } from '@/components/system/AppPages';

export default function IndexPage() {
  const [data, setData] = useState<any>(100);
  const context: RouteInfoContextType = useContext(RouteInfoContext);

  useEffect(() => {
    console.log('111', context.pageCallBackRef);
  }, []);

  const aa = (e) => {
    console.log('来了人', e);
  };
  return (
    <AppPage>
      <AppHeader>首页</AppHeader>
      <AppContent>
        <h1
          className={styles.title}
          onClick={() => {
            context.pageCallBackRef.current.push(aa);
            history.push('/abc');
          }}
        >
          Page index0
        </h1>
        <h1
          className={styles.title}
          onClick={() => {
            context.pageCallBackRef.current.push(aa);
            history.push('/abc2');
          }}
        >
          Page index2
        </h1>
        <div
          onClick={() => {
            setData(data + 1);
          }}
        >
          add+
        </div>
        <div> show ={data}</div>
        <div style={{ height: '56px' }} />
      </AppContent>
    </AppPage>
  );
}
