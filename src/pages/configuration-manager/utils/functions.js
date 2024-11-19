
export const exportData = (data) => {
  const dataStr = JSON.stringify(data);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(dataBlob);
  downloadLink.download = 'data.json';
  downloadLink.click();
};

export const importData = (event, setters) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setters.setCapabilities(data.capabilities || []);
        setters.setTypes(data.types || []);
        setters.setFeatures(data.features || []);
        setters.setModels(data.models || []);
        setters.setPathways(data.pathways || []);
        setters.setSuboptions(data.suboptions || []);
        setters.setOptions(data.options || []);
        setters.setAssets(data.assets || []);
        setters.setRedAssetIds(data.redAssetIds || []);
        setters.setRedOptionIds(data.redOptionIds || []);
        setters.setRedSuboptionIds(data.redSuboptionIds || []);
        setters.setRedSuboptionFeatureTypeObjects(data.redSuboptionFeatureTypeObjects || []);
        setters.setRedSuboptionFeatureObjects(data.redSuboptionFeatureObjects || []);
        setters.setRedPathwayIds(data.redPathwayIds || []);
        setters.setConfiguredSuboptionObjects(data.configuredSuboptionObjects || []);
        setters.setConfiguredSuboptionFeatureObjects(data.configuredSuboptionFeatureObjects || []);
        setters.setConfiguredPathwayObjects(data.configuredPathwayObjects || []);
        // Save to local storage
        localStorage.setItem('capabilities', JSON.stringify(data.capabilities || []));
        localStorage.setItem('types', JSON.stringify(data.types || []));
        localStorage.setItem('features', JSON.stringify(data.features || []));
        localStorage.setItem('models', JSON.stringify(data.models || []));
        localStorage.setItem('pathways', JSON.stringify(data.pathways || []));
        localStorage.setItem('suboptions', JSON.stringify(data.suboptions || []));
        localStorage.setItem('options', JSON.stringify(data.options || []));
        localStorage.setItem('assets', JSON.stringify(data.assets || []));
        localStorage.setItem('redAssetIds', JSON.stringify(data.redAssetIds || []));
        localStorage.setItem('redOptionIds', JSON.stringify(data.redOptionIds || []));
        localStorage.setItem('redSuboptionIds', JSON.stringify(data.redSuboptionIds || []));
        localStorage.setItem('redSuboptionFeatureTypeObjects', JSON.stringify(data.redSuboptionFeatureTypeObjects || []));
        localStorage.setItem('redSuboptionFeatureObjects', JSON.stringify(data.redSuboptionFeatureObjects || []));
        localStorage.setItem('redPathwayIds', JSON.stringify(data.redPathwayIds || []));
        localStorage.setItem('setConfiguredSuboptionObjects', JSON.stringify(data.configuredSuboptionObjects || []));
        localStorage.setItem('setConfiguredSuboptionFeatureObjects', JSON.stringify(data.configuredSuboptionFeatureObjects || []));
        localStorage.setItem('setConfiguredPathwayObjects', JSON.stringify(data.configuredPathwayObjects || []));
      } catch (error) {
        console.error('Failed to import data:', error);
      }
    };
    reader.readAsText(file);
  }
};
