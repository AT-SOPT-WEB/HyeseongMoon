import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="pt-20 px-4">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;

