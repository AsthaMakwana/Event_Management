import React from 'react'
import { Routes,BrowserRouter as Router, Route } from 'react-router-dom'
import EventDetail from './event detail/EventDetail'
import Profile from './profile/Profile'
import Home from './home/Home'
import Eventstate from '../context/Eventstate'
const User = () => {
  return (
    <>
    {/* <Router>
      <Eventstate> */}
        <Routes>
            <Route path='/'>
                <Route index element={<Home/>}/>
                <Route path='profile' element={<Profile/>}/>
                <Route path='eventdetail/:eventId' element={<EventDetail/>}/>
            </Route>
        </Routes>
      {/* </Eventstate>
    </Router> */}
    </>
  )
}

export default User
