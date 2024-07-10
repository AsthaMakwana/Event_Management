import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import EventDetail from '../../context/Eventcontext'
import './singleevent.css'
import HeaderTop from '../../components/top section/HeaderTop';

function SingleEvent() {
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

    const context = useContext(EventDetail)
    const { getevent, getuser, getcategory, getsponser } = context
    const [event, setEvent] = useState()
    const [user, setUser] = useState()
    const [category, setCategory] = useState()
    const [sponser,setSponser] = useState()
    const eventid = localStorage.getItem('eventdetail')
    useEffect(() => {
        const fetcheventdata = async () => {
            const eventdata = await getevent();
            const matchedEvent = eventdata.find((eve) => eve._id === eventid);
            if (matchedEvent) {
                setEvent(matchedEvent);
            }
        };
        fetcheventdata()
    }, [eventid])
    useEffect(() => {
        if (event) {
            const fetchuserdata = async () => {
                const userdata = await getuser();
                const matchedUser = userdata.find((userid) => userid._id === event.user);
                if (matchedUser) {
                    setUser(matchedUser);
                }
            }
            fetchuserdata()
        }
    }, [event])
    useEffect(()=>{
        if(event){
            const fetchcategory = async()=>{
                const categorydata = await getcategory()
                const matchedCategory = categorydata.find((categoryid)=>categoryid._id ===  event.category)
                if(matchedCategory){
                    setCategory(matchedCategory)
                }
            }
            fetchcategory()
        }
    },[event])
    useEffect(()=>{
        if(event){
            const fetchsponser = async()=>{
                const sponserdata = await getsponser()
                const matchedSponser = sponserdata.find((sponserid)=>sponserid._id ===  event.sponser)
                if(matchedSponser){
                    setSponser(matchedSponser)
                }
            }
            fetchsponser()
        }
    },[event])
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        
        return `${day}-${month}-${year}`;
    }

    const totalUnsoldTicket = event && event.noOfTicket - event.soldTicket
    return (
        <>
            <div className="offcanvas__overlay"></div>
            <div className="offcanvas__overlay-white"></div>
            <div className="page__full-wrapper">
                <Navbar handleArrowClick={handleArrowClick} showMenu={showMenu} arrow={arrow} arrowE={arrowE} handleArrowEClick={handleArrowEClick} />
                <div className='page__body-wrapper'>
                    <Header handleSidebarBtnClick={handleSidebarBtnClick} handleDropdown={handleDropdown} dropdown={dropdown} showMenu={showMenu} />
                    <div className="app__slide-wrapper">
                        <HeaderTop text={'Event Details'} style={'invisible'}/>
                        <div className='d-flex event_details_div justify-content-center'>
                            <div className='div_main container mx-5 my-5 shadow-lg'>
                                <div className="profile_information"><h2>About Event</h2><hr /></div>

                                <div className='d-flex'>
                                    <div>{user && user.image ? <img src={user.image} alt="" style={{ borderRadius: '100px', width: '70px', height: '70px' }} />: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" alt="imge not found" style={{ borderRadius: '100px', width: '70px', height: '70px' }} />}
                                    </div>
                                    <h4 className='d-flex justify-content-center align-items-center px-4'>{user && user.fname} {user && user.lname}</h4>
                                </div>

                                <div className='about container mt-5'>
                                    <h2>About</h2>
                                    <hr />
                                    <div className='p-1 about_img d-flex justify-content-center'>
                                        {event && event.image ? <img src={event.image} class="img-fluid" style={{borderRadius:'6px'}}/>: ''}
                                    </div>

                                    <div className="about_content py-4">
                                        <h3>About this event</h3>
                                        <br />
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus odit consequuntur nesciunt asperiores dignissimos sunt nam ab corrupti, sequi explicabo doloribus quasi quia facere, excepturi a neque quibusdam consequatur suscipit qui voluptate provident laudantium. Corrupti velit, voluptatum culpa unde quasi nostrum harum non earum esse?</p>
                                        <br />
                                    </div>

                                </div>

                            </div>

                            <div className="div_card container m-5 shadow-lg">
                                <h5>Name : {event && event.eventName}</h5>
                                <hr />
                                <h5>Start Date : {event && formatDate(event.eventStDate)}</h5>
                                <hr />
                                <h5>End Date : {event && formatDate(event.eventEndDate)}</h5>
                                <hr />
                                <h5>Total Ticket : {event && event.noOfTicket}</h5>
                                <hr />
                                <h5>Price : {event && event.totalPrice}</h5>
                                <hr />
                                <h5>Location : {event && event.eventLocation}</h5>
                                <hr />
                                <h5>Category : {category && category.categoryname}</h5>
                                <hr />
                                <h5>Sponser : {sponser && sponser.sponserName}</h5>
                                <hr />
                                <h5>Total Sold Ticket : {event && event.soldTicket}</h5>
                                <hr />
                                <h5>Total Unsold Ticket : {event && totalUnsoldTicket}</h5>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleEvent
