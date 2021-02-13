import React, { useEffect, useState } from "react";
import { baseURL, subTypeURL } from "../common/baseUrl";
import axios from 'axios';
import { useRefScroll } from '../utils/use-ref-scroll';
import dynamic from 'next/dynamic';
import { MobileBanner } from '../components/banner/mobile-banner';
import { Modal } from '@redq/reuse-modal';
import { useAppState, useAppDispatch } from "../contexts/app/app.provider"
import { useRouter } from 'next/router';
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

function HomeScreen(deviceType) { 
  const showProduct = useAppState("showProductInfo");
  const mobile = useAppState("isMobile");
  const tablet = useAppState("isTablet");
  const desktop = useAppState("isDestop");
  const [sidebarItem, setSidebar] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { elRef: targetRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -110,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
   
    dispatch({ type: 'IS_MOBILE', payload: deviceType.deviceType.mobile });
    dispatch({ type: 'IS_TABLET', payload: deviceType.deviceType.tablet });
    dispatch({ type: 'IS_DESKTOP', payload: deviceType.deviceType.desktop });
    axios.get(baseURL)
      .then((res) => {
        setSidebar(res.data.menu_item);
        dispatch({ type: 'SAVE_PRODUCT_INFO', payload: res.data.allProductInfo });
        setLoading(false);
      })
      .catch((error) => {
        alert('okhh');
        console.log('Api call error');
        setError(true)
      })
  }, []);

  const loadDataOnClick = (id, name) => {
    if (name == 'productType') {
      if (id == 12) {

      }
      else if (id == 13) {

      } else {
        dispatch({ type: 'SAME_TYPE_PRODUCT_INFO', payload: id });
      }
    } else {
      dispatch({ type: 'SUBTYPE_PRODUCT_INFO', payload: id });
    }
    dispatch({ type: 'IS_SIDEBAR_OPEN', payload: '0' });
    window.scrollTo(0, 0);
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
              deviceType={{ mobile, tablet, desktop }} />
          </MobileCarouselDropdown>
          <OfferSection>
          </OfferSection>
          <MainContentArea>
            <SidebarSection>
              <Sidebar
                sidebar={sidebarItem}
                clickOnCategory={loadDataOnClick}
                // type={PAGE_TYPE}
                deviceType={{ mobile, tablet, desktop }}
              />
            </SidebarSection>
            <ContentSection>
              <Banner data={bannerSlides} />
              <div ref={targetRef}>
                {loading ? (
                  <div> loading.....</div>
                ) : error ? (
                  <div>an error occur</div>
                ) : showProduct.length == 0 ? (
                  <div>There is no products</div>
                ) : (
                        <div ref={targetRef}>
                          <Product
                            productList={showProduct}
                            // type={PAGE_TYPE}
                            deviceType={{ mobile, tablet, desktop }}
                            fetchLimit={20}
                          />
                        </div>
                      )}
              </div>
            </ContentSection>
          </MainContentArea>
          <CartPopUp deviceType={{ mobile, tablet, desktop }} />
        </Modal>
      </ModalProvider>
    </>
  );
};

export default HomeScreen;


