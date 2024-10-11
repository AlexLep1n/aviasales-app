import PropTypes from 'prop-types';
import cl from './Tab.module.css';

export default function Tab({ bindName, labelContent, filterName }) {
  return (
    <>
      <input className={cl['tab-input']} type="radio" id={bindName} name={filterName} />
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
};
