import React, { useState, useEffect } from 'react';
import {
  WalkerWrapper,
  Category,
  NoCategory,
  IconWrapper,
  CategoryWrapper,
} from './category-walker.style';
import { Button } from '../../components/button/button';
import {HamburgerIcon} from '../../layouts/header/header.style';
import SpringModal from '../../components/spring-modal/spring-modal';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';



const CategoryWalker = ({
  style,
  className,
  children,
}) => {
  let [isOpen, setOpen] = useState(false);
  const { query } = useRouter();
  const isSidebarOpen = useSelector((state) => state.dataInfo.isSidebarOpen);
  // console.log(isSidebarOpen);
  if(isSidebarOpen === "1"){
    isOpen = true;
  }
  return (
    <WalkerWrapper style={style} className={className}>
      

      {/* <Button variant='text' >
        Filter
      </Button> */}
      <SpringModal isOpen={isOpen} onRequestClose={() => setOpen(false)}>
        {children}
      </SpringModal>
    </WalkerWrapper>
  );
};

export default CategoryWalker;
