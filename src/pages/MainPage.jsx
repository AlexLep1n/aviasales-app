import Tabs from '../components/blocks/Tabs/Tabs';
import logo from '/img/logo.svg';
import cl from './MainPage.module.css';
import Ticket from '../components/parts/Ticket/Ticket';
import Filter from '../components/blocks/Filter/Filter';

export default function MainPage() {
  return (
    <>
      <section className={cl['main-page']}>
        <img className={cl['main-page__logo']} src={logo} alt="logo" />
        <section className={cl['main-page__content']}>
          <Filter />
          <div>
            <Tabs />
            <Ticket />
          </div>
        </section>
      </section>
    </>
  );
}
