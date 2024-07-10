import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React from 'react'
import User from "./User/User";
import Organiser from "./event organiser/Organiser";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import Alert from "./components/alert/Alert";
import HomeM from "./pages/home/Home";
import Home from "./User/home/Home";
import Profile from "./User/profile/Profile";
import ProfileM from "./pages/profile/Profile"
import EventDetail from "./User/event detail/EventDetail";
import Calendar from "./pages/calendar/Calendar";
import Kyc from "./pages/kyc/Kyc";
import Setting from "./pages/setting/Setting";
import Event from "./pages/event/Event";
import Addevent from "./pages/event/Addevent";
import SingleEvent from "./pages/singleevent/SingleEvent";
import Category from "./pages/category/Category";
import Addcategory from "./pages/category/Addcategory";
import Sponser from "./pages/sponser/Sponser";
import Addsponser from "./pages/sponser/Addsponser";
import Eventstate from "./context/Eventstate";
function App() {
  return (
    <>
      <Router>
        <Eventstate>
          <Alert />
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="eventdetail/:eventId" element={<EventDetail />} />
            </Route>
            <Route path="organiser">
              <Route index element={<HomeM />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="kyc" element={<Kyc />} />
              <Route path="profilem" element={<ProfileM />} />
              <Route path="setting" element={<Setting />} />
              <Route path="event">
                <Route index element={<Event />}/>
                <Route path="addevent" element={<Addevent />} />
                <Route path="eventdetailm" element={<SingleEvent />} />
                <Route path="category">
                  <Route index element={<Category />}/>
                  <Route path="addcategory" element={<Addcategory />} />
                </Route>
                <Route path="sponser">
                  <Route index element={<Sponser />}/>
                  <Route path="addsponser" element={<Addsponser />} />
                </Route>
              </Route>
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </Eventstate>
      </Router>
      {/* <Router>
        <Eventstate>
        <Alert />
          <Routes>
            <Route path="/">
              <Route index element={<User />} />
              <Route path="organiser" element={<Organiser />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Routes>
        </Eventstate>
      </Router> */}
      {/* <User/>
      <Organiser/> */}
    </>
  );
}

export default App;