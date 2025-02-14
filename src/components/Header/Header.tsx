import React from 'react';
import { Link } from 'react-router-dom';

import HeaderMenu from './HeaderMenu';
import ExplorerLogo from '../../assets/ab-explorer-ico.svg?react';
import DiscordIcon from '../../assets/discord-ico.svg?react';

interface IMenuItem {
  label?: string;
  url: string;
  icon?: React.ReactNode;
}

const menuItems: IMenuItem[] = [
  {
    label: 'Docs',
    url: 'https://docs.alphabill.org/',
  },
  {
    label: 'Whitepaper',
    url: 'https://alphabill.org/files/AlphaBill%20Whitepaper.pdf',
  },
  {
    icon: <DiscordIcon className="!w-7 h-7 link-icon" />,
    url: 'https://discord.com/invite/dcFURChe86',
  },
];

export const Header: React.FC = () => {
  return (
    <div className="header flex flex-col">
      <div className="header-top w-full">
        <div className="container max-w-6xl mx-auto px-4 flex justify-end py-1">
          <ul className="flex gap-4 items-center">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href={item.url} className="link">
                  {item.icon ? item.icon : item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="header-bottom w-full">
        <div className="container max-w-6xl mx-auto p-4">
          <nav className="flex justify-between">
            <div className="flex items-center">
              <Link to="/">
                <ExplorerLogo />
              </Link>
            </div>
            <HeaderMenu />
          </nav>
        </div>
      </div>
    </div>
  );
};
