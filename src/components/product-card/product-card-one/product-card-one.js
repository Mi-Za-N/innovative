// product card for general
import dynamic from 'next/dynamic';
import React from 'react';
import Image from '../../image/image';
import { Button } from '../../button/button';
import {
  ProductCardWrapper,
  ProductImageWrapper,
  ProductInfo,
  DiscountPercent,
  ButtonText,
} from '../product-card.style';
import { useCart } from '../../../contexts/cart/use-cart';
import { Counter } from '../../counter/counter';
import { cartAnimation } from '../../../utils/cart-animation';
import { FormattedMessage } from 'react-intl';
import { CartIcon } from '../../../assets/icons/CartIcon';
import { useModal } from '../../../contexts/modal/use-modal';
import { useRouter } from 'next/router';
const QuickViewMobile = dynamic(
  () => import('../../../features/quick-view/quick-view-mobile')
);

const ProductCard = ({
  title,
  image,
  weight,
  price,
  salePrice,
  discountInPercent,
  cartProducts,
  addToCart,
  updateCart,
  value,
  currency,
  onChange,
  increment,
  decrement,
  data,
  deviceType,
  ...props
}) => {
  // console.log(data);
  const router = useRouter();
  const [showModal, hideModal] = useModal(
    () => (
      <QuickViewMobile
        modalProps={data}
        hideModal={hideModal}
        deviceType={deviceType}
      />
    ),
    {
      onClose: () => {
        const { pathname, query, asPath } = router;
        const as = asPath;
        router.push(
          {
            pathname,
            query,
          },
          as,
          {
            shallow: true,
          }
        );
      },
    }
  );
  const { addItem, removeItem, getItem, isInCart } = useCart();
  const handleAddClick = (e) => {
    e.stopPropagation();
    addItem(data);
    if (!isInCart(data.product_id)) {
      cartAnimation(e);
    }
  };
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(data);
  };
  const handleQuickViewModal = () => {
    const { pathname, query } = router;
    const as = `/product/${data.slug}`;
    if (pathname === '/product/[slug]') {
      router.push(pathname, as);
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
      return;
    }
    showModal();
    router.push(
      {
        pathname,
        query,
      },
      {
        pathname: as,
      },
      {
        shallow: true,
      }
    );
  };
// console.log(data);
  return (
    <ProductCardWrapper onClick={handleQuickViewModal} className="product-card">
     
      <ProductImageWrapper>
        <Image
          url={image}
          className="product-image"
          style={{ position: 'relative' }}
          alt={title}
        />
        {/* {discountInPercent ? (
          <DiscountPercent>{discountInPercent}%</DiscountPercent>
        ) : null} */}
      </ProductImageWrapper>
      <ProductInfo>
        <h3 className="product-title">{title}</h3>
        <span className="product-weight">{weight}</span>
        <div className="product-meta">
          <div className="productPriceWrapper">
            {data.max_retail_price > 0 ? (
              <span className="discountedPrice">
                {currency}
                {data.max_retail_price}
              </span>
            ) : null}

            <span className="product-price">
              {currency}
              { price}
            </span>
          </div>
          {data.is_available > 0 ? (
            <>
            {!isInCart(data.product_id) ? (
            <Button
              className="cart-button"
              variant="secondary"
              borderRadius={100}
              onClick={handleAddClick}
            >
              <CartIcon mr={2} />
              <ButtonText>
                <FormattedMessage id="addCartButton" defaultMessage="Cart" />
              </ButtonText>
            </Button>
          ) : (
            <Counter
              value={getItem(data.product_id).quantity}
              onDecrement={handleRemoveClick}
              onIncrement={handleAddClick}
              className="card-counter"
            />
          )}
          </>
          ) : (
             <Button
              className="card-counter"
              variant="secondary"
              borderRadius={100}
            >
              <ButtonText>
                <FormattedMessage id="addCartButton" defaultMessage="Stock out" />
              </ButtonText>
            </Button>
          )}
          
        </div>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ProductCard;
