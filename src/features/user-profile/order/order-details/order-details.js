import React from 'react';
import Table from 'rc-table';
import {
  DeliveryInfo,
  DeliveryAddress,
  Address,
  CostCalculation,
  PriceRow,
  Price,
  ProgressWrapper,
  OrderTableWrapper,
  OrderTable,
} from './order-details.style';
import { CURRENCY } from '../../../../utils/constant';
import { FormattedMessage } from 'react-intl';



const components = {
  table: OrderTable,
};

const OrderDetails = ({
  tableData,
  columns,
  address,
  progressStatus,
  progressData,
  subtotal,
  discount,
  deliveryFee,
  grandTotal,
}) => {
  console.log(tableData);
  return (
    <>
     <OrderTableWrapper>
    
        <Table
          columns={columns}
          data={tableData}
          rowKey={(record) => record.id}
          components={components}
          className="orderDetailsTable"
          // scroll={{ y: 350 }}
        />
      </OrderTableWrapper>

      

        {/* <ProgressWrapper>
        <Progress data={progressData} status={progressStatus} />
      </ProgressWrapper> */}

      <DeliveryInfo>
        <DeliveryAddress>
          {/* <h3>
            <FormattedMessage
              id="deliveryAddressTitle"
              defaultMessage="Delivery Address"
            />
          </h3>
          <Address>{address}</Address> */}
        </DeliveryAddress>

        <CostCalculation>
          <PriceRow>
            <FormattedMessage id="subTotal" defaultMessage="Sub total" />
            <Price>
              {CURRENCY}
              {subtotal}
            </Price>
          </PriceRow>
          <PriceRow>
            <FormattedMessage
              id="intlOrderDetailsDiscount"
              defaultMessage="Discount"
            />
            <Price>
              {CURRENCY}
              {discount}
            </Price>
          </PriceRow>
          <PriceRow>
            <FormattedMessage
              id="intlOrderDetailsDelivery"
              defaultMessage="Delivery Fee"
            />
            <Price>
              {CURRENCY}
              {deliveryFee}
            </Price>
          </PriceRow>
          <PriceRow className="grandTotal">
            <FormattedMessage id="totalText" defaultMessage="Total" />
            <Price>
              {CURRENCY}
              {grandTotal}
            </Price>
          </PriceRow>
        </CostCalculation>
      </DeliveryInfo> 
    </>
  );
};

export default OrderDetails;
