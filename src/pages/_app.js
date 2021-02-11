import dynamic from 'next/dynamic';
import {IntlProvider} from 'react-intl';
import { Provider } from "react-redux";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import  webDataInfo  from "../store/reducers/webDataInfo";
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../site-settings/site-theme/default';
import { AppProvider } from '../contexts/app/app.provider';
import { AuthProvider } from '../contexts/auth/auth.provider';
import { CartProvider } from '../contexts/cart/use-cart';
import { useMedia } from '../utils/use-media';

// External CSS import here
import 'rc-drawer/assets/index.css';
import 'rc-table/assets/index.css';
import 'rc-collapse/assets/index.css';
import 'react-multi-carousel/lib/styles.css';
import '../components/multi-carousel/multi-carousel.style.css';
import 'react-spring-modal/dist/index.css';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import '../components/scrollbar/scrollbar.css';
import '@redq/reuse-modal/lib/index.css';
import 'swiper/swiper-bundle.min.css';
import { GlobalStyle } from '../assets/styles/global.style';


const AppLayout = dynamic(() => import('../layouts/app-layout'));

export default function ExtendedApp({ Component, pageProps }) {
  const mobile = useMedia('(max-width: 580px)');
  const tablet = useMedia('(max-width: 991px)');
  const desktop = useMedia('(min-width: 992px)');

const reducer = combineReducers({
  dataInfo: webDataInfo,
});
const composeEnhancer =  compose;

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware())
);


  return (
    <ThemeProvider theme={defaultTheme}>
       <Provider store={store}>
          <AuthProvider>
            <AppProvider>
              <AppLayout>
                <GlobalStyle />
                <CartProvider>
                    <IntlProvider locale="en">
                        <Component 
                        {...pageProps}
                        deviceType={{ mobile, tablet, desktop }}
                        />
                    </IntlProvider>
                </CartProvider>
              </AppLayout>
              </AppProvider>
          </AuthProvider>
      </Provider>
    </ThemeProvider>
  );
}
