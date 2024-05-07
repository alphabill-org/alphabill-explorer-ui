import { Link, NavLink } from "react-router-dom";
import { AlphExplorerLogo } from "../shared/ui/assets/logo/AlphExplorerLogo";
import { IconSocialGithub, IconSocialDiscord, IconSocialTwitter, IconSocialLinkedIn, IconSocialYoutube } from "../shared/ui/icons";

type Menu = {
  title: string;
  link: string;
};

type SocialLink = {
  link: string,
  icon: React.FC<{ className?: string }>,
};

const menu: Menu[] = [
  { title: "Alphabill", link: "https://alphabill.org/" },
  { title: "Docs", link: "https://docs.alphabill.org/docs/welcome" },
  { title: "Whitepaper", link: "https://alphabill.org/files/AlphaBill%20Whitepaper.pdf" },
];

const socials: SocialLink[] = [
  { link: "https://discord.com/invite/dcFURChe86", icon: IconSocialDiscord },
  { link: "https://github.com/alphabill-org", icon: IconSocialGithub},
  { link: "https://twitter.com/alphabill_org", icon: IconSocialTwitter},
  { link: "https://www.linkedin.com/company/alphabill/", icon: IconSocialLinkedIn},
  { link: "https://www.youtube.com/@alphabill122/featured", icon: IconSocialYoutube}
]

const FooterBar = () => {
  return (
    <footer className=" bg-[#0c0a3e] h-40 text-white">
      <div className="container max-w-6xl m-auto flex flex-wrap flex-col sm:flex-row justify-center sm:justify-between items-center h-full sm:px-4">
        <NavLink to="/" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })} className="my-3 sm:my-0">
          <AlphExplorerLogo className="w-[157px]" />
        </NavLink>
        <div className=" flex my-3 sm:my-0 text-center">
          {menu.map((item, index) => (
            <div key={index}>
              <Link key={index} className="link text-xs sm:text-base px-3 py-2"
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
          {socials.map((item, index) => (
            <Link key={index} to={item.link}>
              <item.icon className="link-icon mx-2"/>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;
