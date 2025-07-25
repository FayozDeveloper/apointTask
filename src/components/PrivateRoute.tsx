import {Navigate} from "react-router-dom";
import type {ReactNode} from "react";
import {useAuth} from "../context/AuthContext.tsx";

type PrivateRouteProps = {
    children: ReactNode
}

export default function PrivateRoute({children}: PrivateRouteProps){
    const {isAuthorized, loading} = useAuth();
    if (loading) return <div>Loading...</div>
    return isAuthorized ? children : <Navigate to={'/auth'} replace/>
}