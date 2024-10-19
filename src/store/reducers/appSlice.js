import { createSlice } from '@reduxjs/toolkit';
import { fetchTickets } from '../../api/fetchTickets';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    filter: {
      checkboxes: {
        0: true,
        1: true,
        2: true,
        3: true,
      },
      isAllChecked: true,
    },
    tickets: {
      entities: [],
      status: 'idle',
      error: false,
    },
    sortType: 'fastest',
    // filteredTickets: [],
  },
  reducers: {
    selectAllFilters: (state) => {
      const checkedState = !state.filter.isAllChecked;
      state.filter.isAllChecked = checkedState;
      state.filter.checkboxes = {
        0: checkedState,
        1: checkedState,
        2: checkedState,
        3: checkedState,
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
    // filterTickets: (state) => {
    //   const transfers = Object.entries(state.checkboxes);
    //   const curentTransfers = transfers
    //     .map((filter) => {
    //       if (filter[1]) {
    //         return +filter[0];
    //       }
    //     })
    //     .filter((key) => key);
    //   entities.filter((ticket) => {
    //     return (
    //       curentTransfers.includes(ticket.segments[0].stops.length) ||
    //       curentTransfers.includes(ticket.segments[1].stops.length)
    //     );
    //   });
    // }
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
