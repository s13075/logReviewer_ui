
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from './layout/Layout';
import Login from './user/Login';
import Register from './user/Register';
import ReviewedApplicationContainer from './reviewedApplication/ReviewedApplicationContainer';
import ReviewedApplicationChangesContainer from './reviewedApplicationChanges/ReviewedApplicationChangesContainer';
import UserManagementContainer from './userManagement/UserManagementContainer';
import JustificationContainer from './justification/JustificationContainer';
import { SnackbarProvider } from 'notistack';
import Auth from './Auth';
import { getUserTokenSelector } from '../module/user/userSelector';
import { useSelector } from 'react-redux';
import axios from 'axios';

function App() {
  const token = useSelector(getUserTokenSelector);
  
  axios.interceptors.request.use(
    config => {
      //const token = window.localStorage.getItem('logreviewer-token');
      if(token !=null){
        config.headers.Authorization = token;
      }
      return config;
    },
    error => {
      return Promise.reject(error)
    }
  )

  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Layout>
          <Routes>
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route element={<Auth token={token} />}>
              <Route exact path='/review' element={<ReviewedApplicationContainer />} />
              <Route exact path='/reviewChanges' element={<ReviewedApplicationChangesContainer />} />
              <Route exact path='/userManagement' element={<UserManagementContainer />} />
              <Route exact path='/justification' element={<JustificationContainer />} />
            </Route>
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </Layout>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
