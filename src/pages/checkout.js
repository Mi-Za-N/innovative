import React from 'react';
import { Modal } from '@redq/reuse-modal';
import Checkout from '../features/checkouts/checkout-two/checkout-two';

import { ProfileProvider } from '../contexts/profile/profile.provider';

const CheckoutPage= ({ deviceType }) => {
  const token = 'true';

  return (
    <>
      <ProfileProvider>
        <Modal>
          <Checkout 
          token={token}
          deviceType={deviceType}
           />
        </Modal>
      </ProfileProvider>
    </>
  );
};

export default CheckoutPage;
