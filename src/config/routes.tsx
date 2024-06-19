import { Home as UserHome } from '@/modules/core';
import { Home as AdminHome } from '@/modules/admin';
import { Login, Register, ProtectedRoute } from '@/modules/auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PUBLICAS */}
        <Route path="/" element={<Login />} />
        <Route
          path="*"
          element={
            <div>
              <h1>404</h1>
              <p>Página no encontrada</p>
            </div>
          }
        />
        <Route path="/register" element={<Register />} />
        {/* RUTAS DEL ADMINISTRADOR */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin" redirectTo="/admin">
              <AdminHome />
            </ProtectedRoute>
          }
        />
        {/* RUTAS DEL USUARIO */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user" redirectTo="/">
              <UserHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
