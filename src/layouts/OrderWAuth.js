import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../components/button/button';
import AuthenticationForm from '../features/authentication-form';
import { openModal } from '@redq/reuse-modal';
import { RightMenuBox } from '../layouts/header/menu/right-menu/right-menu.style';
import { useAppState, useAppDispatch } from "../contexts/app/app.provider"

const AuthMenu = () => {
  const Router = useRouter();
  const dispatch = useAppDispatch();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    let CustInfo = JSON.parse(localStorage.getItem('user'));
    if (CustInfo !== null) {
      setIsLogin(true);
    }
  }, []);
  const handleSubmit = async () => {
    Router.push('/order');
  };

  const handleLogOut = async () => {
    dispatch({ type: 'IS_SIDEBAR_OPEN', payload: '0' });
    localStorage.removeItem('user');
    setIsLogin(false);
  };

  const handleJoin = () => {
    dispatch({ type: 'IS_SIDEBAR_OPEN', payload: '0' });

    openModal({
      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: '',
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'quick-view-modal',
        width: 458,
        height: 'auto',
      },
    });
  };

  return !isLogin ? (
    <Button variant="primary" onClick={handleJoin}>
      Login
    </Button>
  ) : (
      <RightMenuBox>
        <Button variant="primary" onClick={handleSubmit}>
          My Order
      </Button>
       &nbsp; &nbsp;
        <Button variant="primary" onClick={handleLogOut}>
          Logout
    </Button>
      </RightMenuBox>
    );
};
export default AuthMenu;


