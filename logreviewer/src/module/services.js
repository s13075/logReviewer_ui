import axios from 'axios';

//USER
export const login = (email,password) => axios.post(`http://localhost:8080/api/v1/login`, { email, password });

export const registerUserService = (user) => axios.post(`http://localhost:8080/api/v1/register`, user);

export const listUsersService = () => axios.get(`http://localhost:8080/api/v1/user`);

export const selectUserService = (emploeeId) => axios.get(`http://localhost:8080/api/v1/user/${emploeeId}`);

export const updateUserService = (emploeeId, user) => axios.put(`http://localhost:8080/api/v1/user/${emploeeId}`, user);

//APPLICATION
export const getReviewedApplicationService = () => axios.get(`http://localhost:8080/api/v1/applications`);

export const getReviewedApplicationByNameService = (applicationName) => axios.get(`http://localhost:8080/api/v1/applications/${applicationName}`);

//PERMISSION CHANGE
export const getAllPermissionsChangeService = () => axios.get(`http://localhost:8080/api/v1/permissionsChange`);

export const getApplicationPermissionsChangeService = (applicationId) => axios.get(`http://localhost:8080/api/v1/applications/${applicationId}/permissionsChange`);

//PERMISSION REQUEST
export const getAllPermissionsRequestService = () => axios.get(`http://localhost:8080/api/v1/permissionsRequest`);

export const getApplicationPermissionsRequestService = (applicationId) => axios.get(`http://localhost:8080/api/v1/applications/${applicationId}/permissionsRequest`);

//RECONCILE WITH REQUEST
export const postReconciliationRequestedService = (body) =>  axios.post(`http://localhost:8080/api/v1/reconciliation/requested`, body);

//RECONCILE WITHOUT REQUEST-JUSTIFICATION
export const postReconciliationJustifiedService = (body) =>  axios.post(`http://localhost:8080/api/v1/reconciliation/justified`, body);

//GET JUSTIFICATION LIST
export const getJustificationListService = () => axios.get(`http://localhost:8080/api/v1/justification`);

//GET JUSTIFICATION PERMISSION CHANGE LIST
export const getJustificationPermissionsChangeListService = (justificationId) => axios.get(`http://localhost:8080/api/v1/justification/${justificationId}/permissionChanges`);

//PUT JUSTIFICATION UPDATE
export const putJustificationService = (justificationId,body) => axios.put(`http://localhost:8080/api/v1/justification/${justificationId}`, body);



