
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
import { SnackbarProvider } from 'notistack';
import Auth from './Auth';
import { getUserTokenSelector } from '../module/user/userSelector';
import { useSelector } from 'react-redux';

function App() {
  const token = useSelector(getUserTokenSelector);

  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Layout>
          <Routes>
            <Route exact path='/login' element={<Login />} />
            <Route element={<Auth token={token} />}>
              <Route exact path='/' element={<ReviewedApplicationContainer />} />
            </Route>
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </Layout>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
