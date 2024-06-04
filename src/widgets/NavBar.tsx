import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { IconSocialDiscord, IconArrowSmallUp, IconArrowSmallDown, IconClose, IconMenu } from "../shared/ui/icons";
import { AlphExplorerLogo } from "../shared/ui/assets/logo/AlphExplorerLogo";
import { ThemeSwitcher } from ".";

type Menu = {
  title: string;
  link: string;
  subItems?: Menu[];
};

const subMenu: Menu[] = [
  { title: "Docs", link: "https://docs.alphabill.org/welcome" },
  { title: "Whitepaper", link: "https://alphabill.org/files/AlphaBill%20Whitepaper.pdf" }
];

const menu: Menu[] = [
  { title: "Home", link: "/" },
  {
    title: "Bills", link: "/bills", subItems: [
      { title: "Blocks", link: "/bills/blocks" },
      { title: "Transactions", link: "/bills/transactions" },
    ]
  },
  {
    title: "Tokens", link: "/tokens", subItems: [
      { title: "Blocks", link: "/tokens/blocks" },
      { title: "Transactions", link: "/tokens/transactions" },
    ]
  }
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBillsOpen, setIsBillsOpen] = useState(false);
  const [isTokensOpen, setIsTokensOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "visible";
  };

  const closeMenuDropdowns = () => {
    setIsBillsOpen(false);
    setIsTokensOpen(false);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1320) {
        closeMenu();
        closeMenuDropdowns();
      }
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col relative z-50">
      <nav className=" menu-primary">
        <div className=" container max-w-6xl mx-auto justify-end items-center hidden lg:flex space-x-4 px-4 py-1">
          {subMenu.map((item, index) => (
            <Link key={index} className="link" to={item.link}>
              {item.title}
            </Link>
          ))}
          <Link to="https://discord.com/invite/dcFURChe86">
            <IconSocialDiscord className="link-icon h-[28px] w-[28px]" />
          </Link>
          <ThemeSwitcher />
        </div>
      </nav>
      <nav ref={mobileMenuRef} className={`${isOpen ? "menu-primary" : "menu-secondary"} transition-all duration-100`}>
        <div className="container max-w-6xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <div className="text-white text-xl font-semibold">
              <Link to="/">
                <AlphExplorerLogo className="w-[157px]" />
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {menu.map((item, index) => (
              <div key={index} className="relative group">
                <NavLink
                  className={({ isActive }) => isActive ? "link-active flex items-center w-fit justify-between" : "link flex items-center w-fit justify-between"} to={item.link}
                >
                  {item.title}   
                  {item.subItems && (
                    <>
                      <IconArrowSmallUp className="fill-white h-[12px] w-[12px] ml-1 hidden group-hover:block"/> 
                      <IconArrowSmallDown className="fill-white h-[12px] w-[12px] ml-1 group-hover:hidden mt-[1px]" />
                    </>
                  )}
                </NavLink>
                {item.subItems &&
                  <div className="absolute pt-5 -left-10 min-w-[175px] hidden group-hover:block">
                    <div className="absolute w-full shadow-md shadow-neutral-950 menu-secondary py-3 px-4 z-50 border-t-2 border-secondary hidden group-hover:block">
                      {item.subItems?.map((subItem, subIndex) => (
                        <NavLink key={subIndex} to={subItem.link} className={({ isActive }) => isActive ? "link-active block p-2" : "link block p-2"}>
                          {subItem.title}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                }
              </div>
            ))}
          </div>

          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white text-2xl focus:outline-none"
            >
              {isOpen ? <IconClose/> : <IconMenu className="fill-white"/>}
            </button>
          </div>
        </div>

        {isOpen && (
          <>
            <div className=" w-screen absolute lg:hidden flex flex-col bg-tetriary">
              <div className="container max-w-6xl mx-auto flex flex-col">
                <NavLink to="/" onClick={toggleMenu} className="px-4 py-2 link link-mobile">
                  Home
                </NavLink>
                <button onClick={() => setIsBillsOpen(!isBillsOpen)} className={`${isBillsOpen ? "bg-[#3730A3]" : "bg-none" } flex items-center justify-between px-4 py-2 text-left link link-mobile hover:fill-secondary`}>
                  Bills
                  {isBillsOpen ? <IconArrowSmallUp className="fill-white" /> : <IconArrowSmallDown className="fill-white" />}
                </button>
                {isBillsOpen && (
                  <div className="flex flex-col bg-black bg-opacity-10 border-t-2 border-secondary mb-1">
                    <NavLink to="/bills" className="px-5 py-2 link hover:bg-black hover:bg-opacity-10" onClick={toggleMenu}>
                      Overview
                    </NavLink>
                    <NavLink to="/bills/blocks" className="px-5 py-2 link hover:bg-black hover:bg-opacity-10" onClick={toggleMenu}>
                      Blocks
                    </NavLink>
                    <NavLink to="/bills/transactions" className="px-5 py-2 link hover:bg-black hover:bg-opacity-10" onClick={toggleMenu}>
                      Transactions
                    </NavLink>
                  </div>
                )}
                <button onClick={() => setIsTokensOpen(!isTokensOpen)} className={`${isTokensOpen ? "bg-[#3730A3]" : "bg-none" } flex items-center justify-between px-4 py-2 text-left link link-mobile hover:fill-secondary`}>
                  Tokens
                  {isTokensOpen ? <IconArrowSmallUp className="fill-white" /> : <IconArrowSmallDown className="fill-white" />}
                </button>
                {isTokensOpen && (
                  <div className="flex flex-col bg-black bg-opacity-10 border-t-2 border-secondary mb-1">
                    <NavLink to="/tokens" className="px-5 py-2 link hover:bg-black hover:bg-opacity-10" onClick={toggleMenu}>
                      Overview
                    </NavLink>
                    <NavLink to="/tokens/blocks" className="px-5 py-2 link hover:bg-black hover:bg-opacity-10" onClick={toggleMenu}>
                      Blocks
                    </NavLink>
                    <NavLink to="/tokens/transactions" className="px-5 py-2 link hover:bg-black hover:bg-opacity-10" onClick={toggleMenu}>
                      Transactions
                    </NavLink>
                  </div>
                )}

                {subMenu.map((item, index) => (
                  <Link key={index} onClick={toggleMenu} className="px-4 py-2 link link-mobile" to={item.link}>
                    {item.title}
                  </Link>
                ))}

                <span className="h-[2px] bg-black bg-opacity-20 mr-4 ml-4 my-2"></span>

                <div className="flex flex-row space-x-5 px-4 py-2 mb-2 justify-end">
                  <Link to="https://discord.com/invite/dcFURChe86">
                    <IconSocialDiscord className="fill-white hover:fill-[#08e8de] transition-colors duration-300 h-[28px] w-[28px]" />
                  </Link>
                  <ThemeSwitcher />
                </div>
              </div>
            </div>
            <div onClick={closeMenu} className="inset-0 fixed bg-black opacity-50 -z-10"></div>
          </>
        )}
      </nav>
    </div>
  );
};
export default NavBar;
