import { useState, useEffect, useRef } from "react";
import { generateUniqueId } from "./utils/functions";
import CapabilitySelector from "./utils/CapabilitySelector";
import TypeSelector from "./utils/TypeSelector";

const FeatureManager = () => {
  const [features, setFeatures] = useState(null);
  const [featureName, setFeatureName] = useState("");
  const [capabilities, setCapabilities] = useState([]);
  const [selectedCapability, setSelectedCapability] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const featureNameInputRef = useRef(null);

  useEffect(() => {
    const loadFeatures = () => {
      try {
        const storedFeatures = JSON.parse(localStorage.getItem('features')) || [];
        const storedCapabilities = JSON.parse(localStorage.getItem('capabilities')) || [];
        const storedTypes = JSON.parse(localStorage.getItem('types')) || [];
        setFeatures(storedFeatures);
        setCapabilities(storedCapabilities);
        setTypes(storedTypes);
      } catch (error) {
        console.error("Failed to load data from local storage", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeatures();
  }, []);

  useEffect(() => {
    if (features) {
      localStorage.setItem('features', JSON.stringify(features));
    }
  }, [features]);

  const addFeature = () => {
    if (featureName && selectedType && selectedCapability) {
      const newFeature = {
        id: generateUniqueId(features),
        name: featureName,
        capabilityId: selectedCapability.id,
        typeId: selectedType.id
      };
      const newFeatures = [...(features), newFeature];
      setFeatures(newFeatures);
      setFeatureName("");
      if (featureNameInputRef.current) {
        featureNameInputRef.current.focus();
      }
    }
  };

  const removeFeature = (id) => {
    if (features) {
      const newFeatures = features.filter((feature) => feature.id !== id);
      setFeatures(newFeatures);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addFeature();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Feature Manager!</h1>
      <div className="feature-form">
        <div>
          <input
            type="text"
            placeholder="Feature Name"
            value={featureName}
            onChange={(e) => setFeatureName(e.target.value)}
            onKeyDown={handleKeyPress}
            ref={featureNameInputRef}
            autoFocus
          />
        </div>
        <div>
          <CapabilitySelector
            capabilities={capabilities}
            selectedCapability={selectedCapability}
            setSelectedCapability={setSelectedCapability}
          />
        </div>
        <div>
          <TypeSelector
            types={types}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </div>
        <div>
          <button onClick={addFeature}>Add Feature</button>
        </div>
      </div>
      <div className="feature-list">
        <h2>Features</h2>
        {features === null ? (
          <p>Loading...</p>
        ) : features.length === 0 ? (
          <p>No features added yet.</p>
        ) : (
          features.map((feature) => (
            <div key={feature.id} className="feature-item">
              <div>Name: {feature.name}</div>
              <div>
                Capability: {
                  capabilities.find(capability => capability.id === feature.capabilityId)?.name
                }
              </div>
              <div>
                Type: {
                  types.find(type => type.id === feature.typeId)?.name
                }
              </div>
              <button onClick={() => removeFeature(feature.id)}>Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FeatureManager;
