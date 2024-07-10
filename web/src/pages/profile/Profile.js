import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { Home } from 'lucide-react'
import profile from '../../context/Eventcontext'
import './profile.css'
import jwtDecode from 'jwt-decode'
import HeaderTop from '../../components/top section/HeaderTop'

const Profile = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [arrow, setarrow] = useState(false)
  const [arrowE, setarrowE] = useState(false)
  const [dropdown, setdropdown] = useState(false)

  const handleArrowClick = () => {
    setarrow((prevArrow) => !prevArrow);
  };
  const handleArrowEClick = () => {
    setarrowE((prevArrow) => !prevArrow);
  };
  const handleDropdown = () => {
    console.log('hello')
    setdropdown((prevShowMenu) => !prevShowMenu);
  }
  const handleSidebarBtnClick = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const context = useContext(profile)
  const { getuser } = context
  const [user, setUser] = useState()
  useEffect(() => {
    const fetchuserdata = async () => {
      try {
        const userdata = await getuser();
        const usertoken = localStorage.getItem('organisertoken')
        const userid = jwtDecode(usertoken)
        const currentUser = userdata.find(element => element._id === userid.user.id);
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchuserdata()
  }, [])
  console.log(user)
  return (
    <>
      <div className="offcanvas__overlay"></div>
      <div className="offcanvas__overlay-white"></div>
      <div className="page__full-wrapper">
        <Navbar handleArrowClick={handleArrowClick} showMenu={showMenu} arrow={arrow} arrowE={arrowE} handleArrowEClick={handleArrowEClick} />
        <div className='page__body-wrapper'>
          <Header handleSidebarBtnClick={handleSidebarBtnClick} handleDropdown={handleDropdown} dropdown={dropdown} showMenu={showMenu} />
          <div className="app__slide-wrapper">
            <HeaderTop text={'Profile'} style={'invisible'}/>
            <div className='d-flex main p-4 shadow-lg'>
              <div className='container profile__left'>
                <div className='img mb-5 p-4'>
                  {user && user.image ? <img src={user.image}  className='img-fluid w-75' alt='img not found'/> : <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'className='img-fluid h-50 w-50 ' />}
                  <p className='imgp'>
                    <Link to="/organiser/setting"><img className="edit" src="https://i.ibb.co/vB163TR/edit.png" style={{ height: 20 + 'px', width: 20 + 'px' }} /></Link>
                  </p>
                </div>
                <div className='container'>
                  {user && (<><h5>Firstname : {user.fname ? user.fname : "please update your profile"}</h5>
                    <hr />
                    <h5>Lastname : {user.lname ? user.lname : "please update your profile"}</h5>
                    <hr />
                    <h5>Email Address : {user.email ? user.email : "please update your profile"}</h5>
                    <hr />
                    <h5>Phone Number : {user.contactno ? user.contactno : "please update your profile"}</h5>
                    <hr />
                    <h5>Gender : {user.gender ? user.gender : "please update your profile"}</h5>
                    <hr /></>)}
                </div>
              </div>
              <div className='container p-3'>
                <div className='mb-5 mt-5'>
                  <h4>About me </h4>
                </div>
                <div className='info'>
                  {user && user.detail ? user.detail : "please update your profile"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
