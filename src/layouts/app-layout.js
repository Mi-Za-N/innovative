import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Sticky from 'react-stickynode';
import { useAppState } from '../contexts/app/app.provider';
import Header from './header/header';
import Footer from "./footer"
import { LayoutWrapper } from './layout.style';
import { isCategoryPage } from './is-home-page';
const MobileHeader = dynamic(() => import('./header/mobile-header'), {
  ssr: false,
});



const Layout = ({
  className,
  children,
  // deviceType: { mobile, tablet, desktop },
  token,
}) => {
  const { pathname, query } = useRouter();
  const isSticky =
    useAppState('isSticky') ||
    pathname === '/furniture-two' ||
    pathname === '/grocery-two';

  const isHomePage = isCategoryPage(query.type) || pathname === '/bakery';
  return (
    <LayoutWrapper className={`layoutWrapper ${className}`}>
      <Sticky enabled={isSticky} innerZ={1001}>
        <MobileHeader
          className={`${isSticky ? 'sticky' : 'unSticky'} ${
            isHomePage ? 'home' : ''
          } desktop`}
        />

        <Header />
      </Sticky>
      {children}
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
