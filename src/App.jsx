import { Navigate, Route, Routes } from 'react-router-dom';
import { SimulationProvider } from './context/SimulationContext';
import LoginPage from './pages/LoginPage';
import RequesterPage from './pages/RequesterPage';
import BusPage from './pages/BusPage';
import DriverPage from './pages/DriverPage';
import ControlPage from './pages/ControlPage';

function App() {
  return (
    <SimulationProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/app" element={<RequesterPage />} />
        <Route path="/bus" element={<BusPage />} />
        <Route path="/driver" element={<DriverPage />} />
        <Route path="/control" element={<ControlPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SimulationProvider>
  );
}

export default App;
