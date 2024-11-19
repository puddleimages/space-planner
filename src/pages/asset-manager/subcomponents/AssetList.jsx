import PropTypes from "prop-types";

const AssetList = ({ assets, options, models, onRemoveAsset }) => (
  <div className="asset-list">
    <h2>Assets</h2>
    {assets.length === 0 && <p>No assets added yet.</p>}
    {assets.map((asset, index) => (
      <div key={index} className="asset-item">
        <div>{asset.name}</div>
        <div>
          Model: {
            models.find(model => model.id === asset.model)?.name
          }
        </div>
        <div>
          Options: {
            asset.optionIds
              .map(optionId => {
                const option = options.find(option => option.id === optionId);
                return option.name;
              })
              .join(", ")
          }
        </div>
        <button onClick={() => onRemoveAsset(index)}>Remove</button>
      </div>
    ))}
  </div>
);

AssetList.propTypes = {
  assets: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  models: PropTypes.array.isRequired,
  onRemoveAsset: PropTypes.func.isRequired,
};

export default AssetList;
