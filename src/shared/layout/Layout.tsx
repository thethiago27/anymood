import { ReactNode } from "react";
import TopBar from "../top-bar";
import styles from "./styles.module.scss";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <TopBar />
      <div className={styles.container}>{children}</div>
    </>
  );
};

export default Layout;
