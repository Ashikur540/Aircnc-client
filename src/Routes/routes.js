import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../Layout/DashboardLayout'
import Main from '../Layout/Main'
import AddHome from '../Pages/AddHome'
import AllHome from '../Pages/AllHome'
import Checkout from '../Pages/Checkout'
import AllBookings from '../Pages/Dashboard/AllBookings'
import AllUsers from '../Pages/Dashboard/AllUsers'
import BecomeAHost from '../Pages/Dashboard/BecomeAHost'
import ManageHomes from '../Pages/Dashboard/ManageHomes'
import MyBookings from '../Pages/Dashboard/MyBookings'
import Welcome from '../Pages/Dashboard/Welcome'
import Details from '../Pages/Details'
import Home from '../Pages/Home'
import Login from '../Pages/Login/Login'
import Signup from '../Pages/Login/Signup'
import SearchResult from '../Pages/SearchResult'
import ComingSoon from '../Pages/Shared/ComingSoon'
import ErrorPage from '../Pages/Shared/ErrorPage'
import AdminRoute from './AdminRoutes'
import HostRoute from './HostRoutes'
import PrivateRoute from './PrivateRoute'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/coming-soon',
        element: <ComingSoon />,
      },
      {
        path: '/all-homes',
        element: <AllHome />,
      },
      {
        path: '/service-details/:id',
        element: <Details />,
        loader: async ({ params }) => {
          return fetch(`${process.env.REACT_APP_HOST_API_URL}/homes/${params.id}`)
        },
      },
      {
        path: '/search-result',
        element: <SearchResult />,
      },
      {
        path: '/checkout',
        element: <PrivateRoute><Checkout /></PrivateRoute>
      },

    ],

  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: '',
        element: <Welcome />,

      },
      {
        path: 'my-bookings',
        element: <PrivateRoute><MyBookings /></PrivateRoute>,

      },
      {
        path: 'become-host',
        element: <PrivateRoute><BecomeAHost /></PrivateRoute>,

      },
      {
        path: 'all-users',
        element: <AdminRoute><AllUsers /></AdminRoute>,

      },
      {
        path: 'all-bookings',
        element: <AdminRoute><AllBookings /></AdminRoute>,

      },
      {
        path: 'add-home',
        element: <HostRoute><AddHome /></HostRoute>,

      },
      {
        path: 'manage-homes',
        element: <HostRoute><ManageHomes /></HostRoute>,

      },
    ]
  },
])

export default router
