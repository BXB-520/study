import { Redirect } from 'umi';
import AppMain from '@/components/system/AppMain';
import AppGesture from '@/components/system/AppGesture';
import { useEffect } from 'react';
import VConsole from 'vconsole';

const App = (props: any) => {
  const { location } = props;
  

  useEffect(() => {
    // new VConsole();
  }, []);

  <Redirect to="/tabs" />

  if (true) {
    return (
      <>
        <AppGesture gestureprops={{ ...props }} />
      </>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default App;
