/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets } from '../../../api/fetchTickets';
import Ticket from '../../parts/Ticket/Ticket';
import { nanoid } from 'nanoid';
import cl from './TicketsList.module.css';

export default function TicketsList() {
  const { entities, status, error } = useSelector((state) => state.app.tickets);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle' || status === 'loading') {
      dispatch(fetchTickets());
    }
  });

  // console.log(entities[0]);
  const firstFive = entities.slice(0, 4);

  return (
    <section className={cl.tickets}>
      {firstFive.map((ticket) => (
        <Ticket key={nanoid()} {...ticket} />
      ))}
    </section>
  );
}
