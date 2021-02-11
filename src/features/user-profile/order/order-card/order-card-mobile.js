import React, {useState} from 'react';
import Moment from 'moment';
import Table from 'rc-table';
import Collapse, { Panel } from 'rc-collapse';

import {
  OrderListHeader,
  TrackID,
  Status,
  OrderMeta,
  Meta,
  CardWrapper,
  OrderDetail,
  DeliveryInfo,
  DeliveryAddress,
  Address,
  CostCalculation,
  PriceRow,
  Price,
  ProgressWrapper,
  OrderTable,
  OrderTableMobile,
} from './order-card.style';

import { CURRENCY } from '../../../../utils/constant';


const components = {
  table: OrderTable,
};

const OrderCard = ({
  onClick,
  className,
  columns,
  progressData,
  orders,
}) => {
    const [visible, setVisible] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);
    const [orderInfo, setOrderInfo] = useState("");
  //   const displayDetail = className === 'active' ? '100%' : '0';
  const addAllClasses = ['accordion'];

  if (className) {
    addAllClasses.push(className);
  }

   const handleClick = (order) => {
     console.log(order.ref_no);
    setOrderInfo(order)
    let url ='https://www.ifamilymart.com.bd/api/getMyOrderDetails/' + order.ref_no;
     fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            setVisible(true);
            setOrderDetails(responseJson.orderDetails);
          })
          .catch((error) => {
            setVisible(false);
              alert('Internal problem, Please try again laiter.')
          });
  };


  return (
    <>
      <Collapse
        accordion={true}
        className={addAllClasses.join(' ')}
        defaultActiveKey="active"
      >
        {orders.map((order) => (
          <Panel
            header={
              <CardWrapper onClick={() => {
                      handleClick(order);
                    }}>
                <OrderListHeader>
                  <TrackID>
                    Order <span>#{order.r_order_id}</span>
                  </TrackID>
                  <Status>{progressData[order.status - 1]}</Status>
                </OrderListHeader>

                <OrderMeta>
                  <Meta>
                    Order Date: <span>{Moment(order.order_date).format('DD-MM-YYYY')}</span>
                  </Meta>
                  <Meta>
                    Delivery Time: <span>{order.order_time}</span>
                  </Meta>
                  <Meta className="price">
                    Total Price:
                    <span>
                      {CURRENCY}
                      {order.total_price}
                    </span>
                  </Meta>
                </OrderMeta>
              </CardWrapper>
            }
            headerClass="accordion-title"
            key={order.r_order_id}
          >
            <OrderDetail>
              <DeliveryInfo>
                {/* <DeliveryAddress>
                  <h3>Delivery Address</h3>
                  <Address>{order.deliveryAddress}</Address>
                </DeliveryAddress> */}

                <CostCalculation>
                  <PriceRow>
                    Subtotal
                    <Price>
                      {CURRENCY}
                      {order.sub_total}
                    </Price>
                  </PriceRow>
                  <PriceRow>
                    Discount
                    <Price>
                      {CURRENCY}
                      {order.discount}
                    </Price>
                  </PriceRow>
                  <PriceRow>
                    Delivery Fee
                    <Price>
                      {CURRENCY}
                      {order.delivery_charge}
                    </Price>
                  </PriceRow>
                  <PriceRow className="grandTotal">
                    Total
                    <Price>
                      {CURRENCY}
                      {order.total_price}
                    </Price>
                  </PriceRow>
                </CostCalculation>
              </DeliveryInfo>

              <OrderTableMobile>
                <Table
                  columns={columns}
                  data={orderDetails}
                  rowKey={(record) => record.id}
                  components={components}
                  scroll={{ x: 450 }}
                  // scroll={{ y: 250 }}
                />
              </OrderTableMobile>
            </OrderDetail>
          </Panel>
        ))}
      </Collapse>
    </>
  );
};

export default OrderCard;
