import { useSelector } from 'react-redux';
import Tab from '../../parts/Tab/Tab';
import cl from './Tabs.module.css';

export default function Tabs() {
  const sortType = useSelector((state) => state.app.sortType);

  return (
    <ul className={cl.tabs}>
      <li>
        <Tab
          bindName={'cheapest'}
          labelContent={'Самый дешевый'}
          filterName={'tabs'}
          checked={sortType === 'cheapest'}
        />
      </li>
      <li>
        <Tab
          bindName={'fastest'}
          labelContent={'Самый быстрый'}
          filterName={'tabs'}
          checked={sortType === 'fastest'}
        />
      </li>
      <li>
        <Tab
          bindName={'optimal'}
          labelContent={'Оптимальный'}
          filterName={'tabs'}
          checked={sortType === 'optimal'}
        />
      </li>
    </ul>
  );
}
