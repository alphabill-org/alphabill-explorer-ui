import { Outlet } from "react-router-dom";
import { FooterBar, NavBar } from "../../widgets";
import { AnimatedCirclesElement, SphereElement } from "../../shared/ui/background";

export const MainLayout = () => {
  return (
    <div>
      <NavBar/>
      <div className="layout" style={{ overflow: 'hidden' }}>
        <div className="container mx-auto max-w-6xl z-30">
          <Outlet />
        </div>
        <AnimatedCirclesElement />
        <SphereElement width="w-[1000px]" height="h-[1000px]" top="375.24px" left="1191.55px" />
        <SphereElement width="w-[1000px]" height="h-[1000px]" top="1334.9px" left="-445.78px" />
        <SphereElement width="w-[1000px]" height="h-[1000px]" top="2712.99px" left="1191.55px" />

        <SphereElement width="w-[450px]" height="h-[450px]" top="-191px" left="-172.89px" />
        <SphereElement width="w-[450px]" height="h-[450px]" top="1716.95px" left="1237.04px" />
        <SphereElement width="w-[450px]" height="h-[450px]" top="3122.32px" left="-172.89px" />
      </div>

      <FooterBar />
    </div >
  );
};
