import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useParams, useLocation } from 'react-router-dom';
import {logoutAction} from '../../module/user/userAction'


const Auth = ({ token, userRoles, redirectPath = '/login', children }) => {
    const dispatch = useDispatch();

    //przeglądanie ról i sprawdzanie czy którykolwiek z kluczy(ról) zawiera route
    const isAllowed = (userRoles, route) => {

        // definicja jaka rola ma dostęp do jakiej strony
        const rolePermissions = {
            ADMIN: ['/login','/userManagement'],
            REVIEWER: ['/login','/review', '/reviewChanges', '/justification'],
            REVIEWER_MANAGER: ['/login','/review', '/reviewChanges', '/justification'],
            REVIEWED_ISA: ['/login','/justification']
        };

        return userRoles.some(role => rolePermissions[role.roleName].includes(route));
    };
    
    //gdzie jest teraz user
    const location = useLocation();
    let userLocation = location.pathname;

    //sprawdzenie jezeli brak tokena albo rola usera nie pozwala na dostęp do strony to redirect
    if (!token || !isAllowed(userRoles, userLocation)) {

        //jeżeli nie ma uprawnien do tej lokalizacji zostaje wylogowany
        dispatch(logoutAction);
        
        //i przekierowany do strony logowania
        userLocation = redirectPath;
        return <Navigate to={redirectPath} replace />;

    }
    return children ? children : <Outlet />;

};

export default Auth;
