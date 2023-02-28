import { ReactNode } from 'react';
import styles from './index.less';

export const AppPage = (props: { children: ReactNode }) => {
  return <div className={styles.AppPage}>{props.children}</div>;
};

export const AppContent = (props: { children: ReactNode }) => {
  return <div className={styles.AppContent}>{props.children}</div>;
};
