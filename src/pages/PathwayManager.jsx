import { useState, useEffect, useRef } from "react";
import { generateUniqueId } from "./utils/functions";

const PathwayManager = () => {
  const [pathways, setPathways] = useState(null);
  const [pathwayName, setPathwayName] = useState("");
  const [modelCapacity, setModelCapacity] = useState({});
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const pathwayNameInputRef = useRef(null);

  useEffect(() => {
    const loadData = () => {
      try {
        const storedPathways = JSON.parse(localStorage.getItem('pathways')) || [];
        const storedModels = JSON.parse(localStorage.getItem('models')) || [];

        const parsedModels = (storedModels).map(model => ({
          ...model,
          id: Number(model.id)
        }));

        setModels(parsedModels);
        setPathways(storedPathways);

        const initialCapacity = parsedModels.reduce((acc, model) => {
          acc[model.id] = "";
          return acc;
        }, {});
        setModelCapacity(initialCapacity);
      } catch (error) {
        console.error("Failed to load data from local storage", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (pathways !== null) {
      localStorage.setItem('pathways', JSON.stringify(pathways));
    }
  }, [pathways]);

  const addPathway = () => {
    if (pathwayName) {
      const newPathway = {
        id: generateUniqueId(pathways),
        name: pathwayName,
        capacity: Object.fromEntries(
          Object.entries(modelCapacity).map(([modelId, capacity]) => [Number(modelId), capacity ? parseInt(capacity, 10) : null])
        ),
      };
      setPathways(prevPathways => [...(prevPathways), newPathway]);
      setPathwayName("");
      setModelCapacity(models.reduce((acc, model) => {
        acc[model.id] = "";
        return acc;
      }, {}));
      pathwayNameInputRef.current.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.target.type === 'text' || e.target.type === 'number') {
        addPathway();
      }
    }
  };

  const removePathway = (id) => {
    setPathways(prevPathways => prevPathways.filter((pathway) => pathway.id !== id));
  };

  const handleCapacityChange = (modelId, value) => {
    setModelCapacity(prevCapacity => ({
      ...prevCapacity,
      [modelId]: value
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Pathway Manager!</h1>
      <div className="pathway-form">
        <input
          type="text"
          placeholder="Pathway Name"
          value={pathwayName}
          onChange={(e) => setPathwayName(e.target.value)}
          onKeyDown={handleKeyPress}
          ref={pathwayNameInputRef}
          autoFocus
        />
        <div className="model-capacity">
          {models.map((model) => (
            <div key={model.id} className="model-capacity-input">
              <label>{model.name}:</label>
              <input
                type="number"
                placeholder="Capacity"
                value={modelCapacity[model.id] || ""}
                onChange={(e) => handleCapacityChange(model.id, e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>
          ))}
        </div>
        <button onClick={addPathway}>Add Pathway</button>
      </div>
      <div className="pathway-list">
        <h2>Pathways</h2>
        {pathways.length === 0 && <p>No pathways added yet.</p>}
        {pathways.map((pathway) => (
          <div key={pathway.id} className="pathway-item">
            <div>Name: {pathway.name}</div>
            <div>
              Capacities: {
                Object.entries(pathway.capacity).map(([modelId, capacity], i) => {
                  const model = models.find(m => m.id === Number(modelId));
                  return (
                    <div key={i}>
                      {model.name}: {capacity !== null ? capacity : "N/A"}
                    </div>
                  );
                })
              }
            </div>
            <button onClick={() => removePathway(pathway.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PathwayManager;
