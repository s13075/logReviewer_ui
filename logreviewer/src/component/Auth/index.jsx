import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';


const Auth = ({
    token,
    redirectPath = '/login',
    children
}) => {
        if(!token){
            return <Navigate to={redirectPath} replace />;
        }
        return children ? children : <Outlet />;
    };

export default Auth;
