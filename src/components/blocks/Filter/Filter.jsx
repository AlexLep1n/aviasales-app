import { useSelector } from 'react-redux';
import cl from './Filter.module.css';
import { useActions } from '../../../hooks/useActions';

export default function Filter() {
  const { checkboxes, isAllChecked } = useSelector((state) => state.app.filter);
  const { selectAllFilters, checkboxChange, checkAllCheck } = useActions();

  const checkboxNames = {
    noTransfers: 'Без пересадок',
    oneTransfer: '1 пересадка',
    twoTransfers: '2 пересадки',
    threeTransfers: '3 пересадки',
  };

  // Изменение состояния отдельно для каждого checkbox
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    checkboxChange({ name, checked });

    // Проверям все checkboxes кроме "Все"
    checkAllCheck();
  };

  return (
    <div className={cl.filter}>
      <h3 className={cl.filter__title}>Количество пересадок</h3>

      <label className={cl.filter__label}>
        <input
          onChange={() => selectAllFilters()}
          className={cl.filter__input}
          type="checkbox"
          checked={isAllChecked}
        />
        <span className={cl.filter__box}></span>
        Все
      </label>
      {Object.entries(checkboxNames).map(([key, label]) => (
        <label key={key} className={cl.filter__label}>
          <input
            onChange={(e) => handleCheckboxChange(e)}
            className={cl.filter__input}
            type="checkbox"
            name={key}
            checked={checkboxes[key]}
          />
          <span className={cl.filter__box}></span>
          {label}
        </label>
      ))}
    </div>
  );
}
