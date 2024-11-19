import PropTypes from "prop-types";

const CapabilitySelector = ({ capabilities, selectedCapability, setSelectedCapability }) => {
  const handleChange = (e) => {
    const capabilityId = Number(e.target.value);
    const selectedCapability = capabilities.find(capability => capability.id === capabilityId);
    setSelectedCapability(selectedCapability);
  };

  return (
    <select value={selectedCapability?.id || ""} onChange={handleChange}>
      <option value="">Select Capability</option>
      {capabilities.map((capability) => (
        <option key={capability.id} value={capability.id}>
          {capability.name}
        </option>
      ))}
    </select>
  );
};

CapabilitySelector.propTypes = {
  capabilities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedCapability: PropTypes.object,
  setSelectedCapability: PropTypes.func.isRequired,
};

export default CapabilitySelector;
