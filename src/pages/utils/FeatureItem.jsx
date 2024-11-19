import PropTypes from "prop-types";

const FeatureItem = ({ featureId, featureName, featureCapability, featureType, capabilities, types, isSelected, onToggle }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onToggle(featureId);
    }
  };

  return (
    <div className="feature-item">
      <input
        type="checkbox"
        id={`feature-${featureId}`}
        checked={isSelected}
        onChange={() => onToggle(featureId)}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor={`feature-${featureId}`}>
        {featureName} ({capabilities.find(capability => capability.id === featureCapability)?.name}/{types.find(type => type.id === featureType)?.name})
      </label>
    </div>
  );
};

FeatureItem.propTypes = {
  featureId: PropTypes.number.isRequired,
  featureName: PropTypes.string.isRequired,
  featureCapability: PropTypes.number.isRequired,
  featureType: PropTypes.number.isRequired,
  capabilities: PropTypes.array.isRequired,
  types: PropTypes.array.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default FeatureItem;
