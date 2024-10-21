import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets, getSearchId } from '../../../api/fetchTickets';
import Ticket from '../../parts/Ticket/Ticket';
import cl from './TicketsList.module.css';
import { useTickets } from '../../../hooks/useTickets';
import { LinearProgress } from '@mui/material';
import { useActions } from '../../../hooks/useActions';

export default function TicketsList() {
  const { entities, status, error } = useSelector((state) => state.app.tickets);
  const [ticketsCount, setTicketsCount] = useState(5);

  // Получаем отфильтрованный и отсортированный массив билетов
  // и флаг не выбора всех checkbox`ов
  const [tickets, allCheckboxesUnChecked] = useTickets();
  const searchId = useSelector((state) => state.app.searchId);

  const { createSearchId } = useActions();
  const dispatch = useDispatch();

  const fetchSearchId = useCallback(async () => {
    const searchIdData = await getSearchId();
    createSearchId(searchIdData);
  }, [createSearchId]);

  useEffect(() => {
    const fetchTicketsIfNeeded = () => {
      if (!searchId) {
        fetchSearchId();
      } else if (status !== 'success' || (error && searchId)) {
        dispatch(fetchTickets(searchId));
      }
    };
    fetchTicketsIfNeeded();
  }, [dispatch, status, error, searchId, fetchSearchId, entities]);

  const show = useMemo(
    () => !allCheckboxesUnChecked && tickets.length > 0,
    [allCheckboxesUnChecked, tickets]
  );

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
          tickets.slice(0, ticketsCount).map((ticket) => <Ticket key={ticket.id} {...ticket} />)}
      </div>

      {show && (
        <button onClick={() => setTicketsCount((prev) => prev + 5)} className={cl.tickets__button}>
          Показать еще 5 билетов!
        </button>
      )}
    </div>
  );
}
