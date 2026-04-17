import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/Login/LoginPage';
import SolicitantePage from '../pages/Solicitante/SolicitantePage';
import MotoristaPage from '../pages/Motorista/MotoristaPage';
import CentralPage from '../pages/Central/CentralPage';
import ProtectedRoute from './ProtectedRoute';
import { ROLES } from '../utils/constants';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/solicitante"
        element={
          <ProtectedRoute allowedRoles={[ROLES.REQUESTER]}>
            <SolicitantePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/motorista"
        element={
          <ProtectedRoute allowedRoles={[ROLES.DRIVER]}>
            <MotoristaPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/central"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CONTROL]}>
            <CentralPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
