import { useState, useEffect, useRef } from "react";
import { generateUniqueId } from "./utils/functions";

const TypeManager = () => {
  const [types, setTypes] = useState(null);
  const [typeName, setTypeName] = useState("");
  const typeNameInputRef = useRef(null);

  useEffect(() => {
    const loadTypes = () => {
      try {
        const storedTypes = JSON.parse(localStorage.getItem('types')) || [];
        setTypes(storedTypes);
      } catch (error) {
        console.error("Failed to load types from local storage", error);
      }
    };

    loadTypes();
  }, []);

  useEffect(() => {
    if (types !== null) {
      localStorage.setItem('types', JSON.stringify(types));
    }
  }, [types]);

  const addType = () => {
    if (typeName) {
      const newType = {
        id: generateUniqueId(types),
        name: typeName,
      };
      const newTypes = [...(types), newType];
      setTypes(newTypes);
      setTypeName("");
      if (typeNameInputRef.current) {
        typeNameInputRef.current.focus();
      }
    }
  };

  const removeType = (id) => {
    if (types) {
      const newTypes = types.filter((type) => type.id !== id);
      setTypes(newTypes);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addType();
    }
  };

  return (
    <div>
      <h1>Type Manager!</h1>
      <div className="type-form">
        <div>
          <input
            type="text"
            placeholder="Type Name"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
            onKeyDown={handleKeyPress}
            ref={typeNameInputRef}
            autoFocus
          />
        </div>
        <div>
          <button onClick={addType}>Add Type</button>
        </div>
      </div>
      <div className="type-list">
        <h2>Types</h2>
        {types === null ? (
          <p>Loading...</p>
        ) : types.length === 0 ? (
          <p>No types added yet.</p>
        ) : (
          types.map((type) => (
            <div key={type.id} className="type-item">
              <div>Name: {type.name}</div>
              <button onClick={() => removeType(type.id)}>Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TypeManager;
