import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import FundraiserPage from './pages/FundraiserPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import './components/Layout.css'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import AccountPage from './pages/AccountPage.jsx'
import PledgePage from './pages/PledgePage.jsx'
import NavBar from "./components/NavBar.jsx";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {path: "/", element: <HomePage /> },
      {path: "/login", element: <LoginPage /> },
      {path: "/register", element: <RegisterPage /> },
      {path: "/account", element: <AccountPage /> },
      {path: "/fundraiser/:id", element: <FundraiserPage /> },
      {path: "/fundraiser/:id/pledge", element: <PledgePage /> },
      {path: "/aboutpage", element: <AboutPage /> },
      {path: "/contactpage", element: <ContactPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={myRouter} />
  </StrictMode>,
)