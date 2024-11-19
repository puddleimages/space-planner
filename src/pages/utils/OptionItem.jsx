import PropTypes from "prop-types";

const OptionItem = ({ optionId, optionName, isSelected, onToggle, isLinedOut, disabled }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onToggle(optionId);
    }
  };

  return (
    <div className={`option-item ${isLinedOut ? 'lined-out' : ''}`}>
      <label>
        <input
          type="checkbox"
          id={`suboption-${optionId}`}
          checked={isSelected}
          onChange={() => onToggle(optionId)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <label htmlFor={`option-${optionId}`}>
          {optionName}
        </label>
      </label>
    </div>
  );
};

OptionItem.propTypes = {
  optionId: PropTypes.number.isRequired,
  optionName: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  isLinedOut: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default OptionItem;
