export const initialState = {
  searchTerm: '',
  allProductInfo: [],
  showProductInfo: [],
  orderInfo: [],
  isSidebarOpen: "0",
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  isLogin: false,
  isSticky: false,
  isSidebarSticky: true,
  isDrawerOpen: false,
  isModalOpen: false,
};


export function appReducer(state, action) {
  // console.log(action.payload);
  switch (action.type) {

    case 'SAVE_PRODUCT_INFO':
      return {
        ...state,
        allProductInfo: action.payload,
        showProductInfo: action.payload.filter(sp => sp.is_special_offer === '1'),
      };
    case 'SAME_TYPE_PRODUCT_INFO':
      return {
        ...state,
        showProductInfo: state.allProductInfo.filter(p => p.type_id === action.payload),
      };
    case 'SUBTYPE_PRODUCT_INFO':
      return {
        ...state,
        showProductInfo: state.allProductInfo.filter(p => p.subtype_id === action.payload),
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        showProductInfo: state.allProductInfo.filter(pP => pP.product_title_eng.toLowerCase().includes(action.payload.toLowerCase())),
      };
    case 'SAVE_ORDER_INFO':
      return {
        ...state,
        orderInfo: action.payload,
      };
    case 'IS_SIDEBAR_OPEN':
      return {
        ...state,
        isSidebarOpen: action.payload,
      };
    case 'IS_LOGIN':
      return {
        ...state,
        isLogin: action.payload,
      };
    case 'IS_MOBILE':
      return {
        ...state,
        isMobile: action.payload,
      };
    case 'IS_TABLET':
      return {
        ...state,
        isTablet: action.payload,
      };
    case 'IS_DESKTOP':
      return {
        ...state,
        isDesktop: action.payload,
      };
    case 'SET_STICKY':
      return {
        ...state,
        isSticky: true,
      };
    case 'REMOVE_STICKY':
      return {
        ...state,
        isSticky: false,
      };
    case 'SET_SIDEBAR_STICKY':
      return {
        ...state,
        isSidebarSticky: true,
      };
    case 'REMOVE_SIDEBAR_STICKY':
      return {
        ...state,
        isSidebarSticky: false,
      };
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen,
      };
    case 'TOGGLE_MODAL':
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    default: {
      throw new Error(`Unsupported action type at App Reducer`);
    }
  }
}
