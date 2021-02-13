import React from 'react';
import dynamic from 'next/dynamic';
import { IMAGE_URL} from "../../../common/baseUrl"
import {
  ProductsRow,
  ProductsCol,
  ButtonWrapper,
  LoaderWrapper,
  LoaderItem,
  ProductCardWrapper,
} from './product-list.style';
import { CURRENCY } from '../../../utils/constant';
import Fade from 'react-reveal/Fade';


const GeneralCard = dynamic(
  import('../../product-card/product-card-one/product-card-one')
);

export const Products = ({
  deviceType,
  fetchLimit = 20,
  loadMore = true,
  type,
  productList,
  ...props
}) => {
  // const handleLoadMore = () => {
  //   fetchMore({
  //     variables: {
  //       offset: Number(data.products.items.length),
  //       limit: fetchLimit,
  //     },
  //   });
  // };
    const renderCard = (product) => {
        return (
          <GeneralCard
            title={product.product_title_eng}
            // description={product.description}
            image={IMAGE_URL + product.type_id+'/'+product.web_pic1}
                weight={product.size}
            currency={CURRENCY}
            price={product.sale_price}
            // salePrice={product.salePrice}
            // discountInPercent={product.discountInPercent}
            data={product}
            deviceType={deviceType}
             
          />
        )
  };
  return (
    <>
     <ProductsRow>
        {productList.map((product, index) => (
          <ProductsCol
            key={product.product_id}
          >
            <ProductCardWrapper>
              <Fade
                duration={800}
                delay={index * 10}
                style={{ height: '100%' }}
              >
                 {renderCard(product)}
                
              </Fade>
            </ProductCardWrapper>
          </ProductsCol>
        ))}
          
      </ProductsRow>
    </>
  );
};
export default Products;
