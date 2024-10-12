import Tabs from '../components/blocks/Tabs/Tabs';
import logo from '/img/logo.svg';
import cl from './MainPage.module.css';
import Ticket from '../components/parts/Ticket/Ticket';

export default function MainPage() {
  return (
    <>
      <section className={cl['main-page']}>
        <img className={cl['main-page__logo']} src={logo} alt="logo" />
        <section>
          <div>
            <Tabs />
            <Ticket />
          </div>
        </section>
      </section>
    </>
  );
}
