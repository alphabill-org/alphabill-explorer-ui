import { Outlet } from "react-router-dom";
import { FooterBar, NavBar } from "../../widgets";

export const MainLayout = () => {
  return (
    <div className="">

      <NavBar />

      <div className="relative h-screen w-full bg-[#0c0a3e] z-0" style={{ overflow: 'hidden' }}>
        <div className="container mx-auto max-w-6xl z-30">
          <Outlet />
        </div>
          <div className="w-[1135px] h-[1135px] rounded-full absolute items-center justify-center animate-pulsing left-[-600px] top-[350px] hidden md:flex -z-10">
            <div className="w-[20%] h-[20%] border-[2px] border-[#4E3EB6] rounded-full absolute"/>
            <div className="w-[40%] h-[40%] border-[2px] border-[#4E3EB6] rounded-full absolute"/>
            <div className="w-[60%] h-[60%] border-[2px] border-[#4E3EB6] rounded-full absolute"/>
            <div className="w-[80%] h-[80%] border-[2px] border-[#4E3EB6] rounded-full absolute"/>
            <div className="w-[100%] h-[100%] border-[2px] border-[#4E3EB6] rounded-full absolute"/>
          </div>
          <div
            className="absolute w-[1000px] h-[1000px] rounded-full opacity-50 -z-10"
            style={{
              background: 'var(--primary-violet, #4E3EB6)',
              top: '375.24px',
              left: '1191.55px',
              filter: 'blur(250px)',
              transform: 'translateZ(0) translate3d(0,0,0)',
            }}
          />
          <div
            className="absolute w-[1000px] h-[1000px] rounded-full opacity-50 -z-10"
            style={{
              background: 'var(--primary-violet, #4E3EB6)',
              top: '1334.9px',
              left: '-445.78px',
              filter: 'blur(250px)',
              transform: 'translateZ(0) translate3d(0,0,0)',
            }}
          />
          <div
            className="absolute w-[450px] h-[450px] rounded-full opacity-50 -z-10"
            style={{
              background: 'var(--primary-violet, #4E3EB6)',
              top: '-191px',
              left: '-172.89px',
              filter: 'blur(250px)',
              transform: 'translateZ(0) translate3d(0,0,0)',
            }}
          />
          <div
            className="absolute w-[450px] h-[450px] rounded-full opacity-50 -z-10"
            style={{
              background: `var(--primary-violet, #4E3EB6)`,
              top: '1716.95px',
              left: '1237.04px',
              filter: 'blur(250px)',
              transform: 'translateZ(0) translate3d(0,0,0)',
            }}
          />
          <div
            className="absolute w-[450px] h-[450px] rounded-full opacity-50 -z-10"
            style={{
              background: `var(--primary-violet, #4E3EB6)`,
              top: '3122.32px',
              left: '-172.89px',
              filter: 'blur(250px)',
              transform: 'translateZ(0) translate3d(0,0,0)',
            }}
          />
          <div
            className="absolute w-[1000px] h-[1000px] rounded-full opacity-50 -z-10"
            style={{
              background: 'var(--primary-violet, #4E3EB6)',
              top: '2712.99px',
              left: '1191.55px',
              filter: 'blur(250px)',
              transform: 'translateZ(0) translate3d(0,0,0)',
            }}
          />
      </div>

      <FooterBar />

    </div >
  );
};
