import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    checkboxes: {
      noTransfers: false,
      oneTransfer: false,
      twoTransfers: false,
      threeTransfers: false,
    },
    isAllChecked: false,
  },
  reducers: {
    selectAllFilters: (state) => {
      const checkedState = !state.isAllChecked;
      state.isAllChecked = checkedState;
      state.checkboxes = {
        noTransfers: checkedState,
        oneTransfer: checkedState,
        twoTransfers: checkedState,
        threeTransfers: checkedState,
      };
    },
    checkboxChange: (state, { payload: { name, checked } }) => {
      state.checkboxes = { ...state.checkboxes, [name]: checked };

      if (!checked) {
        state.isAllChecked = false;
      }
    },
    checkAllCheck: (state) => {
      const allCheckboxesChecked = Object.values(state.checkboxes).every(Boolean);
      if (allCheckboxesChecked) {
        state.isAllChecked = true;
      }
    },
  },
});

export const { selectAllFilters, checkboxChange, checkAllCheck } = filterSlice.actions;
export default filterSlice.reducer;
