import { useState, useEffect, useRef } from "react";
import { generateUniqueId } from "./utils/functions";

const CapabilityManager = () => {
  const [capabilities, setCapabilities] = useState(null);
  const [capabilityName, setCapabilityName] = useState("");
  const capabilityNameInputRef = useRef(null);
  const [capabilityCount, setCapabilityCount] = useState(0);

  useEffect(() => {
    const loadCapabilities = () => {
      try {
        const storedCapabilities = JSON.parse(localStorage.getItem('capabilities')) || [];
        setCapabilities(storedCapabilities);
        setCapabilityCount(storedCapabilities.length)
      } catch (error) {
        console.error("Failed to load capabilities from local storage", error);
      }
    };

    loadCapabilities();
  }, []);

  useEffect(() => {
    if (capabilities !== null) {
      localStorage.setItem('capabilities', JSON.stringify(capabilities));
    }
  }, [capabilities]);

  const addCapability = () => {
    if (capabilityName) {
      const newCapability = {
        id: generateUniqueId(capabilities),
        name: capabilityName,
      };
      const newCapabilities = [...(capabilities), newCapability];
      setCapabilities(newCapabilities);
      setCapabilityName("");
      if (capabilityNameInputRef.current) {
        capabilityNameInputRef.current.focus();
      }
    }
  };

  const removeCapability = (id) => {
    if (capabilities) {
      const newCapabilities = capabilities.filter((capability) => capability.id !== id);
      setCapabilities(newCapabilities);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addCapability();
    }
  };

  return (
    <div>
      <h1>Capability Manager!</h1>
      {capabilityCount === 0 && <p>Create a primary capability that uses pathways.</p>}
      {capabilityCount === 1 && <p>Create a second capability for configuration only.</p>}
      {capabilityCount > 1 && <p>Create other capabilities to track if required.</p>}
      <div className="capability-form">
        <div>
          <input
            type="text"
            placeholder="Capability Name"
            value={capabilityName}
            onChange={(e) => setCapabilityName(e.target.value)}
            onKeyDown={handleKeyPress}
            ref={capabilityNameInputRef}
            autoFocus
          />
        </div>
        <div>
          <button onClick={addCapability}>Add Capability</button>
        </div>
      </div>
      <div className="capability-list">
        <h2>Capabilities</h2>
        {capabilities === null ? (
          <p>Loading...</p>
        ) : capabilities.length === 0 ? (
          <p>No capabilities added yet.</p>
        ) : (
          capabilities.map((capability) => (
            <div key={capability.id} className="capability-item">
              <div>Name: {capability.name}</div>
              <button onClick={() => removeCapability(capability.id)}>Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CapabilityManager;
