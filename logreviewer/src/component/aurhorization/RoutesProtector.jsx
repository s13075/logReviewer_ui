import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { logoutAction } from '../../module/user/userAction';

import axios from 'axios';


const RoutesProtector = ({ children , userRoles, token}) => {
    const redirectPath = '/login'
    axios.interceptors.request.use(
      config => {
        //const token = window.localStorage.getItem('logreviewer-token');
        if (token != null) {
          config.headers.Authorization = token;
        }
        return config;
      },
      error => {
        return Promise.reject(error)
      }
    )
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

        return userRoles.some(role => rolePermissions[role].includes(route));
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

export default RoutesProtector;
