import { useState, useEffect, useRef } from "react";
import { generateUniqueId } from "./utils/functions";
import SuboptionItem from "./utils/SuboptionItem";
import PathwayItem from "./utils/PathwayItem";

const OptionManager = () => {
  const [options, setOptions] = useState(null);
  const [optionName, setOptionName] = useState("");
  const [selectedSuboptionIds, setSelectedSuboptionIds] = useState([]);
  const [selectedPathwayIds, setSelectedPathwayIds] = useState([]);
  const [suboptions, setSuboptions] = useState([]);
  const [pathways, setPathways] = useState([]);
  const [loading, setLoading] = useState(true);

  const optionNameInputRef = useRef(null);

  useEffect(() => {
    const fetchData = () => {
      const storedOptions = JSON.parse(localStorage.getItem('options')) || [];
      const storedSuboptions = JSON.parse(localStorage.getItem('suboptions')) || [];
      const storedPathways = JSON.parse(localStorage.getItem('pathways')) || [];

      setOptions(storedOptions);
      setSuboptions(storedSuboptions);
      setPathways(storedPathways);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (options) {
      localStorage.setItem('options', JSON.stringify(options));
    }
  }, [options]);

  const addOption = () => {
    if (optionName && selectedSuboptionIds.length > 0) {
      const newOption = {
        id: generateUniqueId(options),
        name: optionName,
        suboptionIds: selectedSuboptionIds,
        pathwayIds: selectedPathwayIds
      };
      setOptions([...options, newOption]);
      setOptionName("");
      setSelectedSuboptionIds([]);
      setSelectedPathwayIds([]);
      optionNameInputRef.current.focus();
    }
  };

  const removeOption = (id) => {
    const newOptions = options.filter(option => option.id !== id);
    setOptions(newOptions);
  };

  const toggleSuboptionSelection = (suboptionId) => {
    setSelectedSuboptionIds(prev =>
      prev.includes(suboptionId) ? prev.filter(s => s !== suboptionId) : [...prev, suboptionId]
    );
  };

  const togglePathwaySelection = (pathwayId) => {
    setSelectedPathwayIds(prev =>
      prev.includes(pathwayId) ? prev.filter(p => p !== pathwayId) : [...prev, pathwayId]
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addOption();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Option Manager!</h1>
      <div className="option-form">
        <input
          type="text"
          placeholder="Option Name"
          value={optionName}
          onChange={(e) => setOptionName(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={optionNameInputRef}
          autoFocus
        />
        <div className="suboption-selection">
          <h3>Select Suboptions</h3>
          {suboptions.map((suboption) => (
            <SuboptionItem
              key={suboption.id}
              suboptionId={suboption.id}
              suboptionName={suboption.name}
              isSelected={selectedSuboptionIds.includes(suboption.id)}
              onToggle={toggleSuboptionSelection}
            />
          ))}
        </div>
        <div className="pathway-selection">
          <h3>Select Pathways</h3>
          {pathways.map((pathway) => (
            <PathwayItem
              key={pathway.id}
              pathwayId={pathway.id}
              pathwayName={pathway.name}
              isSelected={selectedPathwayIds.includes(pathway.id)}
              onToggle={togglePathwaySelection}
            />
          ))}
        </div>
        <button onClick={addOption}>Add Option</button>
      </div>
      <div className="option-list">
        <h2>Options</h2>
        {options.length === 0 && <p>No options added yet.</p>}
        {options.map((option) => (
          <div key={option.id} className="option-item">
            <div>{option.name}</div>
            <div>Suboptions: {                
              option.suboptionIds
                .map(suboptionId => {
                  const suboption = suboptions.find(f => f.id === suboptionId);
                  return suboption.name;
                })
                .join(", ")
              }
            </div>
            <div>Pathways: {                
              option.pathwayIds
                .map(pathwayId => {
                  const pathway = pathways.find(f => f.id === pathwayId);
                  return pathway.name;
                })
                .join(", ") || 'N/A'
              }
            </div>
            <button onClick={() => removeOption(option.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionManager;
