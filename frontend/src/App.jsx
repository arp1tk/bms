import React from 'react'
import {useRoutes} from "react-router-dom"
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Register from './pages/signup';
const App = () => {

  const routeArray = [
    {
       path:"*",
       element:<Login/>
  },
   {
       path:"/dashboard",
       element:<Dashboard/>
  },
  {
       path:"/signup",
       element:<Register/>
  }
]
const routesElement = useRoutes(routeArray);
  return (
    <div>{routesElement}</div>
  )
}

export default App