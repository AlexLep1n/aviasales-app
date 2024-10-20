import { createAsyncThunk } from '@reduxjs/toolkit';

const searchIdUrl = 'https://aviasales-test-api.kata.academy/search';
const ticketsUrl = 'https://aviasales-test-api.kata.academy/tickets';

export async function getSearchId() {
  const response = await fetch(searchIdUrl);

  if (!response.ok) {
    throw new Error('Error in getting the search id');
  }
  const data = await response.json();
  return data.searchId;
}

export const fetchTickets = createAsyncThunk('filter/fetchTickets', async (searchId) => {
  const response = await fetch(`${ticketsUrl}?searchId=${searchId}`);

  if (!response.ok) {
    throw new Error('Error in getting the tickets data');
  }

  return await response.json();
});
