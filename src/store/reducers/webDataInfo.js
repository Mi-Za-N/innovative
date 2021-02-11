import {
  SAVE_PRODUCT,
  SAVE_ORDER,
  SEARCH_PRODUCT,
  CLICKED_PRODUCT,
  IS_UPDATED,
  IS_OPEN,
  IS_LOGIN
} from "../actions/webDataInfo";

const initialState = {
  saveProduct: [],
  saveOrder: [],
  productInfo: [],
  statusUpdate: '0',
  isSidebarOpen: "0",
  isLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PRODUCT:
      return {
        ...state,
        saveProduct: action.payload,
        productInfo: action.payload,
        statusUpdate: '1',
      };
      case SAVE_ORDER:
        //  console.log(action.payload);
      return {
        ...state,
        saveOrder: action.payload,
      };
    case CLICKED_PRODUCT:
      return {
        ...state,
        saveProduct: action.payload,
        productInfo: action.payload,
        statusUpdate: '1',
      };
    case SEARCH_PRODUCT:
      return {
        ...state,
        productInfo: state.saveProduct.filter(pP => pP.product_title_eng.toLowerCase().includes(action.payload.toLowerCase())),
        statusUpdate: '1',
      };
    case IS_UPDATED:
      // console.log(action.payload)
      return {
        ...state,
        statusUpdate: action.payload,
      };
    case IS_OPEN:
      //  console.log(action.payload)
      return {
        ...state,
        isSidebarOpen: action.payload,
      };
    case IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
  }
  return state;
}