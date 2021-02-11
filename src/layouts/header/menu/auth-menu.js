import React,{ useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '../../../components/button/button';
import { FormattedMessage } from 'react-intl';
import Popover from '../../../components/popover/popover';
import { AuthorizedMenu } from './authorized-menu';
import AuthenticationForm from '../../../features/authentication-form';
import { openModal } from '@redq/reuse-modal';
import { useDispatch, useSelector} from "react-redux";
import { isLogin } from "../../../store/actions/webDataInfo";


const AuthMenu = () => {
  const Login = useSelector((state) => state.dataInfo.isLogin);
  const dispatch = useDispatch();
  const Router = useRouter();
  // const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    let CustInfo = JSON.parse(localStorage.getItem('user'));
    if (CustInfo !== null) {
     dispatch(isLogin(true));
    }
  }, []);
  const handleSubmit = async () => {
    Router.push('/order');
  };

  const handleLogOut = async () => {
    localStorage.removeItem('user');
    dispatch(isLogin(false));
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
