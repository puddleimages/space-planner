import PropTypes from 'prop-types';
import { useEffect } from 'react';
import OptionContainer from './OptionContainer';
import AssetToolTip from './AssetToolTip';

const AssetContainer = ({ 
  asset,
  assets,
  options,
  suboptions,
  pathways,
  models,
  features,
  types,
  capabilities,
  redAssetIds,
  setRedAssetIds,
  onOptionContextMenu,
  onSuboptionContextMenu,
  onSuboptionFeatureTypeContextMenu,
  onSuboptionFeatureContextMenu,
  onPathwayContextMenu,
  redOptionIds,
  redSuboptionIds,
  redSuboptionFeatureTypeObjects,
  redSuboptionFeatureObjects,
  redPathwayIds,
  onSuboptionClick,
  onSuboptionFeatureClick,
  onPathwayClick,
  configuredSuboptionObjects,
  configuredSuboptionFeatureObjects,
  configuredPathwayObjects,
}) => {
  useEffect(() => {
    const containers = document.querySelectorAll('.status-container');
    let maxWidth = 0;

    containers.forEach(container => {
      container.style.width = 'auto';
      const containerWidth = container.offsetWidth;
      if (containerWidth > maxWidth) {
        maxWidth = containerWidth;
      }
    });

    containers.forEach(container => {
      container.style.width = `${maxWidth}px`;
    });
  }, []);

  const model = models.find(model => model.id === asset.model);
  const modelFeatures = model.featureIds.map(featureId => 
    features.find(feature => feature.id === featureId)
  );

  const modelFeaturesByCapability = modelFeatures.reduce((acc, feature) => {
    if (!feature) return acc;
    const capabilityId = feature.capabilityId;
    if (!acc[capabilityId]) {
      acc[capabilityId] = [];
    }
    acc[capabilityId].push(feature);
    return acc;
  }, {});

  console.log("modelFeaturesByCapability", modelFeaturesByCapability)

  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  const handleAssetContextMenu = (event) => {
    event.preventDefault();
    setRedAssetIds(prevRedAssetIds => {
      const isAssetRed = prevRedAssetIds.includes(asset.id);
      if (isAssetRed) {
        return prevRedAssetIds.filter(id => id !== asset.id);
      } else {
        return [...prevRedAssetIds, asset.id];
      }
    });
  };

  const handleOptionContextMenu = (optionId) => {
    onOptionContextMenu(optionId);
  };

  const handleSuboptionContextMenu = (suboptionId) => {
    onSuboptionContextMenu(suboptionId);
  };

  const handleSuboptionFeatureContextMenu = (suboptionFeatureObject) => {
    onSuboptionFeatureContextMenu(suboptionFeatureObject);
  };

  const handleSuboptionFeatureTypeContextMenu = (suboptionFeatureTypeObject) => {
    onSuboptionFeatureTypeContextMenu(suboptionFeatureTypeObject);
  };

  const handlePathwayContextMenu = (pathwayId) => {
    onPathwayContextMenu(pathwayId);
  };

  const isRedAsset = redAssetIds.includes(asset.id);
  const hasConfiguredPathway = configuredPathwayObjects.find(obj => obj.assetId === asset.id) &&
    !redPathwayIds.includes(configuredPathwayObjects.find(obj => obj.assetId === asset.id).pathwayId
  );

  return (
    <div 
      className={`asset-container`} 
      onContextMenu={handleContextMenu}
    >
      <div className={`status-container ${isRedAsset ? 'red' : ''}`}>
        <div onContextMenu={handleAssetContextMenu}>
          {asset.name}
        </div>

        {capabilities.map((capability) => {
          const hasAssociatedGreenFeature = modelFeaturesByCapability[capability.id]?.some((feature) => {
            return (
              (capability.id === 1 &&
              configuredSuboptionFeatureObjects.find(obj => obj.assetId === asset.id && obj.featureId === feature.id) &&
              hasConfiguredPathway &&
              redSuboptionFeatureObjects.find(
                obj => obj.featureId === feature.id)?.suboptionId !== configuredSuboptionFeatureObjects.find(
                  obj => obj.assetId === asset.id && obj.featureId === feature.id).suboptionId) ||
              (capability.id > 1 &&
              configuredSuboptionFeatureObjects.find(obj => obj.assetId === asset.id && obj.featureId === feature.id) &&
              redSuboptionFeatureObjects.find(
                obj => obj.featureId === feature.id)?.suboptionId !== configuredSuboptionFeatureObjects.find(
                  obj => obj.assetId === asset.id && obj.featureId === feature.id).suboptionId)
            );
          });

          if (!modelFeaturesByCapability[capability.id]) return null;

          return (
            <div key={capability.id} className={`feature-capability-container ${hasAssociatedGreenFeature ? 'green' : 'red'}`}>
              <div>{capability.name}</div>
              <div className="features-container">
                {modelFeaturesByCapability[capability.id].map((feature) => (
                  <div key={feature.id} className={
                    `feature-container ${
                      (capability.id === 1 &&
                      configuredSuboptionFeatureObjects.find(obj => obj.assetId === asset.id && obj.featureId === feature.id) &&
                      hasConfiguredPathway &&
                      redSuboptionFeatureObjects.find(
                        obj => obj.featureId === feature.id)?.suboptionId !== configuredSuboptionFeatureObjects.find(
                          obj => obj.assetId === asset.id && obj.featureId === feature.id).suboptionId) ||
                      (capability.id > 1 &&
                      configuredSuboptionFeatureObjects.find(obj => obj.assetId === asset.id && obj.featureId === feature.id) &&
                      redSuboptionFeatureObjects.find(
                        obj => obj.featureId === feature.id)?.suboptionId !== configuredSuboptionFeatureObjects.find(
                          obj => obj.assetId === asset.id && obj.featureId === feature.id).suboptionId)
                      ? 'green' : ''}`
                    }>
                    <div>{feature.name}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="options-container">
        {options
          .filter(option => asset.optionIds.includes(option.id))
          .map(option => {
            return (
              <OptionContainer
                key={option.id}
                asset={asset}
                assets={assets}
                option={option}
                options={options}
                suboptions={suboptions}
                pathways={pathways}
                modelFeatures={modelFeatures}
                types={types}
                capabilities={capabilities}
                onOptionContextMenu={handleOptionContextMenu}
                onSuboptionContextMenu={handleSuboptionContextMenu}
                onSuboptionFeatureTypeContextMenu={handleSuboptionFeatureTypeContextMenu}
                onSuboptionFeatureContextMenu={handleSuboptionFeatureContextMenu}
                onPathwayContextMenu={handlePathwayContextMenu}
                isRedOption={!redOptionIds.includes(option.id)}
                redSuboptionIds={redSuboptionIds}
                redSuboptionFeatureTypeObjects={redSuboptionFeatureTypeObjects}
                redSuboptionFeatureObjects={redSuboptionFeatureObjects}
                redPathwayIds={redPathwayIds}
                onSuboptionClick={onSuboptionClick}
                onSuboptionFeatureClick={onSuboptionFeatureClick}
                onPathwayClick={onPathwayClick}
                configuredSuboptionObjects={configuredSuboptionObjects}
                configuredSuboptionFeatureObjects={configuredSuboptionFeatureObjects}
                configuredPathwayObjects={configuredPathwayObjects}
              />
            );
          })}
      </div>
    </div>
  );
};

AssetContainer.propTypes = {
  asset: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    model: PropTypes.number.isRequired,
    optionIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  assets: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  suboptions: PropTypes.array.isRequired,
  pathways: PropTypes.array.isRequired,
  models: PropTypes.array.isRequired,
  features: PropTypes.array.isRequired,
  types: PropTypes.array.isRequired,
  capabilities: PropTypes.array.isRequired,
  onOptionContextMenu: PropTypes.func.isRequired,
  onSuboptionContextMenu: PropTypes.func.isRequired,
  onSuboptionFeatureTypeContextMenu: PropTypes.func.isRequired,
  onSuboptionFeatureContextMenu: PropTypes.func.isRequired,
  onPathwayContextMenu: PropTypes.func.isRequired,
  redAssetIds: PropTypes.array.isRequired,
  setRedAssetIds: PropTypes.func.isRequired,
  redOptionIds: PropTypes.array.isRequired,
  redSuboptionIds: PropTypes.array.isRequired,
  redSuboptionFeatureTypeObjects: PropTypes.array.isRequired,
  redSuboptionFeatureObjects: PropTypes.array.isRequired,
  redPathwayIds: PropTypes.array.isRequired,
  onSuboptionClick: PropTypes.func.isRequired,
  onSuboptionFeatureClick: PropTypes.func.isRequired,
  onPathwayClick: PropTypes.func.isRequired,
  configuredSuboptionObjects: PropTypes.array.isRequired,
  configuredSuboptionFeatureObjects: PropTypes.array.isRequired,
  configuredPathwayObjects: PropTypes.array.isRequired,
};

export default AssetContainer;
