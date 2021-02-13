import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useAppState, useAppDispatch } from "../../../contexts/app/app.provider"
import { MY_ORDER_URL, API_KEY, IMAGE_URL } from '../../../common/baseUrl';
import { Scrollbar } from '../../../components/scrollbar/scrollbar';
import {
  DesktopView,
  MobileView,
  OrderBox,
  OrderListWrapper,
  OrderList,
  OrderDetailsWrapper,
  Title,
  ImageWrapper,
  ItemWrapper,
  ItemDetails,
  ItemName,
  ItemSize,
  ItemPrice,
  NoOrderFound,
} from './order.style';

import OrderDetails from './order-details/order-details';
import OrderCard from './order-card/order-card';
import OrderCardMobile from './order-card/order-card-mobile';
import useComponentSize from '../../../utils/useComponentSize';
import { FormattedMessage } from 'react-intl';

const progressData = ['Order Received', 'Order On The Way', 'Order Delivered'];

const orderTableColumns = [
  {
    title: <FormattedMessage id='cartItems' defaultMessage='Items' />,
    dataIndex: '',
    key: 'items',
    width: 250,
    ellipsis: true,
    render: (text, record) => {
      return (
        <ItemWrapper>
          <ImageWrapper>
            <img src={IMAGE_URL + record.type_id + '/' + record.app_pic1} alt={record.product_title_eng} />
          </ImageWrapper>

          <ItemDetails>
            <ItemName>{record.product_title_eng}</ItemName>
            <ItemSize>{record.weight}</ItemSize>
            <ItemPrice>${record.sale_price}</ItemPrice>
          </ItemDetails>
        </ItemWrapper>
      );
    },
  },
  {
    title: (
      <FormattedMessage id='intlTableColTitle2' defaultMessage='Quantity' />
    ),
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
    width: 100,
  },
  {
    title: <FormattedMessage id='intlTableColTitle3' defaultMessage='Price' />,
    dataIndex: '',
    key: 'price',
    align: 'right',
    width: 100,
    render: (text, record) => {
      return <p>${record.total_price}</p>;
    },
  },
];

const OrdersContent = () => {
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState([]);
  const [orderInfo, setOrderInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("");

  const [targetRef, size] = useComponentSize();
  const orderListHeight = size.height - 79;

  const dispatch = useAppDispatch();
  useEffect(() => {
    let CustInfo = JSON.parse(localStorage.getItem('user'));
    const url = MY_ORDER_URL + CustInfo.mobile + '/' + API_KEY + '/' + 'accesskey';
    console.log(url);
    scroll();
    axios.get(url)
      .then((res) => {
        dispatch({ type: 'SAVE_ORDER_INFO', payload: res.data.orderInfo });
        setLoading(false);
        setActive(res.data.orderInfo);
        if (res.data.orderInfo.length > 0) {
          loadFirstOrder(res.data.orderInfo[0]);
        }
        //
      })
      .catch((error) => {
        console.log('Api call error');
        setError(true)
        setLoading(true);
      })
  }, []);
  const ordersData = useAppState("orderInfo");
  console.log(ordersData);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) return <div>{error.message}</div>;

  const loadFirstOrder = (order) => {
    setActive(order.r_order_id);
    setOrderInfo(order)
    let url = 'https://www.ifamilymart.com.bd/api/getMyOrderDetails/' + order.ref_no;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setVisible(true);
        setOrder(responseJson.orderDetails);
        console.log(responseJson.orderDetails)
      })
      .catch((error) => {
        setVisible(false);
        alert('Internal problem, Please try again laiter.')
      });
  };


  const handleClick = (order) => {
    setActive(order.r_order_id);
    setOrderInfo(order)
    let url = 'https://www.ifamilymart.com.bd/api/getMyOrderDetails/' + order.ref_no;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setVisible(true);
        setOrder(responseJson.orderDetails);
        console.log(responseJson.orderDetails)
      })
      .catch((error) => {
        setVisible(false);
        alert('Internal problem, Please try again laiter.')
      });
  };

  return (
    <OrderBox>
      <DesktopView>
        <OrderListWrapper style={{ height: size.height }}>
          <Title style={{ padding: '0 20px' }}>
            <FormattedMessage
              id='intlOrderPageTitle'
              defaultMessage='My Order'
            />
          </Title>
          <Scrollbar className='order-scrollbar'>
            <OrderList>
              {ordersData.length !== 0 ? (
                ordersData.map((order) => (
                  <OrderCard
                    key={order.r_order_id}
                    orderId={order.r_order_id}
                    className={order.r_order_id === active ? 'active' : ''}
                    status={order.status}
                    date={order.order_date}
                    deliveryTime={order.order_time}
                    amount={order.total_price}
                    onClick={() => {
                      handleClick(order);
                    }}
                  />
                ))
              ) : (
                  <NoOrderFound>
                    <FormattedMessage
                      id='intlNoOrderFound'
                      defaultMessage='No order found'
                    />
                  </NoOrderFound>
                )}
            </OrderList>
          </Scrollbar>
        </OrderListWrapper>

        <OrderDetailsWrapper ref={targetRef}>
          <Title style={{ padding: '0 20px' }}>
            <FormattedMessage
              id='orderDetailsText'
              defaultMessage='Order Details'
            />
          </Title>
          {visible && (
            <OrderDetails
              progressStatus={orderInfo.status}
              progressData={progressData}
              address={orderInfo.deliveryAddress}
              subtotal={orderInfo.sub_total}
              discount={orderInfo.less}
              deliveryFee={orderInfo.delivery_charge}
              grandTotal={orderInfo.total_price}
              tableData={order}
              columns={orderTableColumns}
            />
          )}
        </OrderDetailsWrapper>
      </DesktopView>

      <MobileView>
        <OrderList>
          <OrderCardMobile
            orders={ordersData}
            // className={order && order.id === active ? 'active' : ''}
            progressData={progressData}
            columns={orderTableColumns}
          // onClick={() => {
          //   handleClick(order);
          // }}
          />
        </OrderList>
      </MobileView>
    </OrderBox>
  );
};

export default OrdersContent;
