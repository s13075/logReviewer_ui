import axios from 'axios';
import baseUrl from '../../config'

export const login = (email,password) => 
axios.post(`http://localhost:8080/api/v1/login`,{
    email,
    password
});

export const register = (user) => 
axios.post(`http://localhost:8080/api/v1/register`,{
    user
});

