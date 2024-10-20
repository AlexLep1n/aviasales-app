import { nanoid } from 'nanoid';
import cl from './Ticket.module.css';
import PropTypes from 'prop-types';
import TicketLine from '../TicketLine/TicketLine';

export default function Ticket({ price, carrier: iataCode, segments }) {
  return (
    <div className={cl.ticket}>
      <div className={cl.ticket__header}>
        <h3 className={cl.ticket__price}>{`${price} Р`}</h3>
        <img
          className={cl.ticket__logo}
          src={`//pics.avs.io/99/36/${iataCode}.svg`}
          alt="ticket logo"
        />
      </div>
      <div className={cl.ticket__content}>
        {segments.map((line) => (
          <TicketLine key={nanoid()} {...line} />
        ))}
      </div>
    </div>
  );
}

Ticket.propTypes = {
  price: PropTypes.number,
  carrier: PropTypes.string,
  segments: PropTypes.array,
};
