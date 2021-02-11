export const SAVE_PRODUCT = "SAVE_PRODUCT";
export const SAVE_ORDER = "SAVE_ORDER";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
export const CLICKED_PRODUCT = "CLICKED_PRODUCT";
export const IS_UPDATED = "IS_UPDATED";
export const IS_OPEN = "IS_OPEN";
export const IS_LOGIN = "IS_LOGIN";


export const saveProduct = (data) => {
  return { type: SAVE_PRODUCT, payload: data };
};

export const saveOrder = (data) => {
  // console.log(data);
  return { type: SAVE_ORDER, payload: data };
};

export const searchProduct = (data) => {
  return { type: SEARCH_PRODUCT, payload: data };
};

export const clickedProduct = (data) => {
  return { type: CLICKED_PRODUCT, payload: data };
};

export const isStateUpdated = (data) => {
  return { type: IS_UPDATED, payload: data };
};

export const openSidbar = (data) => {
  return { type: IS_OPEN, payload: data };
};

export const isLogin = (data) => {
  return { type: IS_LOGIN, payload: data };
};


