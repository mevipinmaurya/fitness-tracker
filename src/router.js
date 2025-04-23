import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Signin from "./pages/Signin";
import AuthProvider, { useAuth } from "./contexts/auth/AuthContext";
import { WorkoutProvider } from "./contexts/workout/WorkoutContext";
import SigninLayout from "./layouts/SigninLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Singup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Workout from "./pages/Workout";

function RouteWrapper({ layout: Layout, page: Page }) {
  return (
    <Layout>
      <Page />
    </Layout>
  );
}

function PrivateRoute({ layout: Layout, page: Page }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <Layout>
      <Page />
    </Layout>
  );
}

function router() {
  return (
    <Router>
      <AuthProvider>
        <WorkoutProvider>
          <Routes>
            <Route
              path="/sign-in"
              element={<RouteWrapper layout={SigninLayout} page={Signin} />}
            />
            <Route
              path="/sign-up"
              element={<RouteWrapper layout={SigninLayout} page={Singup} />}
            />
            <Route
              path="/"
              element={
                <PrivateRoute layout={DashboardLayout} page={Dashboard} />
              }
            />
            <Route
              path="/profile"
              element={<PrivateRoute layout={DashboardLayout} page={Profile} />}
            />
            <Route
              path="/workout"
              element={<PrivateRoute layout={DashboardLayout} page={Workout} />}
            />
          </Routes>
        </WorkoutProvider>
      </AuthProvider>
    </Router>
  );
}

export default router;
