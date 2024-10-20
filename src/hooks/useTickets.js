import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useTickets = () => {
  const entities = useSelector((state) => state.app.tickets.entities);
  const sortType = useSelector((state) => state.app.sortType);
  const { checkboxes, isAllChecked } = useSelector((state) => state.app.filter);

  const allCheckboxesUnChecked =
    !isAllChecked && Object.values(checkboxes).every((check) => !check);

  const filteredTickets = useMemo(() => {
    if (allCheckboxesUnChecked) {
      return [];
    }
    if (isAllChecked) {
      return entities;
    }
    const transfers = Object.entries(checkboxes);

    const curentTransfers = transfers
      .map(([key, value]) => (value ? key : null))
      .filter((key) => key);

    return entities.filter((ticket) => {
      return (
        curentTransfers.includes(String(ticket.segments[0].stops.length)) ||
        curentTransfers.includes(String(ticket.segments[1].stops.length))
      );
    });
  }, [allCheckboxesUnChecked, checkboxes, entities, isAllChecked]);

  const filteredAndSortedTickets = useMemo(() => {
    const sortedTickets = [...filteredTickets];
    switch (sortType) {
      case 'cheapest':
        return sortedTickets.sort((a, b) => a.price - b.price);
      case 'fastest':
        return sortedTickets.sort((a, b) => {
          return (
            a.segments[0].duration +
            a.segments[1].duration -
            b.segments[0].duration -
            b.segments[1].duration
          );
        });
      default:
        return sortedTickets;
    }
  }, [filteredTickets, sortType]);

  return [filteredAndSortedTickets, allCheckboxesUnChecked];
};
