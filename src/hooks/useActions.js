import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { appSlice } from '../store/reducers/appSlice';
import { useMemo } from 'react';

const allActions = {
  ...appSlice.actions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch]);
};
