import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'font-awesome/css/font-awesome.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { HubConnectionBuilder } from '@microsoft/signalr';
import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import Login from './routes/identity/Login';
import Register from './routes/identity/Register';
import Privacy from './routes/Privacy';
import Courses from './routes/courses/Courses';
import Home from './routes/Home';
import Info from './routes/identity/Info';
import StudyGroups from './routes/studyGroups/StudyGroups';
import SelectedCourseView from './routes/courses/SelectedCourseView';
import { IdentityService } from './services/IdentityService';
import SignalRService from './services/SignalRService';
import SignalRComponent from './routes/Chats/SignalRComponent';
//import signalRService from './signalRService';
//import SignalRTest from './SignalRTest'

const router = createBrowserRouter([
  {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
          {
              path: "/",
              element: <Home />,
          },
          {
              path: "info/",
              element: <Info />,
          },
          {
              path: "login/",
              element: <Login />,
          },
          {
              path: "register/",
              element: <Register />,
          },
          {
              path: "privacy/:id",
              element: <Privacy />,
          },
          {
            path: "courses/",
            element: <Courses />,
            children: [
              {
              path: "selectedCourseView/",
              element: <SelectedCourseView />,
            },
          ]
          },
          {
            path: "studyGroups/",
            element: <StudyGroups />,
          },
          {
            path: "myhub/",
            element: <SignalRComponent />,
          },
          
      ]
  },


]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

