import React from "react";

import Order from '../features/user-profile/order/order';
import {
  PageWrapper,
  SidebarSection,
} from '../features/user-profile/user-profile.style';
import { Modal } from '@redq/reuse-modal';

const OrderPage= () => {


  return (
    <>
      <Modal>
        <PageWrapper>

          <Order />
        </PageWrapper>
      </Modal>
    </>
  );
};

export default OrderPage;
