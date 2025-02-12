import React from 'react';
import { Link } from 'react-router-dom';
import ExplorerLogo from '../../assets/ab-explorer-ico.svg?react';
import DiscordIcon from '../../assets/discord-ico.svg?react';
import GitHubIcon from '../../assets/github-ico.svg?react';
import XIcon from '../../assets/x-ico.svg?react';
import LinkedInIcon from '../../assets/linkedin-ico.svg?react';
import YoutubeIcon from '../../assets/youtube-ico.svg?react';

type Menu = {
  title: string;
  link: string;
};

type SocialLink = {
  url: string;
  icon?: React.ReactNode;
};

const menu: Menu[] = [
  { title: 'Alphabill', link: 'https://alphabill.org/' },
  { title: 'Docs', link: 'https://docs.alphabill.org/welcome' },
  {
    title: 'Whitepaper',
    link: 'https://alphabill.org/files/AlphaBill%20Whitepaper.pdf',
  },
];

const socials: SocialLink[] = [
  {
    url: 'https://discord.com/invite/dcFURChe86',
    icon: <DiscordIcon className="link-icon" />,
  },
  {
    url: 'https://github.com/alphabill-org',
    icon: <GitHubIcon className="link-icon" />,
  },
  {
    url: 'https://twitter.com/alphabill_org',
    icon: <XIcon className="link-icon" />,
  },
  {
    url: 'https://www.linkedin.com/company/alphabill/',
    icon: <LinkedInIcon className="link-icon" />,
  },
  {
    url: 'https://www.youtube.com/@alphabill122/featured',
    icon: <YoutubeIcon className="link-icon" />,
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary min-h-[123px] lg:min-h-[115px] flex text-white">
      <div className="container max-w-6xl m-auto flex flex-wrap flex-col md:flex-row justify-between items-center py-4 sm:px-4 md:py-6 lg:py-7">
        <Link to="/">
          <ExplorerLogo />
        </Link>
        <div className=" flex my-3 sm:my-5 md:my-0 text-center">
          {menu.map((item, index) => (
            <div key={index}>
              <Link
                key={index}
                className="link text-base px-3 py-2"
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
        <div className="flex my-3 md:my-0">
          {socials.map((item, index) => (
            <Link key={index} to={item.url}>
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
