import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Login = lazy(() => import('~/pages/login'))

const About = lazy(() => import('~/pages/about'))

export const routes = [
  { index: true, element: <Navigate to="/login" replace /> },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'about',
    element: <About />,
  },
]
