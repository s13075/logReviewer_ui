import axios from 'axios';


export const login = (email,password) => axios.post(`http://localhost:8080/api/v1/login`, { email, password });

export const registerUserService = (user) => axios.post(`http://localhost:8080/api/v1/register`, user);

export const listUsersService = () => axios.get(`http://localhost:8080/api/v1/user`);

export const selectUserService = (emploeeId) => axios.get(`http://localhost:8080/api/v1/user/${emploeeId}`);

export const updateUserService = (emploeeId, user) => axios.put(`http://localhost:8080/api/v1/user/${emploeeId}`, user);



export const getReviewedApplicationService = () => axios.get(`http://localhost:8080/api/v1/applications`);

export const getReviewedApplicationByNameService = (applicationName) => axios.get(`http://localhost:8080/api/v1/applications/${applicationName}`);

