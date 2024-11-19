import PropTypes from "prop-types";

const SuboptionItem = ({ suboptionId, suboptionName, isSelected, onToggle }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onToggle(suboptionId);
    }
  };

  return (
    <div className="suboption-item">
      <label>
        <input
          type="checkbox"
          id={`suboption-${suboptionId}`}
          checked={isSelected}
          onChange={() => onToggle(suboptionId)}
          onKeyDown={handleKeyDown}
        />
        <label htmlFor={`suboption-${suboptionId}`}>
          {suboptionName}
        </label>
      </label>
    </div>
  );
};

SuboptionItem.propTypes = {
  suboptionId: PropTypes.number.isRequired,
  suboptionName: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default SuboptionItem;
