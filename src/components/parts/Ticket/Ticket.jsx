import cl from './Ticket.module.css';

export default function Ticket() {
  return (
    <div className={cl.ticket}>
      <div className={cl.ticket__header}>
        <h3 className={cl.ticket__price}>13 400 Р</h3>
        <img className={cl.ticket__logo} src="/img/s7-logo.png" alt="ticket logo" />
      </div>
      <div className={cl.ticket__content}>
        <div className={cl.ticket__line}>
          <div className={cl.ticket__part}>
            <p className={cl.ticket__heading}>MOW – HKT</p>
            <p className={cl.ticket__desc}>10:45 – 08:00</p>
          </div>
          <div className={cl.ticket__part}>
            <p className={cl.ticket__heading}>В пути</p>
            <p className={cl.ticket__desc}>21ч 15м</p>
          </div>
          <div className={cl.ticket__part}>
            <p className={cl.ticket__heading}>2 пересадки</p>
            <p className={cl.ticket__desc}>HKG, JNB</p>
          </div>
        </div>
        <div className={cl.ticket__line}>
          <div className={cl.ticket__part}>
            <p className={cl.ticket__heading}>MOW – HKT</p>
            <p className={cl.ticket__desc}>10:45 – 08:00</p>
          </div>
          <div className={cl.ticket__part}>
            <p className={cl.ticket__heading}>В пути</p>
            <p className={cl.ticket__desc}>21ч 15м</p>
          </div>
          <div className={cl.ticket__part}>
            <p className={cl.ticket__heading}>2 пересадки</p>
            <p className={cl.ticket__desc}>HKG, JNB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
