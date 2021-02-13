import React from 'react';
import { SearchBox } from '../../components/search-box/search-box';
import  {searchProduct}  from "../../store/actions/webDataInfo";
// import { useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import { useCart } from "../../contexts/cart/use-cart";
import {useAppState, useAppDispatch } from "../../contexts/app/app.provider"



const Search = ({ onSubmit, ...props }) => {
  const { getSearchText } = useCart();
  const searchTerm = useAppState("searchTerm")
  const router = useRouter();
const dispatch = useAppDispatch();
  const handleOnChange = (e) => {
    const { value } = e.target;
    window.scrollTo(0, 0);
    dispatch({ type: 'SET_SEARCH_TERM', payload: value });
  };
  // const { pathname, query } = router;
  // const onSearch = (e) => {
  //   e.preventDefault();
  //   const { type, ...rest } = query;
  //   if (type) {
  //     router.push(
  //       {
  //         pathname,
  //         query: { ...rest, text: searchTerm },
  //       },
  //       {
  //         pathname: `/${type}`,
  //         query: { ...rest, text: searchTerm },
  //       }
  //     );
  //   } else {
  //     router.push({
  //       pathname,
  //       query: { ...rest, text: searchTerm },
  //     });
  //   }
  //   dispatch({ type: 'SET_SEARCH_TERM', payload: '' });
  //   if (onSubmit) {
  //     onSubmit();
  //   }
  // };
  return (
    <SearchBox
      // onEnter={onSearch}
      onChange={handleOnChange}
      // value={searchTerm}
      name="search"
      placeholder='Search your products from here'
      {...props}
    />
  );
};

export default Search;
