import { Link } from "react-router-dom";
import { AlphExplorerLogo } from "../shared/ui/assets/logo/AlphExplorerLogo";
import IconDiscord from "../shared/ui/assets/icons/Ico_Discord.png";

type Menu = {
  title: string;
  link: string;
};

const menu: Menu[] = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Use Cases", link: "/use_cases" },
  { title: "Use Cases", link: "/use_cases" },
];

const FooterBar = () => {
  return (
    <footer className=" bg-[#0c0a3e] h-56 text-white">
      <div className="container max-w-6xl m-auto flex flex-wrap flex-col sm:flex-row justify-center sm:justify-between items-center h-full sm:px-4">
        <div className="my-3 sm:my-0">
          <AlphExplorerLogo className="w-[157px]"/>
        </div>
        <div className=" flex my-3 sm:my-0 text-center">
          {menu.map((item, index) => (
            <div key={index}>
              <Link
                className=" text-xs sm:text-sm text-white px-3 py-2"
                to={item.link}
              >
                {item.title}
              </Link>
              {index < menu.length - 1 && (
                <span className="border-r border-gray-300 h-4 my-auto"></span>
              )}
            </div>
          ))}
        </div>
        <div className="flex my-3 sm:my-0">
          <button className=" bg-indigo-700 rounded-full p-2 mx-1">
            <a href="#">
              <img src={IconDiscord} alt="Discord" className="" />
            </a>
          </button>
          <button className=" bg-indigo-700 rounded-full p-2 mx-1">
            <a href="#">
              <img src={IconDiscord} alt="Discord" className="" />
            </a>
          </button>
          <button className=" bg-indigo-700 rounded-full p-2 mx-1">
            <a href="#">
              <img src={IconDiscord} alt="Discord" className="" />
            </a>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;
