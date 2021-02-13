import React,{ useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '../../../components/button/button';
import { FormattedMessage } from 'react-intl';
import Popover from '../../../components/popover/popover';
import { AuthorizedMenu } from './authorized-menu';
import AuthenticationForm from '../../../features/authentication-form';
import { openModal } from '@redq/reuse-modal';
import { useAppState, useAppDispatch } from "../../../contexts/app/app.provider"

const AuthMenu = () => {
  const Login = useAppState("isLogin");
  const dispatch = useAppDispatch();
  const Router = useRouter();
  
  useEffect(() => {
    let CustInfo = JSON.parse(localStorage.getItem('user'));
    if (CustInfo !== null) {
      dispatch({ type: 'IS_LOGIN', payload: true });
    }
  }, []);
  const handleSubmit = async () => {
    Router.push('/order');
  };

  const handleLogOut = async () => {
    localStorage.removeItem('user');
    dispatch({ type: 'IS_LOGIN', payload: false });
  };

  const handleJoin = () => {

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

  return Login === false ? (
    <Button variant="primary" onClick={handleJoin}>
      Login
    </Button>
  ) : (
      <>
        <Button variant="primary" onClick={handleSubmit}>
          My Order
      </Button>
       &nbsp; &nbsp;
        <Button variant="primary" onClick={handleLogOut}>
          Logout
    </Button>
      </>
      // <Popover
      //   direction="right"
      //   className="user-pages-dropdown"
      //   handler={<img src={avatar} alt="user" />}
      //   content={<AuthorizedMenu onLogout={onLogout} />}
      // />
    );
};
export default AuthMenu;
