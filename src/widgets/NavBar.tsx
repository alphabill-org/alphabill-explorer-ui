import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { IconSocialDiscord } from "../shared/ui/icons";
import { AlphExplorerLogo } from "../shared/ui/assets/logo/AlphExplorerLogo";
import { ThemeSwitcher } from ".";

type Menu = {
  title: string;
  link: string;
  subItems?: Menu[];
};

const subMenu: Menu[] = [
  { title: "Docs", link: "https://docs.alphabill.org/docs/welcome" },
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
    if(!isOpen){
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

  const overlayClass = isOpen
    ? "fixed inset-x-0 z-50"
    : "flex flex-col";

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


  useEffect(() => {
    const closeMenuByClick = (event: MouseEvent) => {
      if (isOpen && !mobileMenuRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    }

    window.addEventListener('click', closeMenuByClick);

    return () => window.removeEventListener('click', closeMenuByClick);

  }, [isOpen]);

  return (
    <div className={overlayClass}>
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

          <div className="hidden lg:flex space-x-4">
            {menu.map((item, index) => (
              <div className="relative">
                <NavLink
                  key={index}
                  className={({ isActive }) => isActive ? "link-active" : "link"} to={item.link}
                  onMouseEnter={() => {
                    if (item.title === "Bills") {
                      setIsBillsOpen(true);
                      setIsTokensOpen(false);
                    } else if (item.title === "Tokens") {
                      setIsTokensOpen(true);
                      setIsBillsOpen(false);
                    }
                  }}
                >
                  {item.title}
                </NavLink>
                {item.subItems && ((item.title === "Bills" && isBillsOpen) || (item.title === "Tokens" && isTokensOpen)) && (
                  <div className="absolute mt-4 min-w-[175px] -left-14 shadow-md shadow-neutral-950 menu-secondary py-3 px-4 z-50 border-t-2 border-secondary" onMouseLeave={() => item.title === "Bills" ? setIsBillsOpen(false) : item.title === "Tokens" ? setIsTokensOpen(false) : null}>
                    {item.subItems.map((subItem, subIndex) => (
                      <NavLink key={subIndex} to={subItem.link} className={({ isActive }) => isActive ? "link-active block p-2" : "link block p-2"}>
                        {subItem.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white text-2xl focus:outline-none"
            >
              {isOpen ? "X" : "☰"}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="container max-w-6xl mx-auto lg:hidden flex flex-col">
            <div className="flex flex-col">
              <NavLink to="/" onClick={toggleMenu} className="px-4 py-2 link link-mobile">
                Home
              </NavLink>
              <button onClick={() => setIsBillsOpen(!isBillsOpen)} className="px-4 py-2 text-left link link-mobile">
                Bills
              </button>
              {isBillsOpen && (
                <div className="flex flex-col bg-black bg-opacity-10 border-t-2 border-secondary">
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
              <button onClick={() => setIsTokensOpen(!isTokensOpen)} className="px-4 py-2 text-left link link-mobile">
                Tokens
              </button>
              {isTokensOpen && (
                <div className="flex flex-col bg-black bg-opacity-10 border-t-2 border-secondary">
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

              <div className="flex flex-row px-4 py-2 mb-2 justify-end">
                <Link to="https://discord.com/invite/dcFURChe86">
                  <IconSocialDiscord className="fill-white hover:fill-[#08e8de] transition-colors duration-300 h-[28px] w-[28px]" />
                </Link>

                <ThemeSwitcher />
              </div>
            </div>
            <div onClick={closeMenu} className="left-0 right-0 top-0 bottom-0 fixed bg-black opacity-50 -z-10"></div>
          </div>
        )}
      </nav>
    </div>
  );
};
export default NavBar;
