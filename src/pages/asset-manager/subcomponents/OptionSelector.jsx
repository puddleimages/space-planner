import PropTypes from "prop-types";
import OptionItem from "../../utils/OptionItem";

const OptionSelector = ({ options, selectedOptionIds, onToggle }) => (
  <div className="options-selection">
    <h3>Select Options</h3>
    {options.map((option) => (
      <OptionItem
        key={option.id}
        optionId={option.id}
        optionName={option.name}
        isSelected={selectedOptionIds.includes(option.id)}
        onToggle={onToggle}
      />
    ))}
  </div>
);

OptionSelector.propTypes = {
  options: PropTypes.array.isRequired,
  selectedOptionIds: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default OptionSelector;
