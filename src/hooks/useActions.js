import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { filterSlice } from '../store/reducers/filterSlice';
import { useMemo } from 'react';

const allActions = {
  ...filterSlice.actions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch]);
};
