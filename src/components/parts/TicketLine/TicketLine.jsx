/* eslint-disable react/prop-types */
import { add, format } from 'date-fns';
import cl from './TicketLine.module.css';

export default function TicketLine({ origin, destination, date, stops, duration }) {
  // console.log(format(new Date(date), 'hhч mmм'));
  // console.log(format(add(new Date(date), { minutes: duration }), 'hhч mmм'));
  return (
    <div className={cl.ticket__line}>
      <div className={cl.ticket__part}>
        <p className={cl.ticket__heading}>{`${origin} - ${destination}`}</p>
        <p className={cl.ticket__desc}>
          {`${format(new Date(date), 'hh:mm')} - ${format(add(new Date(date), { minutes: duration }), 'hh:mm')}`}
        </p>
      </div>
      <div className={cl.ticket__part}>
        <p className={cl.ticket__heading}>В пути</p>
        <p className={cl.ticket__desc}>{format(new Date(duration * 60 * 1000), 'hhч mmм')}</p>
      </div>
      <div className={cl.ticket__part}>
        <p className={cl.ticket__heading}>
          {stops.length === 0
            ? `${stops.length} пересадок`
            : stops.length === 1
              ? `${stops.length} пересадка`
              : `${stops.length} пересадки`}
        </p>
        <p className={cl.ticket__desc}>{stops.join(', ')}</p>
      </div>
    </div>
  );
}
