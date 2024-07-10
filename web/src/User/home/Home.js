import React, { useContext, useEffect, useState } from 'react'
import Header from '../header/Header'
import '../style/style.css'
import '../style/responsive.css'
import '../style/animate.css'
import './home.css'
import Footer from '../footer/Footer'
import Allcard from '../categorycards/Allcard'
import Firewallcard from '../categorycards/Firewallcard'
import eventdata from '../../context/Eventcontext'
const Home = () => {
    const [timer, setTimer] = useState({ day: 0, hour: 0, minute: 0, second: 0 });
    const context = useContext(eventdata);
    const { userfetchevent } = context;

    useEffect(() => {
        const eventdata = async () => {
            const data = await userfetchevent();
            const currentDate = new Date();
            console.log(data)
            const latestEvent = data.reduce((latest, event) => {
                const eventDate = new Date(event.eventStDate);

                if (!isNaN(eventDate)) {
                    if (
                        eventDate.getFullYear() === currentDate.getFullYear() &&
                        eventDate.getMonth() === currentDate.getMonth() &&
                        eventDate.getDate() === currentDate.getDate()
                    ) {
                        return latest; 
                    }

                    if (!latest || eventDate > latest) {
                        return eventDate; 
                    }
                }

                return latest;
            }, null);

            const timeDiff = new Date(latestEvent) - new Date();
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            setTimer({ day: days, hour: hours, minute: minutes, second: seconds });
        };

        const timerInterval = setInterval(eventdata, 1000);
        eventdata();
        return () => {
            clearInterval(timerInterval);
        };

    }, []);
    // console.log(timer)
    return (
        <>
            <Header logo={'https://demo.egenslab.com/html/eventlab/assets/images/logo.png'} linkColor={'black'} />
            <div className="main-slider-wrapper gray-300">
                <div className="hero-area">
                    <div className="hero-shape">
                        <img src="https://demo.egenslab.com/html/eventlab/assets/images/shapes/hero-shape.png" alt="img" />
                    </div>
                    <div className="container">
                        <div className="swiper-container hero-slider overflow-hidden">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <div className="row align-items-center">
                                        <div className="col-lg-6">
                                            <div className="slide-content">
                                                {/* <h5><i className="bi bi-calendar2-week"></i> January 21, 2021</h5> */}
                                                <h2>Welcome to
                                                    <span> EventLab</span>
                                                </h2>
                                                <ul className="featured-event">
                                                    {/* <li><i className="bi bi-diagram-3"></i> <span>500</span> Seat</li>
                                                    <li><i className="bi bi-geo"></i> 1356 Broadway, New York</li> */}
                                                    <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, sint nostrum! Pariatur cum rerum earum rem sequi ullam deserunt nostrum voluptate, quis odio debitis provident aliquam harum architecto expedita, aut repudiandae assumenda quaerat voluptates. Nisi dolorem deserunt laudantium accusamus sed eveniet! Possimus a debitis sit nulla et alias quisquam dolorem.</h6>
                                                </ul>
                                                {/* <div className="slider-btns">
                                                    <a href="/eventdetail" className="primary-btn-fill">Book Now</a>
                                                    <a href="/eventdetail" className="primary-btn-outline">View Details</a>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="col-lg-6 text-center">
                                            <div className="slide-figure  position-relative d-lg-flex justify-content-center">
                                                <img src="https://demo.egenslab.com/html/eventlab/assets/images/hero/hero-figure1.png" alt="img" className="img-fluid" />
                                                <div className="animated-shape">
                                                    <img src="https://demo.egenslab.com/html/eventlab/assets/images/shapes/hero-animi.png" alt="img" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-searchbar-area">
                    <div className="container">
                        <form className="searchbar-wrapper" action="#">
                            <div className="row">
                                <div className="col-lg-10">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="searchbar-input-group">
                                                <input type="text" name='eventlocationsearch' placeholder="Event Location....." id="search-location" />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="searchbar-input-group">
                                                <input type="date" id="datepicker" name='eventdatesearch' placeholder="Date" />
                                                {/* <i className="bi bi-calendar2-week"></i> */}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="searchbar-input-group">
                                                <div className="custom-select filter-options">
                                                    <select style={{ borderRadius: '100px', border: '1px solid #ce1446', display: 'block', height: '50px' }} name='eventctgsearch' >
                                                        <option selected disabled hidden>Select category</option>
                                                        <option value="1">Fire Wall</option>
                                                        <option value="1">Sport</option>
                                                        <option value="2">Web Development</option>
                                                        <option value="3">Marketing</option>
                                                        <option value="3">Technology</option>
                                                        <option value="3">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="search-submit">
                                        <input type="submit" value="Search Now" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="event-area gray-300">
                <div className="container position-relative pt-110">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-head">
                                <h5>Event</h5>
                                <h3>Popular Event</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="event-category-buttons d-flex justify-content-center">
                                <ul className="nav nav-pills mb-3" id="events-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="pills-tab1" data-bs-toggle="pill" data-bs-target="#pills-event1" type="button" role="tab" aria-controls="pills-event1" aria-selected="true">All <span>10</span></button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-tab2" data-bs-toggle="pill"
                                            data-bs-target="#pills-event2" type="button" role="tab" aria-controls="pills-event2"
                                            aria-selected="false" >Fire Wall <span>10</span></button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-tab3" data-bs-toggle="pill"
                                            data-bs-target="#pills-event3" type="button" role="tab" aria-controls="pills-event3"
                                            aria-selected="false" >Sport <span>10</span></button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-tab4" data-bs-toggle="pill"
                                            data-bs-target="#pills-event4" type="button" role="tab" aria-controls="pills-event4"
                                            aria-selected="false" >Web Development <span>10</span></button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-tab5" data-bs-toggle="pill"
                                            data-bs-target="#pills-event5" type="button" role="tab" aria-controls="pills-event5"
                                            aria-selected="false" >Marketing <span>10</span></button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-tab6" data-bs-toggle="pill"
                                            data-bs-target="#pills-event6" type="button" role="tab" aria-controls="pills-event6"
                                            aria-selected="false" >Technology<span>10</span></button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="all-event-cards">
                                <div className="tab-content" id="events-tabContent">
                                    <div className="tab-pane fade show active" id="pills-event1" role="tabpanel"
                                        aria-labelledby="pills-tab1">
                                        <Allcard />
                                    </div>
                                    <div className="tab-pane fade show" id="pills-event2" role="tabpanel"
                                        aria-labelledby="pills-tab2">
                                        <Firewallcard selectedctgname="firewall" />
                                    </div>
                                    <div className="tab-pane fade show" id="pills-event3" role="tabpanel"
                                        aria-labelledby="pills-tab3">
                                        <Firewallcard selectedctgname="sport" />
                                    </div>
                                    <div className="tab-pane fade show" id="pills-event4" role="tabpanel"
                                        aria-labelledby="pills-tab4">
                                        <Firewallcard selectedctgname="webdevelopment" />
                                    </div>
                                    <div className="tab-pane fade show" id="pills-event5" role="tabpanel"
                                        aria-labelledby="pills-tab5">
                                        <Firewallcard selectedctgname="marketing" />
                                    </div>
                                    <div className="tab-pane fade show" id="pills-event6" role="tabpanel"
                                        aria-labelledby="pills-tab6">
                                        <Firewallcard selectedctgname="technology" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="event-countdown-outer pt-120 gray-300">
                <div className="event-countdown">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="event-countdown-head">
                                    <h2>Next Event</h2>
                                </div>
                            </div>
                        </div>
                        {timer && timer ? <div className="row" id="timer">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="countdown-box">
                                    <div className="countdown-line-shape d-lg-block d-none">
                                        <img src="https://demo.egenslab.com/html/eventlab/assets/images/shapes/countdown-vactor.png" alt="img" />
                                    </div>
                                    <h3 id="days">{timer && timer.day}</h3>
                                    <h5>Days</h5>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="countdown-box">
                                    <div className="countdown-line-shape d-lg-block d-none">
                                        <img src="https://demo.egenslab.com/html/eventlab/assets/images/shapes/countdown-vactor.png" alt="img" />
                                    </div>
                                    <h3 id="hours">{timer && timer.hour}</h3>
                                    <h5>Hour</h5>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="countdown-box">
                                    <div className="countdown-line-shape d-lg-block d-none">
                                        <img src="https://demo.egenslab.com/html/eventlab/assets/images/shapes/countdown-vactor.png" alt="img" />
                                    </div>
                                    <h3 id="miniutes">{timer && timer.minute}</h3>
                                    <h5>Miniute</h5>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="countdown-box">
                                    <h3 id="seconds">{timer && timer.second}</h3>
                                    <h5>Secoend</h5>
                                </div>
                            </div>
                        </div> :
                            <div>Next Event Added Soon..</div>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home
