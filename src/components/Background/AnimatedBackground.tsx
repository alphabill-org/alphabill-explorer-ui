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
          filter: 'blur(250px)',
          height: '1000px',
          left: '1191.55px',
          position: 'absolute',
          top: '375.24px',
          transform: 'translateZ(0) translate3d(0,0,0)',
          width: '1000px',
        }}
      />
      <div
        className="layout-circle-filled"
        style={{
          filter: 'blur(250px)',
          height: '1000px',
          left: '-445.78px',
          position: 'absolute',
          top: '1334.9px',
          transform: 'translateZ(0) translate3d(0,0,0)',
          width: '1000px',
        }}
      />
      <div
        className="layout-circle-filled"
        style={{
          filter: 'blur(250px)',
          height: '1000px',
          left: '1191.55px',
          position: 'absolute',
          top: '2712.99px',
          transform: 'translateZ(0) translate3d(0,0,0)',
          width: '1000px',
        }}
      />

      <div
        className="layout-circle-filled"
        style={{
          filter: 'blur(250px)',
          height: '450px',
          left: '-172.89px',
          position: 'absolute',
          top: '-191px',
          transform: 'translateZ(0) translate3d(0,0,0)',
          width: '450px',
        }}
      />
      <div
        className="layout-circle-filled"
        style={{
          filter: 'blur(250px)',
          height: '450px',
          left: '1237.04px',
          position: 'absolute',
          top: '1716.95px',
          transform: 'translateZ(0) translate3d(0,0,0)',
          width: '450px',
        }}
      />
      <div
        className="layout-circle-filled"
        style={{
          filter: 'blur(250px)',
          height: '450px',
          left: '-172.89px',
          position: 'absolute',
          top: '3122.32px',
          transform: 'translateZ(0) translate3d(0,0,0)',
          width: '450px',
        }}
      />
    </>
  );
};

export default AnimatedBackground;
