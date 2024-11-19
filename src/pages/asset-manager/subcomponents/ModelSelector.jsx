import PropTypes from "prop-types";

const ModelSelector = ({ models, selectedModel, setSelectedModel }) => {
  const handleChange = (e) => {
    const modelId = Number(e.target.value);
    const selectedModel = models.find(model => model.id === modelId);
    setSelectedModel(selectedModel);
  };

  return (
    <select value={selectedModel?.id || ""} onChange={handleChange}>
      <option value="">Select Model</option>
      {models.map((model) => (
        <option key={model.id} value={model.id}>
          {model.name}
        </option>
      ))}
    </select>
  );
};

ModelSelector.propTypes = {
  models: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedModel: PropTypes.object,
  setSelectedModel: PropTypes.func.isRequired,
};

export default ModelSelector;
