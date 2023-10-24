import { useState } from "react";
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
    ? "fixed inset-0 bg-indigo-700 z-50"
    : "flex flex-col";

  return (
    <div className={overlayClass}>
      <nav className=" bg-indigo-700">
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
      <nav className="bg-slate-900">
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
            {menu.map((item) => (
              <Link className=" text-white px-4 py-2" to={item.link}>
                {item.title}
              </Link>
            ))}

            {subMenu.map((item) => (
              <Link
                className="bg-indigo-700 px-4 py-2 text-white"
                to={item.link}
              >
                {item.title}
              </Link>
            ))}
            <a className=" bg-indigo-700" href="#">
              <img src={IconDiscord} alt="Discord" className="" />
            </a>
          </div>
        )}
      </nav>
    </div>
  );
};
export default NavBar;
