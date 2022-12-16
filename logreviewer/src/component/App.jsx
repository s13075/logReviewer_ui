
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

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path='/login' element ={<Login/>}/>           
          <Route exact path='/' element ={<ReviewedApplicationContainer/>}/>
        </Routes>
      </Layout>
    </Router>

  );
}

export default App;
