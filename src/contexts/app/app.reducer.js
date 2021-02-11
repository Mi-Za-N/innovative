export const initialState = {
  searchTerm: '',
  isSticky: false,
  isSidebarSticky: true,
  isDrawerOpen: false,
  isModalOpen: false,
};


export function appReducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
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
