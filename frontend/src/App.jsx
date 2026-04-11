import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/AppShell.jsx';
import FactoryMapPage from './pages/FactoryMapPage.jsx';
import StorageAdminPage from './pages/StorageAdminPage.jsx';

const App = () => (
  <AppShell>
    <Routes>
      <Route path="/" element={<Navigate to="/maps/main" replace />} />
      <Route path="/maps/:pageId" element={<FactoryMapPage />} />
      <Route path="/admin/storage" element={<StorageAdminPage />} />
    </Routes>
  </AppShell>
);

export default App;
