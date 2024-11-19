import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Nav from './global/Nav.jsx';
import Lost from './pages/Lost';
import ConfigurationManager from './pages/configuration-manager/ConfigurationManager.jsx';
import CapabilityManager from './pages/CapabilityManager.jsx';
import TypeManager from './pages/TypeManager.jsx';
import FeatureManager from './pages/FeatureManager';
import ModelManager from './pages/ModelManager.jsx';
import PathwayManager from './pages/PathwayManager';
import SuboptionManager from './pages/SuboptionManager.jsx';
import OptionManager from './pages/OptionManager';
import AssetManager from './pages/asset-manager/AssetManager.jsx';

const App = () => {

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/configuration" replace />} />
        <Route path="/configuration" element={<ConfigurationManager />} />
        <Route path="/lost" element={<Lost />} />
        <Route path="/capability" element={<CapabilityManager />} />
        <Route path="/type" element={<TypeManager />} />
        <Route path="/feature" element={<FeatureManager />} />
        <Route path="/model" element={<ModelManager />} />
        <Route path="/pathway" element={<PathwayManager />} />
        <Route path="/suboption" element={<SuboptionManager />} />
        <Route path="/option" element={<OptionManager />} />
        <Route path="/asset" element={<AssetManager />} />
        <Route path="*" element={<Navigate to="/lost" replace />} />
      </Routes>
    </div>
  );
}

export default App;
