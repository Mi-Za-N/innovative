import React from 'react';
import Router from 'next/router';
import { LogoBox, LogoImage } from './logo.style';


const Logo = ({ imageUrl, alt, onClick }) => {
  function onLogoClick() {
    Router.push('/');
    if (onClick) {
      onClick();
    }
  }
  return (
    <LogoBox onClick={onLogoClick}>
      <LogoImage src={imageUrl} alt={alt} />
    </LogoBox>
  );
};

export default Logo;
