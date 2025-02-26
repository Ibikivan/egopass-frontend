import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Root from './pages/root/Root'
import Home from './pages/home/Home'
import PassDetails from './pages/pass_details/PassDetails'
import Profil from './pages/profil/Profil'
import EditProfil from './pages/profil/EditProfil'
import Login from './pages/authentication/Login'
import ForgottenPassword from './pages/authentication/ForgottenPassword'
import NotFound from './pages/not_found/NotFound'
import { useRef } from 'react'
import PageVideoTest from './pages/tests/PageVideoTest'

function App() {

  const footerRef = useRef(null)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root footerRef={footerRef} />,
      errorElement: <h1>Une erreur est survenue</h1>,
      children: [
        {
          path: '',
          element: <Home footerRef={footerRef} />
        },
        {
          path: ':id',
          element: <PassDetails />
        },
        {
          path: 'profil',
          element: <Profil />
        },
        {
          path: 'edit-profil',
          element: <EditProfil />
        },
        {
          path: '*',
          element: <NotFound />
        }
      ]
    },
    // {
    //   path: 'test',
    //   element: <PageVideoTest />
    // },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'forgot-password',
      element: <ForgottenPassword />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return <RouterProvider router={router} />
}

export default App
