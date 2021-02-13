import React from 'react';
import { IMAGE_URL} from "../../common/baseUrl"
import { Counter } from '../counter/counter';
import { TrashIcon } from '../../assets/icons/CloseIcon';
import { CURRENCY } from '../../utils/constant';
import {
  ItemBox,
  Image,
  Information,
  Name,
  Price,
  Weight,
  Total,
  RemoveButton,
} from './cart-item.style';

export const CartItem = ({
  data,
  onDecrement,
  onIncrement,
  onRemove,
}) => {
  // console.log(data);
  // const { title, image, price, salePrice, unit, quantity } = data;
  // const displayPrice = salePrice ? salePrice : price;
  return (
    <ItemBox>
      <Counter
        value={data.quantity}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        variant="lightVertical"
      />
      <Image 
        src={IMAGE_URL + data.type_id+'/'+data.web_pic1}
       />
      <Information>
        <Name>{data.product_title_eng}</Name>
        <Price>
          {CURRENCY}
          {data.sale_price}
        <Total>
           {CURRENCY}
          {(data.quantity * data.sale_price).toFixed(2)}
        </Total>
        </Price>
        <Weight>
          {data.quantity} X {data.unit}
        </Weight>
      </Information>
      <RemoveButton onClick={onRemove}>
        <TrashIcon />
      </RemoveButton>
    </ItemBox>
  );
};
