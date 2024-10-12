import cl from './Filter.module.css';
import { useState, useEffect } from 'react';

export default function Filter() {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    noTransfers: false,
    oneTransfer: false,
    twoTransfers: false,
    threeTransfers: false,
  });

  const checkboxNames = {
    noTransfers: 'Без пересадок',
    oneTransfer: '1 пересадка',
    twoTransfers: '2 пересадки',
    threeTransfers: '3 пересадки',
  };

  // Функция обработки нажатия на checkbox "Все"
  const handleSelectAll = () => {
    const checkedState = !isAllChecked;
    setIsAllChecked(checkedState);
    setCheckboxes({
      noTransfers: checkedState,
      oneTransfer: checkedState,
      twoTransfers: checkedState,
      threeTransfers: checkedState,
    });
  };

  // Изменение состояния отдельно для каждого checkbox
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes((prev) => ({ ...prev, [name]: checked }));

    // Если хотя бы один checkbox unchecked, то убрать галочку с "Все",
    if (!checked) {
      setIsAllChecked(false);
    }
  };

  // Проверям все checkboxes кроме "Все"
  useEffect(() => {
    const allCheckboxesChecked = Object.values(checkboxes).every(Boolean);
    if (allCheckboxesChecked) {
      setIsAllChecked(true);
    }
  }, [checkboxes]);

  return (
    <div className={cl.filter}>
      <h3 className={cl.filter__title}>Количество пересадок</h3>

      <label className={cl.filter__label}>
        <input
          onChange={handleSelectAll}
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
