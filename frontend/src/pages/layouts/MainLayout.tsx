import { Outlet } from "react-router-dom";
import { FooterBar, NavBar } from "../../widgets";

export const MainLayout = () => {
  return (
    <div className="">

      <NavBar />

      <div className=" bg-slate-800">
        <div className=" container mx-auto max-w-6xl">
          <Outlet />
        </div>
      </div>

      <FooterBar />

    </div>
  );
};
