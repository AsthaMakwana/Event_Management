import React, { useState, useEffect, useContext } from 'react'
import "./home.css"
import Table from '../../components/Table/Table'
import Navbar from '../../components/navbar/Navbar'
import Widget from "../../components/widget/Widget"
import ProgressBar from "../../components/progress bar sold/ProgressBar"
import Chart from "../../components/charts/Chart"
import { useNavigate } from "react-router-dom";
import Header from '../../components/header/Header'
import { Users, CalendarHeart, Ticket, CircleDollarSign } from 'lucide-react'
import userdata from '../../context/Eventcontext'
import HeaderTop from '../../components/top section/HeaderTop'
const HomeM = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [arrow, setarrow] = useState(false)
  const [arrowE, setarrowE] = useState(false)

  let navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('organisertoken')) {
      navigate('/login')
    }
  }, [navigate])
  const handleArrowClick = () => {
    setarrow((prevArrow) => !prevArrow);
  };
  const handleArrowEClick = () => {
    setarrowE((prevArrow) => !prevArrow);
  };

  const handleSidebarBtnClick = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const context = useContext(userdata)
  const { getuser, getevent } = context
  const [countuser, setCountUser] = useState(0)
  const [totalevent, setTotalEvent] = useState(0)
  const [totalticket, setTotalTicket] = useState(0)
  const [soldticket, setSoldticket] = useState(0)
  const [unsoldticket, setUnsoldticket] = useState(0)
  const [countryuser, setCountryUser] = useState({ india: '', uk: '', usa: '', australia: '', italy: '' })
  useEffect(() => {
    const fetchuserdata = async () => {
      try {
        const userdata = await getuser();
        const data = userdata.map((user) => {
          let usercounter = 0
          if (user.role === 'user') {
            usercounter += 1
            setCountUser(usercounter);
            if (user.country === 'India(+91)') {
              setCountryUser({ ...countryuser, india: (countryuser.india || 0) + 1 })
            } else if (user.country === 'UK(+44)') {
              setCountryUser({ ...countryuser, uk: (countryuser.uk || 0) + 1 })
            } else if (user.country === 'USA(+1)') {
              setCountryUser({ ...countryuser, usa: (countryuser.usa || 0) + 1 })
            } else if (user.country === 'Australia(+61)') {
              setCountryUser({ ...countryuser, uk: (countryuser.australia || 0) + 1 })
            } else if (user.country === 'Italy(+39)') {
              setCountryUser({ ...countryuser, italy: (countryuser.italy) + 1 })
            }
          }

        })
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };
    fetchuserdata()
    const fetcheventdata = async () => {
      try {
        const eventdata = await getevent();
        const eventcount = eventdata && eventdata.length
        setTotalEvent(eventcount)
        let sum = 0
        let totalsoldticket = 0
        let totalunsoldticket = 0
        const unsoldticketevent = []
        const ticketdata = eventdata.map((event) => {
          sum = sum + Number(event.noOfTicket)
          setTotalTicket(sum)
          totalsoldticket = totalsoldticket + Number(event.soldTicket)
          setSoldticket(totalsoldticket)
          if (new Date(event.eventEndDate) < new Date) {
            unsoldticketevent.push(event)
          }
        })
        unsoldticketevent && unsoldticketevent.map((e) => {
          totalunsoldticket = totalunsoldticket + (Number(e.noOfTicket) - Number(e.soldTicket))
          setUnsoldticket(totalunsoldticket)
        })
      } catch (error) {
        console.error("Error fetching event count:", error);
      }
    }
    fetcheventdata()
  }, [])

  return (
    <>
      <div className="offcanvas__overlay"></div>
      <div className="offcanvas__overlay-white"></div>
      <div className="page__full-wrapper">
        <Navbar handleArrowClick={handleArrowClick} showMenu={showMenu} arrow={arrow} arrowE={arrowE} handleArrowEClick={handleArrowEClick} />
        <div className='page__body-wrapper'>
          <Header handleSidebarBtnClick={handleSidebarBtnClick} showMenu={showMenu} />
          <div className="app__slide-wrapper">
            <HeaderTop text={'Dashboard'} style={'invisible'} />
            <div className="row g-20 widget">
              <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-6 widget_first">
                <Widget icon={<Users absoluteStrokeWidth size={35} />} widgetname={'Total Registration'} count={countuser && countuser} />
              </div>
              <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-6 widget_second">
                <Widget icon={<CalendarHeart absoluteStrokeWidth size={35} />} widgetname={'Total Event'} count={totalevent && totalevent} />
              </div>
              <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-6 widget_third">
                <Widget icon={<Ticket absoluteStrokeWidth size={35} />} widgetname={'Total Ticket'} count={totalticket && totalticket} />
              </div>
              <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-6 widget_fourth">
                <Widget icon={<Ticket absoluteStrokeWidth size={35} />} widgetname={'Total Ticket Sold'} count={soldticket && soldticket} />
              </div>
              <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-6 widget_fourth">
                <Widget icon={<Ticket absoluteStrokeWidth size={35} />} widgetname={'After Event Total Unsold Ticket'} count={unsoldticket && unsoldticket} />
              </div>
              <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-6 widget_fourth">
                <Widget icon={<CircleDollarSign absoluteStrokeWidth size={35} />} widgetname={'Total Revenue'} count={0} />
              </div>
            </div>
            <div class="row g-20 chartprogress">
              <div class="col-xl-8">
                <Chart count={countryuser} />
              </div>
              <div class="col-xl-4 col-xxl-4 col-lg-12 col-md-12">
                <ProgressBar title={'Review'} />
              </div>

              {/* <div class="col-xxl-3 col-xl-6 col-lg-6 col-md-6">
                <ProgressBar lefname={'Total Ticket'} title={'No Of Tickets After Event Expired'} leftcount={500} rightname={'Unsold Ticket'} rightcount={300}/>
              </div> */}

            </div>
            <div className="row">
              <div className="col-xxl-12">
               <Table/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeM 