import { Home as UserHome } from '@/modules/core';
import { Home as AdminHome } from '@/modules/admin';
import { NotFound } from '@/components/NotFound';
import { Login, ProtectedRoute } from '@/modules/auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from '@/modules/auth/hooks/useAuth';

const PublicRoutes = () => {
  return (
    <Routes>
      {/* RUTAS PUBLICAS */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
};
const UserRoutes = () => {
  return (
    <Routes>
      {/* RUTAS DEL USUARIO */}
      <Route
        path="/"
        element={
          <ProtectedRoute role="user" redirectTo="/">
            <UserHome />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
const AdminRoutes = () => {
  return (
    <Routes>
      {/* RUTAS DEL ADMINISTRADOR */}
      <Route
        path="/"
        element={
          <ProtectedRoute role="admin" redirectTo="/admin">
            <AdminHome />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <BrowserRouter>
      {isAuthenticated && user.role === 'admin' ? (
        <AdminRoutes />
      ) : isAuthenticated && user.role === 'user' ? (
        <UserRoutes />
      ) : (
        <PublicRoutes />
      )}
    </BrowserRouter>
  );
};
