import React from 'react'
import UpcomingEvent from './UpcomingEvent'
import LastSixMonthEvent from './LastSixMonthEvent'

const UserDashboard = () => {

  return (
    <>
      <div className="dashboard-tab-content pt-5">
        <div className="container shadow p-5">
          <div className="upcomingEvent">
            <h5 className="ed-subtitle">Upcoming Event</h5>
            <div className="row mt-4">
              <UpcomingEvent/>
            </div>
          </div>
          <div className="lastSixMonthEvent my-5">
            <h5 className="ed-subtitle">Last Six Month Event</h5>
            <div className="row mt-4">
              <LastSixMonthEvent/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDashboard
