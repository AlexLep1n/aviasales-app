import PropTypes from 'prop-types';
import cl from './Tab.module.css';
import { useActions } from '../../../hooks/useActions';

export default function Tab({ bindName, labelContent, filterName, checked }) {
  const { changeSortTab } = useActions();

  return (
    <>
      <input
        className={cl['tab-input']}
        type="radio"
        id={bindName}
        name={filterName}
        checked={checked}
        onChange={() => changeSortTab(bindName)}
      />
      <label className={cl['tab-label']} htmlFor={bindName}>
        {labelContent}
      </label>
    </>
  );
}

Tab.propTypes = {
  bindName: PropTypes.string.isRequired,
  labelContent: PropTypes.string.isRequired,
  filterName: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};
