import React from 'react';
import Logo from '../../../logo/logo';
import {
  LeftMenuBox,
} from './left-menu.style';

export const LeftMenu = ({ logo }) => {
  return (
    <LeftMenuBox>
      <Logo
        imageUrl={logo}
        alt={'Shop Logo'}
      />
    </LeftMenuBox>
  );
};


{/* <MainMenu>
        <Popover
          className="right"
          handler={ */}
      //       <SelectedItem>
      //         <span>
      //           <Icon>
      //             {/* <CategoryIcon  /> */}
      //           </Icon>
      //           <span>
      //             {/* <FormattedMessage
                    
      //               // defaultMessage={activeMenu?.defaultMessage}
      //             /> */}
      //           </span>
      //         </span>
      //         <Arrow>
      //           <MenuDown />
      //         </Arrow>
      //       </SelectedItem>
      //     }
      //     // content={<CategoryMenu  />}
      //   />
      // </MainMenu>