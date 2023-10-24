import { Outlet } from "react-router-dom";
import { FooterBar, NavBar } from "../../widgets";

export const MainLayout = () => {
  return (
    <div className=" container mx-auto max-w-6xl">
      <NavBar />
      <Outlet/>
      <FooterBar />
    </div>
  );
};
