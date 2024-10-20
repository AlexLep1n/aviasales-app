import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets, getSearchId } from '../../../api/fetchTickets';
import Ticket from '../../parts/Ticket/Ticket';
import { nanoid } from 'nanoid';
import cl from './TicketsList.module.css';
import { useTickets } from '../../../hooks/useTickets';
import { LinearProgress } from '@mui/material';

export default function TicketsList() {
  const { entities, status, error } = useSelector((state) => state.app.tickets);
  const [ticketsCount, setTicketsCount] = useState(5);

  // Получаем отфильтрованный и отсортированный массив билетов
  // и флаг не выбора всех checkbox`ов
  const [tickets, allCheckboxesUnChecked] = useTickets();
  const searchIdRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSearchId = async () => {
      searchIdRef.current = await getSearchId();
      dispatch(fetchTickets(searchIdRef.current));
    };
    if (!searchIdRef.current) {
      fetchSearchId();
    }
  }, [dispatch]);

  useEffect(() => {
    if (status !== 'success' && searchIdRef.current) {
      dispatch(fetchTickets(searchIdRef.current));
    }
    if (error && searchIdRef.current) {
      dispatch(fetchTickets(searchIdRef.current));
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
          tickets.slice(0, ticketsCount).map((ticket) => <Ticket key={nanoid()} {...ticket} />)}
      </div>

      {show && (
        <button onClick={() => setTicketsCount((prev) => prev + 5)} className={cl.tickets__button}>
          Показать еще 5 билетов!
        </button>
      )}
    </div>
  );
}
