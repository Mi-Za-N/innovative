import React from 'react';
import Moment from 'moment';
import {
  SingleOrderList,
  OrderListHeader,
  TrackID,
  Status,
  OrderMeta,
  Meta,
} from './order-card.style';
import { FormattedMessage } from 'react-intl';

import { CURRENCY } from '../../../../utils/constant';


const OrderCard = ({
  orderId,
  onClick,
  className,
  status,
  date,
  deliveryTime,
  amount,
}) => {
  
  return (
    <>
      <SingleOrderList onClick={onClick} className={className}>
        <OrderListHeader>
          <TrackID>
            <FormattedMessage
              id="intlOrderCardTitleText"
              defaultMessage="Order"
            />
            <span>#{orderId}</span>
          </TrackID>
          <Status>{status}</Status>
        </OrderListHeader>

        <OrderMeta>
          <Meta>
            <FormattedMessage
              id="intlOrderCardDateText"
              defaultMessage="Order Date"
            />
            : <span>{Moment(date).format('DD-MM-YYYY')}</span>
          </Meta>
          <Meta>
            <FormattedMessage
              id="deliveryTimeText"
              defaultMessage="Delivery Time"
            />
            : <span>{deliveryTime}</span>
          </Meta>
          <Meta className="price">
            <FormattedMessage
              id="intlOrderCardTotalText"
              defaultMessage="Total Price"
            />
            :
            <span>
              {CURRENCY}
              {amount}
            </span>
          </Meta>
        </OrderMeta>
      </SingleOrderList>
    </>
  );
};

export default OrderCard;
