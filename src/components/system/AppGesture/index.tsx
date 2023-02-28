import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Switch, history } from 'umi';
import React from 'react';
import Gesture from 'rc-gesture';
import { Toast } from 'antd-mobile';
import AppMain from '../AppMain';
import ReactDOM from 'react-dom';

declare const StatusBar: any;
declare const navigator: any;
declare const window: any;

let exitNum: number = 0;
let panxStart: number = 0;
let panyStart: number = 0;
let panyType: number = 0;

const AppGesture = ({ gestureprops }: any) => {
  const { location } = gestureprops;
  const ref = useRef<{ getHistorys: Function; iosBackRef: Function }>(null);

  useEffect(() => {
    // 初始化APP，修改状态栏颜色
    const onDeviceReady = () => {
      console.log('加载ok');
      //if (isCordova() && isAndroid()) {
      //   // 状态栏颜色
      //   if (!isWork()) {
      //     StatusBar.backgroundColorByHexString(props.statusBarColor);
      //     checkPermission();
      //   }
      //   // 返回按钮
      document.addEventListener('backbutton', eventBackButton);
      //}
      // if (!isWork()) {
      //   StatusBar.styleLightContent();
      // }
      // // hide screen
      // hideSplashScreen();
    };

    // 待设备初始化完成，才能使用cordova插件
    document.addEventListener('deviceready', onDeviceReady);
  }, []);

  const eventBackButton = async () => {
    // 返回按钮关闭模态框
    if (window.RmcModal) return;
    const parentNode = document.getElementById('root')?.parentNode;
    const nodes: any = parentNode?.children;

    const modalElement: HTMLElement[] = [];
    nodes.forEach((node: HTMLElement) => {
      if (
        node.id.includes('am-modal-container-') ||
        node.id.includes('rmc-dialog-container-')
      )
        modalElement.push(node);
    });

    if (modalElement.length > 0) {
      modalElement.forEach((element: HTMLElement) => {
        parentNode?.removeChild(element);
      });
      return;
    }

    // 返回历史页面或退出APP
    const historys = ref.current?.getHistorys();

    if (historys.length > 1) {
      if (ref.current?.iosBackRef) {
        ref.current?.iosBackRef();
      } else {
        history.goBack();
      }
    } else if (exitNum > 0) {
      navigator.app.exitApp();
    } else {
      Toast.show({
        content: '再点击一下返回，将退出APP。',
        position: 'bottom',
      });
      exitNum += 1;
      setTimeout(() => {
        exitNum = 0;
      }, 2000);
    }
  };

  return <AppMain mainprops={{ ...gestureprops, ref }} />;
};

export default AppGesture;
