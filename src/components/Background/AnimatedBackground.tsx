import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <>
      <div className="hidden md:flex items-center justify-center animate-pulsing -z-10 absolute left-[-600px] top-[350px] w-[1135px] h-[1135px]">
        <div className="layout-circle w-[20%] h-[20%]"></div>
        <div className="layout-circle w-[40%] h-[40%]"></div>
        <div className="layout-circle w-[60%] h-[60%]"></div>
        <div className="layout-circle w-[80%] h-[80%]"></div>
        <div className="layout-circle w-[100%] h-[100%]"></div>
      </div>

      <div
        className="layout-circle-filled"
        style={{
          position: 'absolute',
          width: '1000px',
          height: '1000px',
          top: '375.24px',
          left: '1191.55px',
          filter: 'blur(250px)',
          transform: 'translateZ(0) translate3d(0,0,0)',
        }}
      />
      <div
        className="layout-circle-filled"
        style={{
          position: 'absolute',
          width: '1000px',
          height: '1000px',
          top: '1334.9px',
          left: '-445.78px',
          filter: 'blur(250px)',
          transform: 'translateZ(0) translate3d(0,0,0)',
        }}
      />
      <div
        className="layout-circle-filled"
        style={{
          position: 'absolute',
          width: '1000px',
          height: '1000px',
          top: '2712.99px',
          left: '1191.55px',
          filter: 'blur(250px)',
          transform: 'translateZ(0) translate3d(0,0,0)',
        }}
      />

      <div
        className="layout-circle-filled"
        style={{
          position: 'absolute',
          width: '450px',
          height: '450px',
          top: '-191px',
          left: '-172.89px',
          filter: 'blur(250px)',
          transform: 'translateZ(0) translate3d(0,0,0)',
        }}
      />
      <div
        className="layout-circle-filled"
        style={{
          position: 'absolute',
          width: '450px',
          height: '450px',
          top: '1716.95px',
          left: '1237.04px',
          filter: 'blur(250px)',
          transform: 'translateZ(0) translate3d(0,0,0)',
        }}
      />
      <div
        className="layout-circle-filled"
        style={{
          position: 'absolute',
          width: '450px',
          height: '450px',
          top: '3122.32px',
          left: '-172.89px',
          filter: 'blur(250px)',
          transform: 'translateZ(0) translate3d(0,0,0)',
        }}
      />
    </>
  );
};

export default AnimatedBackground;
