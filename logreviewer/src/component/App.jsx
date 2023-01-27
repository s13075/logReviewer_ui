
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from './layout/Layout';
import Login from './user/Login';
import ReviewedApplicationContainer from './reviewedApplication/ReviewedApplicationContainer';
import ReviewedApplicationChangesContainer from './reviewedApplicationChanges/ReviewedApplicationChangesContainer';
import UserManagementContainer from './userManagement/UserManagementContainer';
import JustificationContainer from './justification/JustificationContainer';
import { SnackbarProvider } from 'notistack';
import { getUserTokenSelector, getUserRolesSelector } from '../module/user/userSelector';
import { useSelector } from 'react-redux';
import RoutesProtector from './aurhorization/RoutesProtector';


function App() {
  const userRoles = useSelector(getUserRolesSelector);
  const token = useSelector(getUserTokenSelector);

 // token={token} userRoles={userRoles}
  return (
    <SnackbarProvider maxSnack={3}>
        <Router>
          <Layout>
            <Routes>
              <Route exact path='/login' element={<Login />} />
              <Route element={<RoutesProtector token={token} userRoles={userRoles} />}>
                <Route exact path='/review' element={<ReviewedApplicationContainer />} />
                <Route exact path='/reviewChanges' element={<ReviewedApplicationChangesContainer />} />
                <Route exact path='/userManagement' element={<UserManagementContainer />} />
                <Route exact path='/justification' element={<JustificationContainer />} />
                <Route path="*" element={<p>There's nothing here: 404!</p>} />
              </Route>
            </Routes>
          </Layout>
        </Router>
    </SnackbarProvider>
  );
}

export default App;
