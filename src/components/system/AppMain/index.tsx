import {
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import './index.less';
import { Switch, history } from 'umi';
import React from 'react';
import styles from './index.less';
import Gesture from 'rc-gesture';
import { Toast } from 'antd-mobile';

declare const window: any;

const zIndex = 99;
let panyType: number = 0;
let panxStart: number = 0;
let panyStart: number = 0;

const AppMain = ({ mainprops }: any) => {
  const { location, ref } = mainprops;
  const { pathname } = location;

  /** 路由历史 */
  const [historyList, setHistoryList] = useState<any>([]);
  /** 动画类型，打开/后退 */
  const [type, settype] = useState<any>('');
  /** 页面回调函数 */
  const pageCallBackRef = useRef<[Function]>([() => {}]);
  /** 子页面转给父页面参数 */
  const callBackDataRef = useRef<any>(null);
  /** ios需要返回上一页 */
  const iosBackRef = useRef<any>();

  /** 动画类型，打开/后退 */
  const [backtype, setBackType] = useState<any>('');

  const [movex, setmovex] = useState<any>('0px');

  useImperativeHandle(ref, () => ({
    getHistorys: () => {
      return historyList;
    },
    iosBackRef: iosBackRef.current,
  }));

  /** 路由切换时，保留原有页面数据 */
  const historyChange = async (action: any) => {
    switch (action?.history?.action) {
      case 'PUSH':
        {
          if (
            historyList[historyList.length - 1]?.location.pathname &&
            historyList[historyList.length - 1]?.location.pathname !=
              action.history.location.pathname
          ) {
            setHistoryList([
              ...historyList,
              {
                id: zIndex + historyList.length + 1,
                location: action.location,
                children: action.children,
              },
            ]);
            settype('open');
            setBackType('');
          }
        }

        break;
      case 'POP':
      case 'REPLACE':
        {
          if (historyList.length > 1) {
            if (
              historyList[historyList.length - 1]?.location.pathname !=
              action.history.location.pathname
            ) {
              settype('end');

              setTimeout(() => {
                settype('');
                setBackType('');
                setmovex('0px');
                setHistoryList((prop: any) => {
                  return prop.slice(0, -1);
                });

                if (callBackDataRef.current) {
                  pageCallBackRef.current[pageCallBackRef.current.length - 1](
                    callBackDataRef.current,
                  );
                  pageCallBackRef.current.pop();
                  callBackDataRef.current = null;
                }
              }, 290);
            }
          } else {
            settype('');
            setBackType('');
            setmovex('0px');
            setHistoryList([
              {
                id: historyList.length > 0 ? historyList[0].id - 1 : zIndex + 1,
                location: action.location,
                children: action.children,
              },
            ]);
          }
        }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    historyChange(mainprops);
  }, [pathname]);

  /** 指定历史回退 history back by url */
  const onHistoryBack = (url: string) => {
    const urlIndex = historyList.findIndex((h: any) => h.path === url);

    if (urlIndex === -1) {
      Toast.show({
        content: '当前路由栈不存在此路由、请从头再来。',
        position: 'bottom',
      });
      return;
    }
    history.go(urlIndex - historyList.length + 1);
  };

  /** 回到上一页并携带参数 */
  const onHandleCallBack = (backData: any) => {
    callBackDataRef.current = backData;
    history.goBack();
  };

  /** 拖拽移动 */
  const handlePan = useCallback((type: string, x: number, y: number) => {
    if (window.DisabledSwipeBack) return;
    if (type === 'START') {
      panxStart = x;
      panyStart = y;
    } else if (type === 'MOVE') {
      if (x > 0 && x < window.innerWidth) setmovex(x + 'px');
    } else if (type == 'END') {
      setBackType('');
      if (x - panxStart > 60) {
        setBackType('Back');
        if (iosBackRef.current) {
          iosBackRef.current();
        } else {
          history.goBack();
        }
      } else {
        setBackType('Next');
        setTimeout(() => {
          settype('');
          setBackType('');
          setmovex('0px');
        }, 290);
      }
    }
  }, []);

  /** 方式决定动画 */
  const transformType = () => {
    if (backtype == '') {
      if (type == 'open') {
        return styles.open;
      } else if (type == 'end') {
        return styles.end;
      } else {
        return null;
      }
    } else if (backtype == 'Back') {
      return styles.back;
    } else if (backtype == 'Next') {
      return styles.next;
    } else {
      return null;
    }
  };

  /** 页面层级决定显示效果，超过3页隐藏 防止页面卡顿 */
  const childtransform = (id: number) => {
    if (id == historyList[historyList.length - 1].id) {
      return styles.now;
    } else if (id == historyList[historyList.length - 2].id) {
      return styles.old;
    } else {
      return styles.hidden;
    }
  };

  return (
    <>
      {historyList.map((item: any, index: number) => {
        return (
          <Gesture
            key={item.id}
            onPanEnd={(e: any) => {
              if (panyType) {
                handlePan('END', e.moveStatus.x, e.moveStatus.y);
              }
            }}
            onPanMove={(e: any) => {
              if (panyType) {
                handlePan('MOVE', e.moveStatus.x, e.moveStatus.y);
              }
            }}
            onPanStart={(e: any) => {
              if (e.preTouches[0].x < 80) {
                panyType = historyList.length > 1 ? 1 : 0;
                handlePan('START', e.moveStatus.x, e.moveStatus.y);
              } else {
                panyType = 0;
              }
            }}
            direction="horizontal"
          >
            <div
              key={item.id}
              style={{
                position: 'absolute',
                inset: '0px',
                top: '0px',
                right: '0px',
                left: '0px',
                bottom: '0px',
                overflow: 'hidden',
                zIndex: item.id,
              }}
              className={transformType()}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '0px',
                  top: '0px',
                  right: '0px',
                  left: '0px',
                  bottom: '0px',
                  overflow: 'hidden',
                  transform:
                    item.id == historyList[historyList.length - 1].id
                      ? `translateX(${movex})`
                      : item.id == historyList[historyList.length - 2].id
                      ? `translateX(calc(-30% + ( 30% / ( ${
                          window.innerWidth
                        } / ${parseInt(movex)} ))))`
                      : `translateX(0px)`,
                }}
                className={childtransform(item.id)}
              >
                <RouteInfoContext.Provider
                  key={item.id}
                  value={{
                    routeInfo: { ...item },
                    onHistoryBack,
                    onHandleCallBack,
                    pageCallBackRef,
                    iosBackRef,
                  }}
                >
                  <Switch location={item.location}>{item.children}</Switch>
                </RouteInfoContext.Provider>
              </div>
            </div>
          </Gesture>
        );
      })}
    </>
  );
};

export default AppMain;

export const RouteInfoContext = React.createContext<RouteInfoContextType>({
  routeInfo: undefined,
  onHistoryBack: () => undefined,
  onHandleCallBack: () => undefined,
  pageCallBackRef: { current: [{}] },
  iosBackRef: { current: () => {} },
});

export interface RouteInfo {
  id: number;
  location: any;
  children: ReactNode;
}

export interface RouteInfoContextType {
  routeInfo?: RouteInfo;
  /** 指定页面回退 不能携带参数 */
  onHistoryBack: (url: string) => void;
  /** 页面回调并携带参数 */
  onHandleCallBack: (backData: any) => void;
  /** 接受下一页回调上来的参数 */
  pageCallBackRef: {
    current: [{}];
  };
  /** ios返回 */
  iosBackRef: {
    current: () => void;
  };
}
