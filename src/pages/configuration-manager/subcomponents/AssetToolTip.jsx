import { useState } from "react";

const AssetToolTip = () => {
  const [tooltipText, setTooltipText] = useState("Notes"); // Default tooltip text
  const [isEditing, setIsEditing] = useState(false); // Toggle input field visibility

  const handleButtonClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    setTooltipText(event.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false); // Close input field on blur
  };

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <button
        onMouseEnter={(e) => {
          e.target.title = tooltipText; // Update tooltip text on hover
        }}
        onClick={handleButtonClick}
      >
        Notes
      </button>
      {isEditing && (
        <input
          type="text"
          value={tooltipText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: "5px",
            padding: "5px",
            fontSize: "14px",
          }}
        />
      )}
    </span>
  );
};

export default AssetToolTip;
