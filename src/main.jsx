import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Route/Router.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
      
  </React.StrictMode>,


 
)