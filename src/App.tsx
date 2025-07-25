import Layout from "./layouts/index.tsx";
import AppRouter from "./routes/AppRouter.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthProvider} from "./context/AuthContext.tsx";
import {useLocation} from "react-router-dom";



function App() {
    const location = useLocation();
    const isAuthPage = location.pathname === '/auth';

  return (
        <AuthProvider>
            {isAuthPage ? (
                <AppRouter />
            ) : (
                <Layout>
                    <AppRouter />
                </Layout>
            )}
            <ToastContainer position="top-right" autoClose={3000} />
        </AuthProvider>
  )
}

export default App
