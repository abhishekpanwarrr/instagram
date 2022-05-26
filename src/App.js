import React,{lazy, Suspense} from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import * as ROUTES from './constants/routes'
import useAuthListner from './hooks/use-auth-listner'
import UserContext from './context/user'
import {ProtectedRouets,UerLoggedInProtectedRouets} from './hooks/protected.routes'
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Profile = lazy(() => import('./pages/Profile'))

const App = () => {
  const {user} = useAuthListner()
  return (
    <UserContext.Provider value={{user}}>
      <BrowserRouter>
        <Suspense fallback={<div className='w-screen h-screen flex items-center justify-center text-center z-10 bg-gray-base bg-opacity-10'>Loading....</div>}>
            <Routes>
                <Route element={<UerLoggedInProtectedRouets />}>
                  <Route path={ROUTES.LOGIN} element={<Login />} />
                  <Route path={ROUTES.SIGN_UP} element={<Signup />} />
                </Route>
                <Route element={<ProtectedRouets />}>
                  <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                  <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
                </Route>
                <Route path={ROUTES.PROFILE} element={<Profile />} />
            </Routes>
        </Suspense>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App