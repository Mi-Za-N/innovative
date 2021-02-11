import React from 'react';
import dynamic from 'next/dynamic';
import { RightMenuBox } from './right-menu.style';
const AuthMenu = dynamic(() => import('../auth-menu'), { ssr: false });

export const RightMenu = ({
  onLogout,
  avatar,
  isAuthenticated,
  onJoin,
}) => {
  return (
    <RightMenuBox>
      {/* <NavLink
        className="menu-item"
        href={OFFER_MENU_ITEM.href}
        label={OFFER_MENU_ITEM.defaultMessage}
        // intlId={OFFER_MENU_ITEM.id}
      />
      <NavLink
        className="menu-item"
        href={HELP_MENU_ITEM.href}
        label={HELP_MENU_ITEM.defaultMessage}
        // intlId={HELP_MENU_ITEM.id}
        iconClass="menu-icon"
        icon={<HelpIcon />}
      /> */}
      {/* <LanguageSwitcher /> */}

      <AuthMenu
        avatar={avatar}
        onJoin={onJoin}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
      />
    </RightMenuBox>
  );
};
