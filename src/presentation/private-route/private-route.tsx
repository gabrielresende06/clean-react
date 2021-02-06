import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  return <Route {...props} component={() => <Redirect to='/login' />}/>
}

export default PrivateRoute
