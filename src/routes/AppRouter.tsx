import {Route, Routes} from "react-router-dom";
import {Dashboard, Settings, Users, Materials} from "../pages";
import LoginPage from "../pages/Login.tsx";
import PrivateRoute from "../components/PrivateRoute.tsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/auth" element={<LoginPage />} />

            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/materials"
                element={
                    <PrivateRoute>
                        <Materials />
                    </PrivateRoute>
                }
            />
            <Route
                path="/users"
                element={
                    <PrivateRoute>
                        <Users />
                    </PrivateRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <PrivateRoute>
                        <Settings />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}
