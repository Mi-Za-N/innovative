import dynamic from 'next/dynamic';
import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Box,
  Content,
  ContentRow,
  Description,
  SearchWrapper,
} from './banner.style';

import { Waypoint } from 'react-waypoint';
import { Button } from '../button/button';
import { useAppDispatch } from '../../contexts/app/app.provider';
import Search from '../../features/search/search';
const SpringModal = dynamic(
  () => import('../spring-modal/spring-modal')
);
// const CategoryIconNav = dynamic(() => import('components/type-nav/type-nav'));

// interface Props {
//   intlTitleId: string;
//   type?: string;
// }

export const MobileBanner = ({ type, intlTitleId }) => {
  const [isOpen, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const setSticky = useCallback(() => dispatch({ type: 'SET_STICKY' }), [
    dispatch,
  ]);
  const removeSticky = useCallback(() => dispatch({ type: 'REMOVE_STICKY' }), [
    dispatch,
  ]);
  const onWaypointPositionChange = ({ currentPosition }) => {
    if (!currentPosition || currentPosition === 'above') {
      setSticky();
    }
  };
  return (
    // <Box display={['flex', 'flex', 'none']}>
      <Content>
          <Button
            variant="text"
            onClick={() => setOpen(true)}
            style={{ textTransform: 'capitalize' }}
          >
            {type}
          </Button>
      </Content>
    // {/* </Box> */}
  );
};
