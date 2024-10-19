import { createSlice } from '@reduxjs/toolkit';
import { fetchTickets } from '../../api/fetchTickets';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    filter: {
      checkboxes: {
        noTransfers: true,
        oneTransfer: true,
        twoTransfers: true,
        threeTransfers: true,
      },
      isAllChecked: true,
    },
    tickets: {
      entities: [],
      status: 'idle',
      error: false,
      // stop: false,
    },
  },
  reducers: {
    selectAllFilters: (state) => {
      const checkedState = !state.filter.isAllChecked;
      state.filter.isAllChecked = checkedState;
      state.filter.checkboxes = {
        noTransfers: checkedState,
        oneTransfer: checkedState,
        twoTransfers: checkedState,
        threeTransfers: checkedState,
      };
    },
    checkboxChange: (state, { payload: { name, checked } }) => {
      state.filter.checkboxes = { ...state.filter.checkboxes, [name]: checked };

      if (!checked) {
        state.filter.isAllChecked = false;
      }
    },
    checkAllCheck: (state) => {
      const allCheckboxesChecked = Object.values(state.filter.checkboxes).every(Boolean);
      if (allCheckboxesChecked) {
        state.filter.isAllChecked = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.tickets.status = 'loading';
      })
      .addCase(fetchTickets.fulfilled, (state, { payload: { tickets, stop } }) => {
        state.tickets.entities = [...state.tickets.entities, ...tickets];
        stop ? (state.tickets.status = 'success') : (state.tickets.status = 'loading');
        state.tickets.error = false;
      })
      .addCase(fetchTickets.rejected, (state) => {
        state.tickets.status = 'fail';
        state.tickets.error = true;
      });
  },
});

export const { selectAllFilters, checkboxChange, checkAllCheck } = appSlice.actions;
export default appSlice.reducer;
