import { ReactNode } from "react";
import Header from "../header";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div data-testid="layout">
      <Header />
      <main data-testid="children">{children}</main>
    </div>
  );
};

export default Layout;
