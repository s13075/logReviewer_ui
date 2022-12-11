import axios from 'axios';

export const getReviewedApplicationService = () => 
    axios.get(`http://localhost:8080/api/v1/applications`);

export const getReviewedApplicationByNameService = (applicationName) => axios.get(`http://localhost:8080/api/v1/applications/${applicationName}`);


