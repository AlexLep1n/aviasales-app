import { add, format } from 'date-fns';
import cl from './TicketLine.module.css';
import PropTypes from 'prop-types';

export default function TicketLine({ origin, destination, date, stops, duration }) {
  const startTime = new Date(date);
  const endTime = add(startTime, { minutes: Number(duration) });

  const formatDuration = (durationInMinutes) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours}ч ${minutes}м`;
  };

  return (
    <div className={cl.ticket__line}>
      <div className={cl.ticket__part}>
        <p className={cl.ticket__heading}>{`${origin} - ${destination}`}</p>
        <p className={cl.ticket__desc}>
          {`${format(startTime, 'HH:mm')} - ${format(endTime, 'HH:mm')}`}
        </p>
      </div>
      <div className={cl.ticket__part}>
        <p className={cl.ticket__heading}>В пути</p>
        <p className={cl.ticket__desc}>{formatDuration(duration)}</p>
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

TicketLine.propTypes = {
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  stops: PropTypes.array.isRequired,
  duration: PropTypes.number.isRequired,
};
