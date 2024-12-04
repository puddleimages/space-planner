import PropTypes from "prop-types";
import SuboptionContainer from "./SuboptionContainer";

const OptionContainer = ({ 
  asset,
  assets,
  option,
  options,
  suboptions,
  pathways,
  modelFeatures,
  types,
  capabilities,
  onOptionContextMenu,
  onSuboptionContextMenu,
  onSuboptionFeatureTypeContextMenu,
  onSuboptionFeatureContextMenu,
  onPathwayContextMenu,
  isRedOption,
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
  const handleOptionContextMenu = (event) => {
    event.preventDefault();
    onOptionContextMenu(option.id);
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

  const isRedPathway = (pathwayId) => {
    return redPathwayIds.includes(pathwayId);
  };

  const primaryCapability = capabilities.reduce((min, obj) => {
    return (obj.id < min.id) ? obj : min;
  }, capabilities[0]);

  const handlePathwayClick = (assetId, pathwayId) => {
    if (
      configuredSuboptionFeatureObjects.some(obj =>
        obj.assetId === assetId &&
        suboptions.some(suboption => {
          const option = options.find(option => option.id === obj.optionId);
          return suboption.id === obj.suboptionId &&
            (suboption.exclusivePathwayIds.includes(pathwayId) ||
            (!suboption.exclusivePathwayIds.includes(pathwayId) && option && option.pathwayIds.includes(pathwayId))
            );
        }) &&
        modelFeatures.find(feature => feature.id === obj.featureId).capabilityId === primaryCapability.id
      ) &&
      !configuredPathwayObjects.some(obj =>
        obj.assetId === assetId && obj.pathwayId !== pathwayId
      )
    ) {
      onPathwayClick({ assetId, pathwayId });
    }
  };

  const isConfiguredPathway = (assetId, pathwayId) => {
    if (configuredPathwayObjects.some(obj => obj.assetId === assetId && obj.pathwayId === pathwayId)) {
      return 'green'
    }
  }

  return (
    <div className={`option-container ${isRedOption ? '' : 'red'}`}>
      <div onContextMenu={handleOptionContextMenu}>
        {option.name}
      </div>
      <div className="suboptions-container">
        {suboptions
          .filter(suboption => option.suboptionIds.includes(suboption.id))
          .map(suboption => {
            return (
              <SuboptionContainer 
                key={suboption.id}
                asset={asset}
                assets={assets}
                option={option}
                suboption={suboption}
                pathways={pathways}
                modelFeatures={modelFeatures}
                types={types}
                primaryCapability={primaryCapability}
                onSuboptionContextMenu={handleSuboptionContextMenu}
                onSuboptionFeatureTypeContextMenu={handleSuboptionFeatureTypeContextMenu}
                onSuboptionFeatureContextMenu={handleSuboptionFeatureContextMenu}
                onPathwayContextMenu={handlePathwayContextMenu}
                isRedSuboption={redSuboptionIds.includes(suboption.id)}
                redSuboptionFeatureTypeObjects={redSuboptionFeatureTypeObjects}
                redSuboptionFeatureObjects={redSuboptionFeatureObjects}
                redPathwayIds={redPathwayIds}
                onSuboptionClick={onSuboptionClick}
                onSuboptionFeatureClick={onSuboptionFeatureClick}
                onPathwayClick={onPathwayClick}
                configuredSuboptionObjects={configuredSuboptionObjects}
                configuredSuboptionFeatureObjects={configuredSuboptionFeatureObjects}
                configuredPathwayObjects={configuredPathwayObjects}
                handlePathwayClick={handlePathwayClick}
                isConfiguredPathway={isConfiguredPathway}
              />
            );
          })}
      </div>
      {option.pathwayIds.length > 0 && (
        <div className="pathways-container">
          {pathways
            .filter(pathway => option.pathwayIds.includes(pathway.id))
            .map(pathway => {
              return (
                <div 
                  className={`pathway-container ${isRedPathway(pathway.id) ? configuredPathwayObjects.some(obj => obj.assetId === asset.id && obj.pathwayId === pathway.id) ? 'orangered' : 'red' : ''} ${isConfiguredPathway(asset.id, pathway.id) ? 'green' : ''}`}
                  key={pathway.id} 
                  onContextMenu={() => handlePathwayContextMenu(pathway.id)}
                  onClick={() => handlePathwayClick(asset.id, pathway.id)}
                  >
                  <div>{pathway?.name}</div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

OptionContainer.propTypes = {
  asset: PropTypes.object.isRequired,
  assets: PropTypes.array.isRequired,
  option: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    pathwayIds: PropTypes.arrayOf(PropTypes.number),
    suboptionIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  options: PropTypes.array.isRequired,
  suboptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      supportedFeatureIds: PropTypes.arrayOf(PropTypes.number).isRequired,
      exclusivePathwayIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ).isRequired,
  pathways: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  modelFeatures: PropTypes.arrayOf(PropTypes.object).isRequired,
  types: PropTypes.array.isRequired,
  capabilities: PropTypes.array.isRequired,
  onOptionContextMenu: PropTypes.func.isRequired,
  onSuboptionContextMenu: PropTypes.func.isRequired,
  onSuboptionFeatureTypeContextMenu: PropTypes.func.isRequired,
  onSuboptionFeatureContextMenu: PropTypes.func.isRequired,
  onPathwayContextMenu: PropTypes.func.isRequired,
  isRedOption: PropTypes.bool.isRequired,
  redSuboptionIds: PropTypes.arrayOf(PropTypes.number).isRequired,
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
  onPathwayClick: PropTypes.func.isRequired,
  configuredSuboptionObjects: PropTypes.array.isRequired,
  configuredSuboptionFeatureObjects: PropTypes.array.isRequired,
  configuredPathwayObjects: PropTypes.array.isRequired,
};

export default OptionContainer;
