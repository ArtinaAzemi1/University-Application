import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

//import "bootstrap/dist/css/bootstrap.css";
////import "./assets/css/paper-dashboard.css?v=1.3.0";
//import './assets/scss/paper-dashboard.scss?v=1.3.0';
//import "./assets/demo/demo.css";
//import "./assets/css/paper-dashboard.css.map?v=1.3.0";
//import "./assets/css/paper-dashboard.min.css?v=1.3.0";
////import "./assets/demo/demo.css";
//import "perfect-scrollbar/css/perfect-scrollbar.css";

import "bootstrap/dist/css/bootstrap.css";
import "assets/css/paper-dashboard.css?v=1.3.0";
//import "assets/css/paper-dashboard.css.map?v=1.3.0";
//import "assets/css/paper-dashboard.min.css?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "./assets/css/paper-dashboard.css";
import "./assets/scss/paper-dashboard.scss";
import "./assets/css/paper-dashboard.min.css";
import "./assets/css/paper-dashboard.css.map";

import AdminLayout from "layouts/Admin.js";
import ProfessorLayout from "layouts/Professor.js";
import StudentLayout from "layouts/Student.js";
import LoginLayout from "layouts/Login.js";
import RegisterLayout from "layouts/Register.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/professor/*" element={<ProfessorLayout />} />
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/student/*" element={<StudentLayout />} />
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/login/*" element={<LoginLayout />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/register/*" element={<RegisterLayout />} />
      <Route path="/" element={<Navigate to="/register" replace />} />
    </Routes>
  </BrowserRouter>
);

/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

//import "bootstrap/dist/css/bootstrap.css";
//import "assets/scss/paper-dashboard.scss?v=1.3.0";
//import "assets/demo/demo.css";
//import "perfect-scrollbar/css/perfect-scrollbar.css";

