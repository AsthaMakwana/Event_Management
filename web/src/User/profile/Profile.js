import React, { useState,useContext,useEffect } from 'react'
import '../style/style.css'
import '../style/responsive.css'
import '../style/animate.css'
import Header from '../header/Header'
import Hero from '../header-hero/Hero'
import Footer from '../footer/Footer'
import './profile.css'
import { Link } from 'react-router-dom'
import ProfileInfo from './ProfileInfo'
import UpdateProfile from './UpdateProfile'
import UserPurchased from './UserPurchased'
import UserDashboard from './UserDashboard'


const Profile = () => {

  return (
    <>
      <Header logo={'https://demo.egenslab.com/html/eventlab/assets/images/logo-v2.png'} />
      <Hero name={'Profile'} />
      {localStorage.getItem('usertoken') ? <div className="event-details-wrapper ">
        <div className="container pt-5 position-relative">
          <div className="ed-main-wrap">
            <div className="ed-tabs-wrapper">
              <div className="tabs-pill">
                <ul className="nav nav-pills justify-content-center" id="pills-tab2" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-details-tab" data-bs-toggle="pill"
                      data-bs-target="#pills-details" type="button" role="tab"
                      aria-controls="pills-details" aria-selected="true"> <i
                        className="bi bi-info-circle"></i> <span>Details</span></button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-edit-tab" data-bs-toggle="pill"
                      data-bs-target="#pills-edit" type="button" role="tab"
                      aria-controls="pills-edit" aria-selected="true"> <i className="bi bi-pencil-square"></i> <span>Edit</span></button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-purchased-tab" data-bs-toggle="pill"
                      data-bs-target="#pills-purchased" type="button" role="tab"
                      aria-controls="pills-purchased" aria-selected="true"> <i className="bi bi-bag"></i> <span>Purchased</span></button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-dashboard-tab" data-bs-toggle="pill"
                      data-bs-target="#pills-dashboard" type="button" role="tab"
                      aria-controls="pills-dashboard" aria-selected="true"> <i className="bi bi-bar-chart-line"></i> <span>Dashboard</span></button>
                  </li>
                </ul>
              </div>
              <div className="tab-content" id="pills-tabContent2">
                <div className="tab-pane fade show active" id="pills-details" role="tabpanel"
                  aria-labelledby="pills-details-tab">
                  <ProfileInfo/>
                </div>
                <div className="tab-pane fade" id="pills-edit" role="tabpanel"
                  aria-labelledby="pills-edit-tab">
                  <UpdateProfile/>
                </div>
                <div className="tab-pane fade" id="pills-purchased" role="tabpanel"
                  aria-labelledby="pills-purchased-tab">
                  <UserPurchased/>
                </div>
                <div className="tab-pane fade" id="pills-dashboard" role="tabpanel"
                  aria-labelledby="pills-dashboard-tab">
                  <UserDashboard/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> :
        <div className='text-center m-5'>
          <Link to="/login" className='nav-btn'><button className='primary-btn-fill'>Please Login/Register</button></Link>
        </div>
        }
      <Footer />
    </>
  )
}

export default Profile
