import Tab from '../../parts/Tab/Tab';
import cl from './Tabs.module.css';

export default function Tabs() {
  return (
    <ul className={cl.tabs}>
      <li>
        <Tab bindName={'cheapest'} labelContent={'Самый дешевый'} filterName={'tabs'} />
      </li>
      <li>
        <Tab bindName={'fastest'} labelContent={'Самый быстрый'} filterName={'tabs'} />
      </li>
      <li>
        <Tab bindName={'optimal'} labelContent={'Оптимальный'} filterName={'tabs'} />
      </li>
    </ul>
  );
}
