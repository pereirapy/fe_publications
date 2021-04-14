import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Home from "../pages/Home/Home";
import PublicRoute from '../utils/publicRoute'

const Routes = () => (
  <BrowserRouter>
    <PublicRoute exact path="/" component={Home} />
  </BrowserRouter>
)

export default Routes
