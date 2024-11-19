import { useState, useEffect } from "react";
import { exportData, importData } from "./utils/functions";
import AssetContainer from "./subcomponents/AssetContainer";
import './ConfigurationManager.css';

const ConfigurationManager = () => {
  const [capabilities, setCapabilities] = useState(null);
  const [types, setTypes] = useState(null);
  const [features, setFeatures] = useState(null);
  const [models, setModels] = useState(null);
  const [pathways, setPathways] = useState(null);
  const [suboptions, setSuboptions] = useState(null);
  const [options, setOptions] = useState(null);
  const [assets, setAssets] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [redAssetIds, setRedAssetIds] = useState(null);
  const [redOptionIds, setRedOptionIds] = useState(null);
  const [redSuboptionIds, setRedSuboptionIds] = useState(null);
  const [redSuboptionFeatureTypeObjects, setRedSuboptionFeatureTypeObjects] = useState(null);
  const [redSuboptionFeatureObjects, setRedSuboptionFeatureObjects] = useState(null);
  const [redPathwayIds, setRedPathwayIds] = useState(null);
  const [configuredSuboptionObjects, setConfiguredSuboptionObjects] = useState(null);
  const [configuredSuboptionFeatureObjects, setConfiguredSuboptionFeatureObjects] = useState(null);
  const [configuredPathwayObjects, setConfiguredPathwayObjects] = useState(null);

  useEffect(() => {
    const loadStoredData = () => {
      const storedCapabilities = JSON.parse(localStorage.getItem('capabilities')) || [];
      const storedTypes = JSON.parse(localStorage.getItem('types')) || [];
      const storedFeatures = JSON.parse(localStorage.getItem('features')) || [];
      const storedModels = JSON.parse(localStorage.getItem('models')) || [];
      const storedPathways = JSON.parse(localStorage.getItem('pathways')) || [];
      const storedSuboptions = JSON.parse(localStorage.getItem('suboptions')) || [];
      const storedOptions = JSON.parse(localStorage.getItem('options')) || [];
      const storedAssets = JSON.parse(localStorage.getItem('assets')) || [];
      const storedRedAssetIds = JSON.parse(localStorage.getItem('redAssetIds')) || [];
      const storedRedOptionIds = JSON.parse(localStorage.getItem('redOptionIds')) || [];
      const storedRedSuboptionIds = JSON.parse(localStorage.getItem('redSuboptionIds')) || [];
      const storedRedSuboptionFeatureTypeObjects = JSON.parse(localStorage.getItem('redSuboptionFeatureTypeObjects')) || [];
      const storedRedSuboptionFeatureObjects = JSON.parse(localStorage.getItem('redSuboptionFeatureObjects')) || [];
      const storedRedPathwayIds = JSON.parse(localStorage.getItem('redPathwayIds')) || [];
      const storedConfiguredSuboptionObjects = JSON.parse(localStorage.getItem('configuredSuboptionObjects')) || [];
      const storedConfiguredSuboptionFeatureObjects = JSON.parse(localStorage.getItem('configuredSuboptionFeatureObjects')) || [];
      const storedConfiguredPathwayObjects = JSON.parse(localStorage.getItem('configuredPathwayObjects')) || [];

      setCapabilities(storedCapabilities);
      setTypes(storedTypes);
      setFeatures(storedFeatures);
      setModels(storedModels);
      setPathways(storedPathways);
      setSuboptions(storedSuboptions);
      setOptions(storedOptions);
      setAssets(storedAssets);
      setRedAssetIds(storedRedAssetIds);
      setRedOptionIds(storedRedOptionIds);
      setRedSuboptionIds(storedRedSuboptionIds);
      setRedSuboptionFeatureTypeObjects(storedRedSuboptionFeatureTypeObjects);
      setRedSuboptionFeatureObjects(storedRedSuboptionFeatureObjects);
      setRedPathwayIds(storedRedPathwayIds);
      setConfiguredSuboptionObjects(storedConfiguredSuboptionObjects);
      setConfiguredSuboptionFeatureObjects(storedConfiguredSuboptionFeatureObjects);
      setConfiguredPathwayObjects(storedConfiguredPathwayObjects);
      setIsLoading(false);
    };

    loadStoredData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('redAssetIds', JSON.stringify(redAssetIds || []));
      localStorage.setItem('redOptionIds', JSON.stringify(redOptionIds || []));
      localStorage.setItem('redSuboptionIds', JSON.stringify(redSuboptionIds || []));
      localStorage.setItem('redSuboptionFeatureTypeObjects', JSON.stringify(redSuboptionFeatureTypeObjects || []));
      localStorage.setItem('redSuboptionFeatureObjects', JSON.stringify(redSuboptionFeatureObjects || []));
      localStorage.setItem('redPathwayIds', JSON.stringify(redPathwayIds || []));
      localStorage.setItem('configuredSuboptionObjects', JSON.stringify(configuredSuboptionObjects || []));
      localStorage.setItem('configuredSuboptionFeatureObjects', JSON.stringify(configuredSuboptionFeatureObjects || []));
      localStorage.setItem('configuredPathwayObjects', JSON.stringify(configuredPathwayObjects || []));
    }
  }, [
    redAssetIds,
    redOptionIds,
    redSuboptionIds,
    redSuboptionFeatureTypeObjects,
    redSuboptionFeatureObjects,
    redPathwayIds,
    configuredSuboptionObjects,
    configuredSuboptionFeatureObjects,
    configuredPathwayObjects,
    isLoading
  ]);

  const handleOptionContextMenu = (optionId) => {
    setRedOptionIds(prevOptionIds => {
      const isAlreadyRed = prevOptionIds.includes(optionId);
      if (isAlreadyRed) {
        return prevOptionIds.filter(option => option !== optionId);
      } else {
        return [...prevOptionIds, optionId];
      }
    });
  };

  const handleSuboptionContextMenu = (suboptionId) => {
    setRedSuboptionIds(prevSuboptionIds => {
      const isAlreadyRed = prevSuboptionIds.includes(suboptionId);
      if (isAlreadyRed) {
        return prevSuboptionIds.filter(suboption => suboption !== suboptionId);
      } else {
        return [...prevSuboptionIds, suboptionId];
      }
    });
  };

  const handleSuboptionFeatureContextMenu = (suboptionFeatureObject) => {
    setRedSuboptionFeatureObjects(prevSuboptionFeatureObjects => {
      const isAlreadyRed = prevSuboptionFeatureObjects.some(object =>
        object.suboptionId === suboptionFeatureObject.suboptionId &&
        object.featureId === suboptionFeatureObject.featureId
      );
  
      if (isAlreadyRed) {
        return prevSuboptionFeatureObjects.filter(object =>
          !(object.suboptionId === suboptionFeatureObject.suboptionId &&
          object.featureId === suboptionFeatureObject.featureId)
        );
      } else {
        return [...prevSuboptionFeatureObjects, suboptionFeatureObject];
      }
    });
  };

  const handleSuboptionFeatureTypeContextMenu = (suboptionFeatureTypeObject) => {
    setRedSuboptionFeatureTypeObjects(prevSuboptionFeatureTypeObjects => {
      const isAlreadyRed = prevSuboptionFeatureTypeObjects.some(object =>
        object.suboptionId === suboptionFeatureTypeObject.suboptionId &&
        object.featureId === suboptionFeatureTypeObject.featureId
      );
  
      if (isAlreadyRed) {
        return prevSuboptionFeatureTypeObjects.filter(object =>
          !(object.suboptionId === suboptionFeatureTypeObject.suboptionId &&
          object.featureId === suboptionFeatureTypeObject.featureId)
        );
      } else {
        return [...prevSuboptionFeatureTypeObjects, suboptionFeatureTypeObject];
      }
    });
  };

  const handlePathwayContextMenu = (pathwayId) => {
    setRedPathwayIds(prevPathwayIds => {
      const isAlreadyRed = prevPathwayIds.includes(pathwayId);
      if (isAlreadyRed) {
        return prevPathwayIds.filter(pathway => pathway !== pathwayId);
      } else {
        return [...prevPathwayIds, pathwayId];
      }
    });
  };

  const handleSuboptionClick = (suboptionObject) => {
    setConfiguredSuboptionObjects(prevsuboptionObjects => {
      const isAlreadyConfigured = prevsuboptionObjects.some(object =>
        object.assetId === suboptionObject.assetId &&
        object.suboptionId === suboptionObject.suboptionId
      );
  
      if (isAlreadyConfigured) {
        return prevsuboptionObjects.filter(object => !(
          object.assetId === suboptionObject.assetId &&
          object.suboptionId === suboptionObject.suboptionId)
        );
      } else {
        return [...prevsuboptionObjects, suboptionObject];
      }
    });
  }

  const handleSuboptionFeatureClick = (suboptionFeatureObject) => {
    setConfiguredSuboptionFeatureObjects(prevSuboptionFeatureObjects => {
      const isAlreadyConfigured = prevSuboptionFeatureObjects.some(object =>
        object.assetId === suboptionFeatureObject.assetId &&
        object.optionId === suboptionFeatureObject.optionId &&
        object.suboptionId === suboptionFeatureObject.suboptionId &&
        object.featureId === suboptionFeatureObject.featureId
      );
  
      if (isAlreadyConfigured) {
        return prevSuboptionFeatureObjects.filter(object => !(
          object.assetId === suboptionFeatureObject.assetId &&
          object.optionId === suboptionFeatureObject.optionId &&
          object.suboptionId === suboptionFeatureObject.suboptionId &&
          object.featureId === suboptionFeatureObject.featureId)
        );
      } else {
        return [...prevSuboptionFeatureObjects, suboptionFeatureObject];
      }
    });
  }

  const handlePathwayClick = (pathwayObject) => {
    setConfiguredPathwayObjects(prevPathwayObjects => {
      const isAlreadyConfigured = prevPathwayObjects.some(object =>
        object.assetId === pathwayObject.assetId &&
        object.pathwayId === pathwayObject.pathwayId
      );
  
      if (isAlreadyConfigured) {
        return prevPathwayObjects.filter(object => !(
          object.assetId === pathwayObject.assetId &&
          object.pathwayId === pathwayObject.pathwayId)
        );
      } else {
        return [...prevPathwayObjects, pathwayObject];
      }
    });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <input 
          type="file" 
          onChange={(e) => importData(e, {
            setCapabilities,
            setTypes,
            setFeatures,
            setModels,
            setPathways,
            setSuboptions,
            setOptions,
            setAssets,
            setRedAssetIds,
            setRedOptionIds,
            setRedSuboptionIds,
            setRedSuboptionFeatureTypeObjects,
            setRedSuboptionFeatureObjects,
            setRedPathwayIds,
            setConfiguredSuboptionObjects,
            setConfiguredSuboptionFeatureObjects,
            setConfiguredPathwayObjects,
          })} 
        />
        <button onClick={() => exportData({
          capabilities,
          types,
          features,
          models,
          pathways,
          suboptions,
          options,
          assets,
          redAssetIds,
          redOptionIds,
          redSuboptionIds,
          redSuboptionFeatureTypeObjects,
          redSuboptionFeatureObjects,
          redPathwayIds,
          configuredSuboptionObjects,
          configuredSuboptionFeatureObjects,
          configuredPathwayObjects,
        })}>
          Export Data
        </button>
      </div>
      <div className="configuration-container">
        {assets.map((asset) => (
          <AssetContainer 
            key={asset.id}
            asset={asset}
            assets={assets}
            options={options}
            setOptions={setOptions}
            suboptions={suboptions}
            pathways={pathways}
            models={models}
            features={features}
            types={types}
            capabilities={capabilities}
            redAssetIds={redAssetIds}
            setRedAssetIds={setRedAssetIds}
            onOptionContextMenu={handleOptionContextMenu}
            onSuboptionContextMenu={handleSuboptionContextMenu}
            onSuboptionFeatureTypeContextMenu={handleSuboptionFeatureTypeContextMenu}
            onSuboptionFeatureContextMenu={handleSuboptionFeatureContextMenu}
            onPathwayContextMenu={handlePathwayContextMenu}
            redOptionIds={redOptionIds}
            redSuboptionIds={redSuboptionIds}
            redSuboptionFeatureTypeObjects={redSuboptionFeatureTypeObjects}
            redSuboptionFeatureObjects={redSuboptionFeatureObjects}
            redPathwayIds={redPathwayIds}
            onSuboptionClick={handleSuboptionClick}
            onSuboptionFeatureClick={handleSuboptionFeatureClick}
            onPathwayClick={handlePathwayClick}
            configuredSuboptionObjects={configuredSuboptionObjects}
            configuredSuboptionFeatureObjects={configuredSuboptionFeatureObjects}
            configuredPathwayObjects={configuredPathwayObjects}
          />
        ))}
      </div>
    </div>
  );
};

export default ConfigurationManager;
