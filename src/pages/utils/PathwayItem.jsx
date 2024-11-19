import PropTypes from "prop-types";

const PathwayItem = ({ pathwayId, pathwayName, isSelected, onToggle }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onToggle(pathwayId);
    }
  };

  return (
    <div className="pathway-item">
      <label>
        <input
          type="checkbox"
          id={`pathway-${pathwayId}`}
          checked={isSelected}
          onChange={() => onToggle(pathwayId)}
          onKeyDown={handleKeyDown}
        />
        <label htmlFor={`pathway-${pathwayId}`}>
          {pathwayName}
        </label>
      </label>
    </div>
  );
};

PathwayItem.propTypes = {
  pathwayId: PropTypes.number.isRequired,
  pathwayName: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default PathwayItem;
