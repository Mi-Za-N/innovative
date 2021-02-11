import React, { useEffect, useState } from "react";
import { baseURL, subTypeURL } from "../common/baseUrl";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { saveProduct,saveOrder, clickedProduct, isStateUpdated, openSidbar } from "../store/actions/webDataInfo";
import { useRefScroll } from '../utils/use-ref-scroll';
import dynamic from 'next/dynamic';
import { MobileBanner } from '../components/banner/mobile-banner';
import { Modal } from '@redq/reuse-modal';

import {
  MainContentArea,
  SidebarSection,
  ContentSection,
  ProductsRow,
  OfferSection,
  MobileCarouselDropdown,
} from '../assets/styles/pages.style';
import { ModalProvider } from '../contexts/modal/modal.provider';
const Sidebar = dynamic(() => import('../layouts/sidebar/sidebar'));

const Product = dynamic(() =>
  import('../components/product-grid/product-list/product-list')
);
const CartPopUp = dynamic(() => import('../features/carts/cart-popup'));

import { Banner } from '../components/banner/banner-two';
// import FurnitureImgOne from '../assets/images/banner/furniture-banner-1.jpg';
// import FurnitureImgTwo from '../assets/images/banner/furniture-banner-2.jpg';

const HomeScreen = ({ deviceType }) => {
  let [products, setProducts] = useState([]);
  const [sidebarItem, setSidebar] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [loadData, setLoadData] = useState(true)

  const { elRef: targetRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -110,
  });

  const dispatch = useDispatch();
  const status = useSelector((state) => state.dataInfo.statusUpdate);

  useEffect(() => {
    scroll();
    axios.get(baseURL + '11')
      .then((res) => {
        setSidebar(res.data.sidebar.menu_item);
        dispatch(saveProduct(res.data.sametypeItem));
        setLoading(false);
        setLoadData(false);
        dispatch(saveOrder(res.data.orderInfo));
        
        loadDataStatUp(res.data.sametypeItem);
      })
      .catch((error) => {
        console.log('Api call error');
        setError(true)
      })
  }, []);


  //const status = useSelector((state) => state.dataInfo.statusUpdate);
  const prodInfo = useSelector((state) => state.dataInfo.productInfo);
  // console.log(prodInfo);

  if (status == '1') {
    scroll();
    dispatch(isStateUpdated('0'));
    setProducts(prodInfo);
  }

  const loadDataStatUp = (sametypeItem) => {
    dispatch(isStateUpdated('0'));
    setProducts(sametypeItem);
  }

  const loadDataOnClick = (id, name) => {
    dispatch(openSidbar("0"));
    if(name=='productType'){
      axios.get(baseURL + id)
      .then((res) => {
        dispatch(clickedProduct(res.data.sametypeItem));
        setLoading(false);
        setLoadData(false);
      })
      .catch((error) => {
        console.log('Api call error');
        setError(true)
      })
    }else{   
    setLoading(true);
    axios.get(subTypeURL + id)
      .then((res) => {
        dispatch(clickedProduct(res.data.subCategoriesItem));
        setLoading(false);
        setLoadData(false);
      })
      .catch((error) => {
        console.log('Api call error');
        setError(true)
      })
    }
  }

  const bannerSlides = [
    {
      // img: FurnitureImgOne,
      alt: 'Slide One',
    },
    {
      // img: FurnitureImgTwo,
      alt: 'Slide Two',
    },
  ];

  return (
    <>
      <ModalProvider>
        <Modal>
          <MobileBanner 
          // intlTitleId={page?.banner_title_id} 
          // type={PAGE_TYPE} 
          />
          <MobileCarouselDropdown>
            <Sidebar
              clickOnCategory={loadDataOnClick}
              // type={PAGE_TYPE} 
              sidebar={sidebarItem}
              deviceType={deviceType} />
          </MobileCarouselDropdown>
          <OfferSection>
          </OfferSection>
          <MainContentArea>
            <SidebarSection>
              <Sidebar
                sidebar={sidebarItem}
                clickOnCategory={loadDataOnClick}
                // type={PAGE_TYPE}
                deviceType={deviceType}
              />
            </SidebarSection>
            <ContentSection>
              <Banner data={bannerSlides} />
              <div ref={targetRef}>
                {loading ? (
                  <div> loading.....</div>
                ) : error ? (
                  <div>an error occur</div>
                ) : products.length === 0 ? (
                  <div>There is no products</div>
                ) : (
                      <div ref={targetRef}>
                        <Product
                          productList={products}
                          // type={PAGE_TYPE}
                          deviceType={deviceType}
                          fetchLimit={20}
                        />
                        </div>
                  )}
              </div>
            </ContentSection>
          </MainContentArea>
          <CartPopUp deviceType={deviceType} />
        </Modal>
      </ModalProvider>
    </>
  );
};

export default HomeScreen;


