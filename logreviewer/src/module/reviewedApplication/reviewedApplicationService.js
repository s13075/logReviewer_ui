import axios from 'axios';

const getReviewedApplicationService = () => axios.get(`http://localhost:8080/api/v1/applications`);

export default getReviewedApplicationService;