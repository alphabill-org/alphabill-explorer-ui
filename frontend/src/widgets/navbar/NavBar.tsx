import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logoImg from "../../shared/ui/assets/logo/logo.png";
import IconDiscord from "../../shared/ui/assets/icons/Ico_Discord.png";

type Menu = {
  title: string;
  link: string;
};

const subMenu: Menu[] = [
  { title: "Docs", link: "/docs" },
  { title: "Blog", link: "/blog" },
];

const menu: Menu[] = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Use Cases", link: "/use_cases" },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const overlayClass = isOpen
    ? "fixed inset-0 z-50"
    : "flex flex-col";

  useEffect(() => {
    const closeMenu = () => {
      setIsOpen(false);
    };

    window.addEventListener('resize', closeMenu);

    return () => window.removeEventListener('resize', closeMenu);
  }, [isOpen]);

  return (
    <div className={overlayClass}>
      <nav className=" bg-[#4e3fb6]">
        <div className=" container max-w-6xl mx-auto justify-end hidden sm:flex space-x-4 px-4 py-1">
          {subMenu.map((item) => (
            <Link className=" text-white " to={item.link}>
              {item.title}
            </Link>
          ))}
          <a href="#">
            <img src={IconDiscord} alt="Discord" className="" />
          </a>
        </div>
      </nav>
      <nav className={`${isOpen ? "bg-[#4e3fb6]" : "bg-[#0c0a3e]"} transition-all duration-100`}>
        <div className="container max-w-6xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <div className="text-white text-xl font-semibold">
              <img src={logoImg} alt="Logo" className="" />
            </div>
          </div>

          <div className="hidden sm:flex space-x-4">
            {menu.map((item) => (
              <Link className=" text-white" to={item.link}>
                {item.title}
              </Link>
            ))}
          </div>

          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-white text-2xl focus:outline-none"
            >
              {isOpen ? "X" : "☰"}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="sm:hidden flex flex-col">
            <div className="flex flex-col">
              {menu.map((item) => (
                <Link onClick={toggleMenu} className=" text-white px-4 py-2" to={item.link}>
                  {item.title}
                </Link>
              ))}

              {subMenu.map((item) => (
                <Link
                  className="px-4 py-2 text-white"
                  to={item.link}
                >
                  {item.title}
                </Link>
              ))}

              <span className="h-[2px] bg-black bg-opacity-20 mr-4 ml-4 my-2"></span>

              <div className="flex flex-row px-4 py-2 mb-2 justify-between">
                <div className="flex flex-row">
                  <p className=" font-medium text-white"> ALPHA: 100$</p>
                  <p className="text-[#08e8de] ml-1">(+1.06%)</p>
                </div>

                <p className=" font-medium text-white"> TxFee: 1 ALPHA</p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};
export default NavBar;
