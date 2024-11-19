import { useState, useEffect, useRef } from "react";
import FeatureItem from "./utils/FeatureItem";
import { generateUniqueId } from "./utils/functions";

const ModelManager = () => {
  const [models, setModels] = useState(null);
  const [modelName, setModelName] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [features, setFeatures] = useState([]);
  const [capabilities, setCapabilities] = useState([]);
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const modelNameInputRef = useRef(null);

  useEffect(() => {
    const loadData = () => {
      try {
        const storedModels = JSON.parse(localStorage.getItem('models')) || [];
        const storedFeatures = JSON.parse(localStorage.getItem('features')) || [];
        const storedCapabilities = JSON.parse(localStorage.getItem('capabilities')) || [];
        const storedTypes = JSON.parse(localStorage.getItem('types')) || [];

        setModels(storedModels);
        setFeatures(storedFeatures);
        setCapabilities(storedCapabilities);
        setTypes(storedTypes);
      } catch (error) {
        console.error("Failed to load data from local storage", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (models) {
      localStorage.setItem('models', JSON.stringify(models));
    }
  }, [models]);

  const addModel = () => {
    if (modelName && selectedFeatures.length > 0) {
      const newModel = {
        id: generateUniqueId(models),
        name: modelName,
        featureIds: selectedFeatures
      };
      setModels(prevModels => [...prevModels, newModel]);
      setModelName("");
      setSelectedFeatures([]);
      modelNameInputRef.current.focus();
    }
  };

  const removeModel = (id) => {
    setModels(prevModels => prevModels.filter((model) => model.id !== id));
  };

  const toggleFeatureSelection = (featureId) => {
    setSelectedFeatures(prevSelectedFeatures => {
      if (prevSelectedFeatures.includes(featureId)) {
        return prevSelectedFeatures.filter(feature => feature !== featureId);
      } else {
        return [...prevSelectedFeatures, featureId];
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addModel();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Model Manager!</h1>
      <div className="model-form">
        <input
          type="text"
          placeholder="Model Name"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={modelNameInputRef}
          autoFocus
        />
        <div className="feature-selection">
          <h3>Select Features</h3>
          {features.length === 0 ? (
            <p>No features available. Please add features first.</p>
          ) : (
            features.map((feature) => (
              <FeatureItem
                key={feature.id}
                featureId={feature.id}
                featureName={feature.name}
                featureCapability={feature.capabilityId}
                featureType={feature.typeId}
                capabilities={capabilities}
                types={types}
                isSelected={selectedFeatures.includes(feature.id)}
                onToggle={toggleFeatureSelection}
              />
            ))
          )}
        </div>
        <button onClick={addModel}>Add Model</button>
      </div>
      <div className="model-list">
        <h2>Models</h2>
        {models.length === 0 && <p>No models added yet.</p>}
        {models.map((model) => (
          <div key={model.id} className="model-item">
            <div>Name: {model.name}</div>
            <div>Features: {
              model.featureIds
                .map(featureId => {
                  const feature = features.find(feature => feature.id === featureId);
                  return feature.name;
                })
                .join(", ")
              }
            </div>
            <button onClick={() => removeModel(model.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelManager;
