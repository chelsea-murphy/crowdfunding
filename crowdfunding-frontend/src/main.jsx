import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from './components/layout'
import HomePage from './pages/HomePage'
import FundraiserPage from './pages/FundraiserPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'


const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{path: "/", element: <HomePage /> },
      {path: "/fundraiser", element: <FundraiserPage /> },
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
