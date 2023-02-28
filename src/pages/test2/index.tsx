import styles from './index.less';
import { history } from 'umi';
import {
  RouteInfoContext,
  RouteInfoContextType,
} from '@/components/system/AppMain';
import { useContext, useEffect } from 'react';

export default function IndexPage() {
  const context: RouteInfoContextType = useContext(RouteInfoContext);

  useEffect(() => {
    context.iosBackRef.current = onBack;
  }, []);

  const onBack = () => {
    context.pageCallBackRef.current.pop();
    history.goBack();
  };

  return (
    <div style={{ background: 'green', width: '100vw', height: '100vh' }}>
      <h1 className={styles.title}>Page index2</h1>
      <div onClick={onBack}>back</div>
      <div
        onClick={() => {
          context.onHandleCallBack({ a: 3, b: 4 });
        }}
      >
        带参数回去3 4
      </div>
      <h1
        className={styles.title}
        onClick={() => {
          history.push('/abc');
        }}
      >
        Page index0
      </h1>
    </div>
  );
}
