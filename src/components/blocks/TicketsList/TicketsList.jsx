import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets } from '../../../api/fetchTickets';
import Ticket from '../../parts/Ticket/Ticket';
import { nanoid } from 'nanoid';
import cl from './TicketsList.module.css';
import { useTickets } from '../../../hooks/useTickets';
import { LinearProgress } from '@mui/material';

export default function TicketsList() {
  const { entities, status, error } = useSelector((state) => state.app.tickets);
  const [ticketsCount, setTicketsCount] = useState(5);

  const [tickets, allCheckboxesUnChecked] = useTickets();

  const dispatch = useDispatch();

  useEffect(() => {
    if (status !== 'success') {
      dispatch(fetchTickets());
    }
    if (error) {
      dispatch(fetchTickets());
    }
  }, [dispatch, status, entities, error]);

  const show = !allCheckboxesUnChecked && tickets.length > 0;

  return (
    <div>
      <div className={cl.tickets}>
        {allCheckboxesUnChecked && (
          <h2 className={cl['tickets-notfound']}>
            Рейсов, подходящих под заданные фильтры, не найдено
          </h2>
        )}
        {status === 'loading' && <LinearProgress />}
        {show &&
          tickets
            .slice(0, ticketsCount)
            .map((ticket) => (
              <Ticket key={nanoid()} {...ticket} onClick={() => console.log(ticket)} />
            ))}
      </div>

      {show && (
        <button onClick={() => setTicketsCount((prev) => prev + 5)} className={cl.tickets__button}>
          Показать еще 5 билетов!
        </button>
      )}
    </div>
  );
}
