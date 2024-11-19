import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import ModelSelector from "./ModelSelector";
import OptionSelector from "./OptionSelector";

const AssetForm = ({ models, suboptions, options, onAddAsset }) => {
  const [assetName, setAssetName] = useState("");
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedOptionIds, setSelectedOptionIds] = useState([]);
  const optionNameInputRef = useRef(null);

  useEffect(() => {
    if (models.length > 0) {
      const lastModel = models[models.length - 1];
      setSelectedModel(lastModel);
    }
  }, [models]);

  useEffect(() => {
    if (selectedModel) {
      const validOptions = filterOptions(selectedModel.id).map(option => option.id);
      setSelectedOptionIds(prevSelectedOptionIds => 
        prevSelectedOptionIds.filter(option => validOptions.includes(option))
      );
    }
  }, [selectedModel]);

  const filterOptions = (modelId) => {
    const selectedModelFeatureIds = models.find(model => model.id === modelId)?.featureIds || [];

    return options.filter(option => {
      const optionSuboptions = suboptions.filter(suboption => option?.suboptionIds.includes(suboption.id));
      const uniqueSupportedFeatureIds = [...new Set(optionSuboptions.flatMap(suboption => suboption.supportedFeatureIds))];
      return uniqueSupportedFeatureIds.some(feature => selectedModelFeatureIds.includes(feature));
    });
  };

  const handleOptionChange = (optionId) => {
    setSelectedOptionIds(prevSelectedOptionIds => 
      prevSelectedOptionIds.includes(optionId)
        ? prevSelectedOptionIds.filter(o => o !== optionId)
        : [...prevSelectedOptionIds, optionId]
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddAsset();
    }
  };

  const handleAddAsset = () => {
    if (assetName && selectedModel && selectedOptionIds.length > 0) {
      onAddAsset({
        id: '',
        name: assetName,
        model: selectedModel.id,
        optionIds: selectedOptionIds,
      });
      setAssetName("");
      setSelectedOptionIds([]);
      optionNameInputRef.current.focus();
    }
  };

  return (
    <div className="asset-form">
      <input
        type="text"
        placeholder="Asset Name"
        value={assetName}
        onChange={(e) => setAssetName(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={optionNameInputRef}
        autoFocus
      />
      <ModelSelector
        models={models}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
      <OptionSelector
        options={filterOptions(selectedModel?.id)}
        selectedOptionIds={selectedOptionIds}
        onToggle={handleOptionChange}
      />
      <button onClick={handleAddAsset}>Add Asset</button>
    </div>
  );
};

AssetForm.propTypes = {
  models: PropTypes.array.isRequired,
  suboptions: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  onAddAsset: PropTypes.func.isRequired,
};

export default AssetForm;
