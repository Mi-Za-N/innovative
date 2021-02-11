import React, { useContext } from 'react';
import { openModal } from '@redq/reuse-modal';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import {openSidbar} from "../../store/actions/webDataInfo"
import Drawer from '../../components/drawer/drawer';
import { CloseIcon } from '../../assets/icons/CloseIcon';
import { AuthContext } from '../../contexts/auth/auth.context';
import AuthenticationForm from '../../features/authentication-form';
import {
  DrawerBody,
  HamburgerIcon,
  DrawerContentWrapper,
  DrawerClose,
  DrawerProfile,
  LogoutView,
  LoginView,
  UserAvatar,
  UserDetails,
  DrawerMenu,
  DrawerMenuItem,
  UserOptionMenu,
} from './header.style';
// import UserImage from '../../assets/images/user.jpg';
import {
  MOBILE_DRAWER_MENU,
  PROFILE_PAGE,
} from '../../site-settings/site-navigation';
import { useAppState, useAppDispatch } from '../../contexts/app/app.provider';

const MobileDrawer = () => {
    



  const isDrawerOpen = useAppState('isDrawerOpen');
  const dispatch = useDispatch();
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext(AuthContext);
  // Toggle drawer
  const toggleHandler = () => {
    dispatch(openSidbar("1"));
    // console.log("okay");
  };

 


  return (
  <Drawer
      width='316px'
      drawerHandler={
        <HamburgerIcon>
          <span />
          <span />
          <span />
        </HamburgerIcon>
      }
      open={isDrawerOpen}
      toggleHandler={toggleHandler}
      closeButton={
        <DrawerClose>
          <CloseIcon />
        </DrawerClose>
      }
    >
     
   </Drawer>
  );
};

export default MobileDrawer;

//  <DrawerBody>
//         <Scrollbar className='drawer-scrollbar'>
//           <DrawerContentWrapper>
//             <DrawerProfile>
//               {isAuthenticated ? (
//                 <LoginView>
//                   <UserAvatar>
//                     <img src={UserImage} alt='user_avatar' />
//                   </UserAvatar>
//                   <UserDetails>
//                     <h3>David Kinderson</h3>
//                     <span>+990 374 987</span>
//                   </UserDetails>
//                 </LoginView>
//               ) : (
//                 <LogoutView>
//                   <Button variant='primary' onClick={signInOutForm}>
//                     {/* <FormattedMessage
//                       id='mobileSignInButtonText'
//                       defaultMessage='join'
//                     /> */}
//                     Join
//                   </Button>
//                 </LogoutView>
//               )}
//             </DrawerProfile>

//             <DrawerMenu>
//               {MOBILE_DRAWER_MENU.map((item) => (
//                 <DrawerMenuItem key={item.id}>
//                   <NavLink
//                     onClick={toggleHandler}
//                     href={item.href}
//                     label={item.defaultMessage}
//                     intlId={item.id}
//                     className='drawer_menu_item'
//                   />
//                 </DrawerMenuItem>
//               ))}
//             </DrawerMenu>

//             {isAuthenticated && (
//               <UserOptionMenu>
//                 <DrawerMenuItem>
//                   <NavLink
//                     href={PROFILE_PAGE}
//                     label='Your Account Settings'
//                     className='drawer_menu_item'
//                     intlId='navlinkAccountSettings'
//                   />
//                 </DrawerMenuItem>
//                 <DrawerMenuItem>
//                   <div onClick={handleLogout} className='drawer_menu_item'>
//                     <span className='logoutBtn'>
//                       <FormattedMessage
//                         id='navlinkLogout'
//                         defaultMessage='Logout'
//                       />
//                     </span>
//                   </div>
//                 </DrawerMenuItem>
//               </UserOptionMenu>
//             )}
//           </DrawerContentWrapper>
//         </Scrollbar>
//       </DrawerBody>
