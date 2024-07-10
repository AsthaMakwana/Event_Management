import React from 'react'
import Home from "../pages/home/Home"
import Login from "../pages/authentication/Login"
import Signup from "../pages/authentication/Signup"
import Event from "../pages/event/Event"
import Addevent from "../pages/event/Addevent"
import Category from "../pages/category/Category"
import Addcategory from "../pages/category/Addcategory"
import Sponser from "../pages/sponser/Sponser"
import Addsponser from "../pages/sponser/Addsponser"
import Kyc from "../pages/kyc/Kyc"
import Calendar from "../pages/calendar/Calendar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "../pages/profile/Profile"
import Eventstate from "../context/Eventstate"
import SingleEvent from '../pages/singleevent/SingleEvent'
import Setting from '../pages/setting/Setting'
import Alert from '../components/alert/Alert'
import './organiser.css'

const Organiser = () => {
    return (
        <>
            {/* <Router> */}
                {/* <Eventstate> */}
                    {/* <Alert /> */}
                    <Routes>
                        <Route path="/">
                            <Route index element={<Home />} />
                            <Route path="calendar" element={<Calendar />} />
                            <Route path="kyc" element={<Kyc />} />
                            {/* <Route path="notification" element={<Notification/>}/> */}
                            <Route path="profile" element={<Profile />} />
                            <Route path="login" element={<Login />} />
                            <Route path="signup" element={<Signup />} />
                            <Route path='setting' element={<Setting />} />
                        </Route>
                        <Route path="event">
                            <Route index element={<Event />} />
                            <Route path="addevent" element={<Addevent />} />
                            <Route path='eventdetail' element={<SingleEvent />} />
                            <Route path="category"  >
                                <Route index element={<Category />} />
                                <Route path="addcategory" element={<Addcategory />} />
                            </Route>
                            <Route path="sponser" >
                                <Route index element={<Sponser />} />
                                <Route path="addsponser" element={<Addsponser />} />
                            </Route>
                        </Route>
                    </Routes>
                {/* </Eventstate>
            </Router> */}
        </>
    )
}

export default Organiser
