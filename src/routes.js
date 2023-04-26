import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import TechnicalPage from './pages/TechnicalPage';
import CulturalPage from './pages/CulturalPage';
import RegistrationPage from './pages/RegistrationPage1';
import DashboardAppPage from './pages/DashboardAppPage';
import TechnicalParticipants from './pages/TechnicalParticipants';
import ExpoPage from './pages/ExpoPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'technical', element: <TechnicalPage /> },
        { path: 'cultural', element: <CulturalPage /> },
        { path: 'expo', element: <ExpoPage /> },
        { path: 'technical-participants/:id', element: <TechnicalParticipants /> },
        { path: 'register/:id', element: <RegistrationPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
