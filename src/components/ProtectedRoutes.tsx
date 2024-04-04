import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes() {
  const auth: { token: boolean } = { token: false };

  return auth.token ? <Outlet /> : <Navigate to='/login' />;
}

export { ProtectedRoutes };
