import PropTypes from "prop-types";

const TypeSelector = ({ types, selectedType, setSelectedType }) => {
  const handleChange = (e) => {
    const typeId = Number(e.target.value);
    const selectedType = types.find(type => type.id === typeId);
    setSelectedType(selectedType);
  };

  return (
    <select value={selectedType?.id || ""} onChange={handleChange}>
      <option value="">Select Type</option>
      {types.map((type) => (
        <option key={type.id} value={type.id}>
          {type.name}
        </option>
      ))}
    </select>
  );
};

TypeSelector.propTypes = {
  types: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedType: PropTypes.object,
  setSelectedType: PropTypes.func.isRequired,
};

export default TypeSelector;
