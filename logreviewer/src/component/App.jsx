
import React from 'react';
import axios from 'axios';
import baseUrl from '../config'
import '../App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from './layout/Layout';
import ReviewedApplicationContainer from './reviewedApplication/ReviewedApplicationContainer';

function App() {
  
  axios(`${baseUrl}/api/v1/applications`).then(apps => {
    console.log(apps)
  })

  return (
    <Layout>
      <ReviewedApplicationContainer/>
    </Layout>

  );
}

export default App;
