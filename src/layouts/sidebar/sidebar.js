import React from 'react';
import OrderWAuth from "../../layouts/OrderWAuth"
import Sticky from 'react-stickynode';
import { Scrollbar } from '../../components/scrollbar/scrollbar';
import { useAppState } from '../../contexts/app/app.provider';
import CategoryWalker from '../../components/category-walker/category-walker';
import {
  CategoryWrapper,
  TreeWrapper,
  PopoverWrapper,
  SidebarWrapper,
  RequestMedicine,
} from './sidebar.style';

import { TreeMenu } from '../../components/tree-menu/tree-menu';




const SidebarCategory = ({
  sidebar,
  clickOnCategory,
  // deviceType: { mobile, tablet, desktop },
  type,
}) => {
  // console.log(data);
  const isSidebarSticky = useAppState('isSidebarSticky');

   const onCategoryClick = (id,name) => {
    clickOnCategory(id,name);    
  };
  // }
  return (
    <CategoryWrapper>
      <PopoverWrapper>
        <CategoryWalker>
          <OrderWAuth />
          <TreeMenu
            data={sidebar}
            onClick={onCategoryClick}
            active={false}
          />
        </CategoryWalker>
      </PopoverWrapper>

      <SidebarWrapper style={{ paddingTop: type === 'medicine' ? 0 : 50 }}>
        <Sticky enabled={isSidebarSticky} top={type === 'medicine' ? 89 : 110}>
          <Scrollbar className="sidebar-scrollbar">
            <TreeWrapper>
              <TreeMenu
                data={sidebar}
                onClick={onCategoryClick}
                active={false}
                
              />
            </TreeWrapper>
          </Scrollbar>
        </Sticky>
      </SidebarWrapper>
    </CategoryWrapper>
  );
};

export default SidebarCategory;
