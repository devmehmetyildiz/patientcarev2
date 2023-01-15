import { useContext, useEffect } from 'react';
import { Navigate, Outlet, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';


const PrivateRoute = () => {
    console.log("geldim")
    const context = useContext(AuthContext);
    return context.token ? <Outlet /> : <Navigate to='/Login' replace />;
}

export default PrivateRoute


