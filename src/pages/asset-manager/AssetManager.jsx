import { useState, useEffect } from "react";
import AssetForm from "./subcomponents/AssetForm";
import AssetList from "./subcomponents/AssetList";
import { generateUniqueId } from "../utils/functions";

const AssetManager = () => {
  const [assets, setAssets] = useState(null);
  const [models, setModels] = useState([]);
  const [suboptions, setSuboptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const storedAssets = JSON.parse(localStorage.getItem('assets')) || [];
      const storedModels = JSON.parse(localStorage.getItem('models')) || [];
      const storedSuboptions = JSON.parse(localStorage.getItem('suboptions')) || [];
      const storedOptions = JSON.parse(localStorage.getItem('options')) || [];

      setAssets(storedAssets);
      setModels(storedModels);
      setSuboptions(storedSuboptions);
      setOptions(storedOptions);

      setIsLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (assets) {
      localStorage.setItem('assets', JSON.stringify(assets));
    }
  }, [assets]);

  const handleAddAsset = (newAsset) => {
    newAsset.id = generateUniqueId(assets);
    setAssets([...assets, newAsset]);
  };

  const handleRemoveAsset = (index) => {
    const newAssets = assets.filter((_, i) => i !== index);
    setAssets(newAssets);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Asset Manager</h1>
      <AssetForm models={models} suboptions={suboptions} options={options} onAddAsset={handleAddAsset} />
      <AssetList assets={assets} options={options} models={models} onRemoveAsset={handleRemoveAsset} />
    </div>
  );
};

export default AssetManager;
