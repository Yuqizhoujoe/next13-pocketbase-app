import { LayoutInterface } from "../../../shared/modal/Common/interface";
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import { Suspense } from "react";
import Spinner from "../Common/Spinner";

const Layout = ({ children }: LayoutInterface) => {
  return (
    <div className="h-screen">
      <Header />
      <main className="my-10 p-3">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
