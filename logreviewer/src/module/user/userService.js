import axios from 'axios';
import baseUrl from '../../config'

export const login = (email,password) => 
axios.post(`http://localhost:8080/api/v1/login`,{
    email,
    password
});

