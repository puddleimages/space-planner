import { useState, useEffect, useRef } from "react";
import { generateUniqueId } from "./utils/functions";
import FeatureItem from "./utils/FeatureItem";
import PathwayItem from "./utils/PathwayItem";

const SuboptionsManager = () => {
  const [suboptions, setSuboptions] = useState(null);
  const [suboptionName, setSuboptionName] = useState("");
  const [selectedFeatureIds, setSelectedFeatureIds] = useState([]);
  const [selectedPathwayIds, setSelectedPathwayIds] = useState([]);
  const [features, setFeatures] = useState([]);
  const [capabilities, setCapabilities] = useState([]);
  const [types, setTypes] = useState([]);
  const [pathways, setPathways] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const suboptionNameInputRef = useRef(null);

  useEffect(() => {
    const loadData = () => {
      try {
        const storedSuboptions = JSON.parse(localStorage.getItem('suboptions')) || [];
        const storedFeatures = JSON.parse(localStorage.getItem('features')) || [];
        const storedCapabilities = JSON.parse(localStorage.getItem('capabilities')) || [];
        const storedTypes = JSON.parse(localStorage.getItem('types')) || [];
        const storedPathways = JSON.parse(localStorage.getItem('pathways')) || [];

        setSuboptions(storedSuboptions);
        setFeatures(storedFeatures);
        setCapabilities(storedCapabilities);
        setTypes(storedTypes);
        setPathways(storedPathways);

        setSelectedPathwayIds([]);
      } catch (error) {
        console.error("Failed to load data from local storage", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (suboptions) {
      localStorage.setItem('suboptions', JSON.stringify(suboptions));
    }
  }, [suboptions]);

  const addSuboption = () => {
    if (suboptionName) {
      const newSuboption = {
        id: generateUniqueId(suboptions || []),
        name: suboptionName,
        supportedFeatureIds: selectedFeatureIds,
        exclusivePathwayIds: selectedPathwayIds,
      };
      setSuboptions([...suboptions, newSuboption]);
      setSuboptionName("");
      setSelectedPathwayIds([]);
      suboptionNameInputRef.current.focus();
    }
  };

  const removeSuboption = (id) => {
    const newSuboptions = suboptions.filter((suboption) => suboption.id !== id);
    setSuboptions(newSuboptions);
  };

  const toggleFeatureSelection = (featureId) => {
    setSelectedFeatureIds(prev =>
      prev.includes(featureId) ? prev.filter(f => f !== featureId) : [...prev, featureId]
    );
  };

  const togglePathwaySelection = (pathwayId) => {
    setSelectedPathwayIds(prev =>
      prev.includes(pathwayId) ? prev.filter(p => p !== pathwayId) : [...prev, pathwayId]
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      addSuboption();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Suboptions Manager!</h1>
      <div className="suboption-form">
        <input
          type="text"
          placeholder="Suboption Name"
          value={suboptionName}
          onChange={(e) => setSuboptionName(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={suboptionNameInputRef}
          autoFocus
        />
        <div className="feature-selection">
          <h3>Select Supported Features</h3>
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
                isSelected={selectedFeatureIds.includes(feature.id)}
                onToggle={toggleFeatureSelection}
              />
            ))
          )}
        </div>
        <div className="pathway-selection">
          <h3>Select Sub-option Exclusive Pathways</h3>
          {pathways.length === 0 ? (
            <p>No pathways available. Please add pathways first.</p>
          ) : (
            pathways.map((pathway) => (
              <PathwayItem
                key={pathway.id}
                pathwayId={pathway.id}
                pathwayName={pathway.name}
                isSelected={selectedPathwayIds.includes(pathway.id)}
                onToggle={togglePathwaySelection}
              />
            ))
          )}
        </div>
        <button onClick={addSuboption}>Add Suboption</button>
      </div>
      <div className="suboption-list">
        <h2>Suboptions</h2>
        {suboptions.length === 0 ? <p>No suboptions added yet.</p> : (
          suboptions.map((suboption) => (
            <div key={suboption.id} className="suboption-item">
              <div>{suboption.name}</div>
              <div>Supported features: {                
                suboption.supportedFeatureIds
                  .map(FeatureId => {
                    const feature = features.find(feature => feature.id === FeatureId);
                    return feature.name;
                  })
                  .join(", ")
                }
              </div>
              <div>Exclusive pathways: {                
                suboption.exclusivePathwayIds
                  .map(pathwayId => {
                    const pathway = pathways.find(pathway => pathway.id === pathwayId);
                    return pathway.name;
                  })
                  .join(", ") || 'N/A'
                }
              </div>
              <button onClick={() => removeSuboption(suboption.id)}>Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SuboptionsManager;
