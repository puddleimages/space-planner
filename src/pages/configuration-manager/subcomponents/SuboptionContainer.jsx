import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';

const SuboptionContainer = ({
  asset,
  assets,
  option,
  suboption,
  pathways,
  modelFeatures,
  types,
  primaryCapability,
  onSuboptionContextMenu,
  onSuboptionFeatureContextMenu,
  onSuboptionFeatureTypeContextMenu,
  onPathwayContextMenu,
  isRedSuboption,
  redSuboptionFeatureObjects,
  redSuboptionFeatureTypeObjects,
  redPathwayIds,
  onSuboptionClick,
  onSuboptionFeatureClick,
  configuredSuboptionObjects,
  configuredSuboptionFeatureObjects,
  configuredPathwayObjects,
  handlePathwayClick,
  isConfiguredPathway,
}) => {
  const [isConfigured, setIsConfigured] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current && (divRef.current.classList.contains('blue') || divRef.current.classList.contains('grey'))) {
      setIsConfigured(true);
    } else {
      setIsConfigured(false);
    }
  }, [configuredSuboptionObjects]);

  const filteredFeatures = modelFeatures
    .filter(feature => suboption.supportedFeatureIds.includes(feature.id));
  
  if (filteredFeatures.length === 0) return null;
  
  const featuresByType = filteredFeatures.reduce((acc, feature) => {
    const typeId = feature.typeId;
    if (!acc[typeId]) {
      acc[typeId] = [];
    }
    acc[typeId].push(feature);
    return acc;
  }, {});

  const handleSuboptionContextMenu = (event) => {
    event.preventDefault();
    onSuboptionContextMenu(suboption.id);
  };

  const handleSuboptionFeatureTypeContextMenu = (event, typeId) => {
    event.preventDefault();
    const suboptionFeatureTypeObject = { suboptionId: suboption.id, typeId: typeId };
    onSuboptionFeatureTypeContextMenu(suboptionFeatureTypeObject);
  };

  const handleSuboptionFeatureContextMenu = (event, featureId) => {
    event.preventDefault();
    const suboptionFeatureObject = { suboptionId: suboption.id, featureId: featureId };
    onSuboptionFeatureContextMenu(suboptionFeatureObject);
  };

  const handlePathwayContextMenu = (event, pathwayId) => {
    event.preventDefault();
    onPathwayContextMenu(pathwayId);
  };

  const isRedSuboptionFeatureType = (suboptionId, typeId) =>
    redSuboptionFeatureTypeObjects.some(obj => obj.suboptionId === suboptionId && obj.typeId === typeId);

  const isRedSuboptionFeature = (suboptionId, featureId) =>
    redSuboptionFeatureObjects.some(obj => obj.suboptionId === suboptionId && obj.featureId === featureId);

  const handleSuboptionClick = () => {
    if ((!configuredSuboptionFeatureObjects.some(
      obj => obj.assetId === asset.id && obj.suboptionId === suboption.id && obj.featureId)) &&
    (!configuredSuboptionObjects.find(obj => obj.suboptionId === suboption.id && obj.assetId !== asset.id))) {
      onSuboptionClick({ assetId: asset.id, suboptionId: suboption.id})
    }
  };

  const handleSuboptionFeatureClick = (assetId, optionId, suboptionId, featureId) => {
    // if the associated suboption is configured for that asset
    if (configuredSuboptionObjects.some(obj =>
      obj.assetId === assetId &&
      obj.suboptionId === suboptionId) && 
      // the same feature is not configured on another suboption for this same asset
      !configuredSuboptionFeatureObjects.some(obj =>
        obj.assetId === assetId &&
        obj.suboptionId !== suboptionId &&
        obj.featureId === featureId) &&
      // the feature is not a primary capability
      (modelFeatures.find((feature) => feature.id === featureId).capabilityId !== primaryCapability.id ||
      // the feature is a primary capability
      (modelFeatures.find((feature) => feature.id === featureId).capabilityId === primaryCapability.id &&
      // a pathway is not already configured for the associated asset
      !configuredPathwayObjects.some(obj => obj.assetId === assetId) ||
      // a pathway is configured for this asset on another option or suboption
      configuredPathwayObjects.some(obj => obj.assetId === assetId &&
        (!option.pathwayIds.includes(obj.pathwayId) &&
        !suboption.exclusivePathwayIds.includes(obj.pathwayId)) ||
      // the feature is not the only primary feature configured on this suboption
      configuredSuboptionFeatureObjects.some(obj =>
        obj.assetId === assetId &&
        obj.suboptionId === suboptionId &&
        obj.featureId !== featureId &&
        modelFeatures.find((feature) => feature.id === obj.featureId).capabilityId === primaryCapability.id))
    ))) {
      const suboptionFeatureObject = { assetId: asset.id, optionId: option.id, suboptionId: suboption.id, featureId: featureId };
      onSuboptionFeatureClick(suboptionFeatureObject)
    }
  };

  const isConfiguredSuboption = (assetId, suboptionId) => {
    if (configuredSuboptionObjects.some(
      obj => obj.assetId === assetId && obj.suboptionId === suboptionId
    ) && configuredSuboptionFeatureObjects.find(
      obj => obj.suboptionId === suboptionId
    )) {
      return 'green'
    } else if (configuredSuboptionObjects.some(
      obj => obj.assetId === assetId && obj.suboptionId === suboptionId
    )) {
      return 'lightgreen'
    } else if (configuredSuboptionObjects.some(
      obj => obj.suboptionId === suboptionId
    ) && !configuredSuboptionFeatureObjects.some(
      obj => obj.suboptionId === suboptionId
    )) {
      return 'blue'
    } else if (configuredSuboptionObjects.some(
      obj => obj.suboptionId === suboptionId
    )) {
      return 'grey'
    }
  }

  const isConfiguredSuboptionFeatureType = (assetId, suboptionId, typeId) => {
    console.log(featuresByType[typeId].map(feature => feature.id))
    featuresByType[typeId].map(feature => feature.id)
    if (configuredSuboptionFeatureObjects.some(obj => obj.assetId === assetId &&
      obj.suboptionId === suboptionId && featuresByType[typeId].map(feature => feature.id).includes(obj.featureId)
    )) {
      return 'green'
    }
  }

  const isConfiguredSuboptionFeature = (assetId, suboptionId, featureId) => {
    if (configuredSuboptionFeatureObjects.some(obj => obj.assetId === assetId &&
      obj.suboptionId === suboptionId && obj.featureId === featureId
    )) {
      return 'green'
    }
  }

  return (
    <div className={`suboption-container ${isRedSuboption ? configuredSuboptionObjects.some(obj => obj.assetId === asset.id && obj.suboptionId === suboption.id) ? 'orangered' : 'red' : ''} ${isConfiguredSuboption(asset.id, suboption.id)}`} ref={divRef}>
      <div onContextMenu={handleSuboptionContextMenu} onClick={handleSuboptionClick}>
        {suboption.name}
        {isConfigured && (
          <span>
            {(() => {
              const foundSuboption = configuredSuboptionObjects.find(obj => obj.suboptionId === suboption.id);
              if (foundSuboption) {
                const associatedAsset = assets.find(obj => obj.id === foundSuboption.assetId);
                return associatedAsset ? ` (${associatedAsset.name})` : '';
              }
              return '';
            })()}
          </span>
        )}
      </div>
      <div className="feature-types-container">
        {/* ${isRedSuboption ? configuredSuboptionFeatureObjects.some(obj => obj.assetId === asset.id && obj.optionId === option.id && obj.suboptionId === suboption.id && featuresByType.includes(obj.featureId)) ? 'orangered' : 'red' : ''} ${isConfiguredSuboption(asset.id, suboption.id)}`} ref={divRef} */}
        {types.map((type) => (
          featuresByType[type.id] && featuresByType[type.id].length > 0 && (
            <div key={type.id} className={`feature-type-container ${isRedSuboptionFeatureType(suboption.id, type.id) ? configuredSuboptionObjects.some(obj => obj.assetId === asset.id && obj.suboptionId === suboption.id) ? 'orangered' : 'red' : ''} ${isConfiguredSuboptionFeatureType(asset.id, suboption.id, type.id)}`} ref={divRef}>
              <div  onClick={handleSuboptionClick} onContextMenu={(event) => handleSuboptionFeatureTypeContextMenu(event, type.id)}>{type.name}</div>
              <div className="features-container">
                {featuresByType[type.id].map((feature) => (
                  <div
                    key={feature.id}
                    className={`feature-container ${
                      isRedSuboptionFeature(suboption.id, feature.id) ? configuredSuboptionFeatureObjects.some(obj => obj.assetId === asset.id && obj.optionId === option.id && obj.suboptionId === suboption.id && obj.featureId === feature.id) ? 'orangered' : 'red' : ''
                    } ${
                      isConfiguredSuboptionFeature(asset.id, suboption.id, feature.id)
                    }`}
                    onContextMenu={(event) => handleSuboptionFeatureContextMenu(event, feature.id)}
                    onClick={() => handleSuboptionFeatureClick(asset.id, option.id, suboption.id, feature.id)}
                  >
                    <div>{feature.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
      {option.pathwayIds.length === 0 && suboption.exclusivePathwayIds && (
        <div className="suboption-pathways-container">
          {pathways
            .filter(pathway => suboption.exclusivePathwayIds.includes(pathway.id))
            .map(pathway => (
              <div
                key={pathway.id}
                className={`pathway-container ${redPathwayIds.includes(pathway.id) ? configuredPathwayObjects.some(obj => obj.assetId === asset.id && obj.pathwayId === pathway.id) ? 'orangered' : 'red' : ''} ${isConfiguredPathway(asset.id, pathway.id)}`}
                onContextMenu={(event) => handlePathwayContextMenu(event, pathway.id)}
                onClick={() => handlePathwayClick(asset.id, pathway.id, suboption)}
              >
                <div>{pathway?.name}</div>
              </div>
            ))}
        </div>
      )}
      {option.pathwayIds.length === 0 && suboption.exclusivePathwayIds.length === 0 && (
        <div className="suboption-pathways-container">
          <div className={`pathway-container`}>
            <div>_</div>
          </div>
        </div>
      )}
    </div>
  );
};

SuboptionContainer.propTypes = {
  asset: PropTypes.object.isRequired,
  assets: PropTypes.array.isRequired,
  option: PropTypes.object.isRequired,
  suboption: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    supportedFeatureIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    exclusivePathwayIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  pathways: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  modelFeatures: PropTypes.arrayOf(PropTypes.object).isRequired,
  types: PropTypes.array.isRequired,
  primaryCapability: PropTypes.object.isRequired,
  onSuboptionContextMenu: PropTypes.func.isRequired,
  onSuboptionFeatureTypeContextMenu: PropTypes.func.isRequired,
  onSuboptionFeatureContextMenu: PropTypes.func.isRequired,
  onPathwayContextMenu: PropTypes.func.isRequired,
  isRedSuboption: PropTypes.bool.isRequired,
  redSuboptionFeatureTypeObjects: PropTypes.arrayOf(
    PropTypes.shape({
      suboptionId: PropTypes.number.isRequired,
      typeId: PropTypes.number.isRequired,
    })
  ).isRequired,
  redSuboptionFeatureObjects: PropTypes.arrayOf(
    PropTypes.shape({
      suboptionId: PropTypes.number.isRequired,
      featureId: PropTypes.number.isRequired,
    })
  ).isRequired,
  redPathwayIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSuboptionClick: PropTypes.func.isRequired,
  onSuboptionFeatureClick: PropTypes.func.isRequired,
  configuredSuboptionObjects: PropTypes.array.isRequired,
  configuredSuboptionFeatureObjects: PropTypes.array.isRequired,
  configuredPathwayObjects: PropTypes.array.isRequired,
  handlePathwayClick: PropTypes.func.isRequired,
  isConfiguredPathway: PropTypes.func.isRequired,
};

export default SuboptionContainer;
