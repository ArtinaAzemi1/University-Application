import logo from './logo.svg';
//import './App.css';
import './index.js'
import routes from "./routes.js";
import routesP from "./routesP.js";
import routesSt from "./routesSt.js";
import Dashboard from "./views/Dashboard.js";
import TableList from "./views/Tables.js";
import UserPage from "./views/User.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import React from 'react';
import ReactDOM from 'react-dom';
//import Login from "./Login.js";
import ViewStudent from "views/ViewStudent.js";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import "bootstrap/dist/css/bootstrap.css";
////import "assets/scss/paper-dashboard.scss?v=1.3.0";
//import './assets/scss/paper-dashboard.scss?v=1.3.0';
//import "assets/demo/demo.css";
////import "assets/demo/demo.css";
////import "assets/css/paper-dashboard.css?v=1.3.0";
//import "perfect-scrollbar/css/perfect-scrollbar.css";
////import './assets/scss/react/_navbar.scss';
import Login from './auth/Login.js'; 
import SidebarSt from "./components/Sidebar/SidebarSt.js";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="main-content">
          <Routes>
          <Route layout="/login" exact component={Login} />
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  element={prop.component}
                  key={key}
                />
              );
            })}
            {routesP.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  element={prop.component}
                  key={key}
                />
              );
            })}
            {routesSt.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  element={prop.component}
                  key={key}
                />
              );
            })}
            <Route path="/viewStudent" component={ViewStudent} />
            <Route path="/" element={<Navigate to="/admin/dashboard" />} /> 
            <Route path="/" element={<Navigate to="/professor/dashboardProfessor" />} /> 
            <Route path="/" element={<Navigate to="/student/dashboardStudent" />} /> 
            <Route path="/" element={<Navigate to="/auth/login" />} /> {/* Ndryshoni sipas rrugës tuaj të parë */}
            <Navigate from="/" to="/login" />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
