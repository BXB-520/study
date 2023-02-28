import styles from './index.less';
import { history } from 'umi';
import AppHeader from '@/components/system/AppHeader';
import { AppContent, AppPage } from '@/components/system/AppPages';
import { useContext, useEffect } from 'react';
import {
  RouteInfoContext,
  RouteInfoContextType,
} from '@/components/system/AppMain';

export default function IndexPage() {
  const context: RouteInfoContextType = useContext(RouteInfoContext);

  useEffect(() => {
    context.iosBackRef.current = onBack;
  }, []);

  const aa2 = (e) => {
    console.log('来了人3', e);
  };

  const onBack = () => {
    context.pageCallBackRef.current.pop();
    history.goBack();
  };
  const onNext = (url: string) => {
    context.pageCallBackRef.current.push(aa2);
    context.iosBackRef.current = onBack;
    history.push(url);
  };

  return (
    <AppPage>
      <AppHeader onBack={onBack}>子页面</AppHeader>
      <AppContent>
        <div
          onClick={() => {
            onNext('/abc2');
          }}
        >
          子页面
        </div>
        <div
          onClick={() => {
            context.onHandleCallBack({ a: 1, b: 2 });
          }}
        >
          带参数回去1 2
        </div>
      </AppContent>
    </AppPage>
  );
}
