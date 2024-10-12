import cl from './Filter.module.css';
import { useState } from 'react';

export default function Filter() {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    noTransfers: false,
    oneTransfer: false,
    twoTransfers: false,
    threeTransfers: false,
  });

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
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes((prev) => ({ ...prev, [name]: checked }));

    const allCheckboxesChecked = Object.values(checkboxes).every(Boolean) && checked;
    if (allCheckboxesChecked) {
      setIsAllChecked(true);
    }

    if (!checked) {
      setIsAllChecked(false);
    } else if (
      checkboxes.noTransfers &&
      checkboxes.oneTransfer &&
      checkboxes.twoTransfers &&
      checkboxes.threeTransfers
    ) {
      setIsAllChecked(true);
    }
  };

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
      <label className={cl.filter__label}>
        <input
          onChange={(e) => handleCheckboxChange(e)}
          className={cl.filter__input}
          type="checkbox"
          name="noTransfers"
          checked={checkboxes.noTransfers}
        />
        <span className={cl.filter__box}></span>
        Без пересадок
      </label>
      <label className={cl.filter__label}>
        <input
          onChange={(e) => handleCheckboxChange(e)}
          className={cl.filter__input}
          type="checkbox"
          name="oneTransfer"
          checked={checkboxes.oneTransfer}
        />
        <span className={cl.filter__box}></span>1 пересадка
      </label>
      <label className={cl.filter__label}>
        <input
          onChange={(e) => handleCheckboxChange(e)}
          className={cl.filter__input}
          type="checkbox"
          name="twoTransfers"
          checked={checkboxes.twoTransfers}
        />
        <span className={cl.filter__box}></span>2 пересадки
      </label>
      <label className={cl.filter__label}>
        <input
          onChange={(e) => handleCheckboxChange(e)}
          className={cl.filter__input}
          type="checkbox"
          name="threeTransfers"
          checked={checkboxes.threeTransfers}
        />
        <span className={cl.filter__box}></span>3 пересадки
      </label>
    </div>
  );
}
