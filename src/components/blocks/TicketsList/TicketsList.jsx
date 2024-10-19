import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets } from '../../../api/fetchTickets';
import Ticket from '../../parts/Ticket/Ticket';
import { nanoid } from 'nanoid';
import cl from './TicketsList.module.css';

export default function TicketsList() {
  const { entities, status, error } = useSelector((state) => state.app.tickets);
  const { checkboxes, isAllChecked } = useSelector((state) => state.app.filter);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle' || status === 'loading') {
      dispatch(fetchTickets());
    }
    if (error) {
      dispatch(fetchTickets());
    }
  }, [dispatch, status, entities, error]);

  const filteredTickets = useMemo(() => {
    if (!isAllChecked && Object.values(checkboxes).every((check) => !check)) {
      return [];
    }
    if (isAllChecked) {
      return entities;
    }
    const transfers = Object.entries(checkboxes);
    const curentTransfers = transfers
      .map((filter) => {
        if (filter[1]) {
          return filter[0];
        }
      })
      .filter((key) => key);
    console.log(curentTransfers);
    return entities.filter((ticket) => {
      return (
        curentTransfers.includes(String(ticket.segments[0].stops.length)) ||
        curentTransfers.includes(String(ticket.segments[1].stops.length))
      );
    });
  }, [checkboxes, entities, isAllChecked]);

  console.log(filteredTickets.length);

  return (
    <section className={cl.tickets}>
      {filteredTickets.length === 0 && (
        <h2 className={cl['tickets-notfound']}>
          Рейсов, подходящих под заданные фильтры, не найдено
        </h2>
      )}
      {filteredTickets.length > 0 &&
        filteredTickets.slice(0, 4).map((ticket) => <Ticket key={nanoid()} {...ticket} />)}
    </section>
  );
}
