import React, { useContext, useEffect, useRef, useState } from 'react'
import '../style/style.css'
import '../style/responsive.css'
import '../style/animate.css'
import Header from '../header/Header'
import Hero from '../header-hero/Hero'
import Footer from '../footer/Footer'
import eventContext from '../../context/Eventcontext'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { showAlert } from '../../components/alert/Alert'
import { Link } from 'react-router-dom'

const EventDetail = () => {
    const context = useContext(eventContext)
    const { userfetchevent, userfetchcategory, userfetchsponser, getuser, purchaseEvents, afterBookEventUpdateEvent } = context
    const [event, setEvent] = useState()
    const [category, setCategory] = useState()
    const [sponser, setSponser] = useState()
    const [user, setUser] = useState()
    const [bookEvent, setBookEvent] = useState()
    const { eventId } = useParams()
    const ref = useRef(null)
    const refclose = useRef(null)
    useEffect(() => {
        const fetcheventdata = async () => {
            const eventdata = await userfetchevent();
            const matchedEvent = eventdata.find((eve) => eve._id === eventId);
            if (matchedEvent) {
                setEvent(matchedEvent);
            }
        };
        fetcheventdata()
    }, [eventId])
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
    useEffect(() => {
        if (event) {
            const fetchcategory = async () => {
                const categorydata = await userfetchcategory()
                const matchedCategory = categorydata.find((categoryid) => categoryid._id === event.category)
                if (matchedCategory) {
                    setCategory(matchedCategory)
                }
            }
            fetchcategory()
        }
    }, [event])
    useEffect(() => {
        if (event) {
            const fetchsponser = async () => {
                const sponserdata = await userfetchsponser()
                const matchedSponser = sponserdata.find((sponserid) => sponserid._id === event.sponser)
                if (matchedSponser) {
                    setSponser(matchedSponser)
                }
            }
            fetchsponser()
        }
    }, [event])

    const handlePurchaseEvent = (e) => {
        e.preventDefault()
        if (!bookEvent || !bookEvent.name || !bookEvent.email || !bookEvent.phoneno || !bookEvent.quantity) {
            showAlert('error', 'Please fill in all fields.')
            return
        } else {
            ref.current.click()
        }
    }
    const handleModelPurchaseEvent = () => {
        refclose.current.click()
        purchaseEvents(eventId, bookEvent.name, bookEvent.email, bookEvent.phoneno, bookEvent.quantity)
        afterBookEventUpdateEvent(eventId, bookEvent.quantity)
        setBookEvent({ name: '', email: '', phoneno: '', quantity: '' })
    }
    const onchange = (e) => {
        setBookEvent({ ...bookEvent, [e.target.name]: e.target.value })
    }
    const price = event && event.totalPrice
    const quantity = bookEvent && bookEvent.quantity
    const total = price * quantity

    const totalTicket = event && event.noOfTicket - event.soldTicket
    return (
        <>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Book Event</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {event && bookEvent ?
                                <>
                                    <div className="name mb-3">
                                        <strong>Name:</strong> {bookEvent && bookEvent.name}
                                    </div>
                                    <div className="email mb-3">
                                        <strong>Email:</strong> {bookEvent && bookEvent.email}
                                    </div>
                                    <div className="phoneno mb-3">
                                        <strong>Phone no:</strong> {bookEvent && bookEvent.phoneno}
                                    </div>
                                    <div className="price">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Event Name</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{event && event.eventName}</td>
                                                    <td>{bookEvent && bookEvent.quantity}</td>
                                                    <td>₹{event && event.totalPrice}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="d-flex justify-content-end">
                                            <div>
                                                <p className="text-right"><strong>Total Price:</strong></p>
                                                <p className="text-right">₹{total}</p>
                                            </div>
                                        </div>
                                    </div>
                                </> :
                                <div>
                                    <p>Form not submitted yet. Please submit the form.</p>
                                </div>
                            }
                        </div>

                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className={`btn btn-primary ${bookEvent && event ? '' : 'd-none'}`} onClick={handleModelPurchaseEvent}>Book Event</button>
                        </div>
                    </div>
                </div>
            </div>
            <Header logo={'https://demo.egenslab.com/html/eventlab/assets/images/logo-v2.png'} />
            <Hero name={'Event Details'} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
            <div className="event-details-wrapper ">
                <div className="container pt-5 position-relative">
                    <div className="row">
                        <div className="col-xl-8">
                            <div className="ed-main-wrap">
                                <div className="ed-top">
                                    <div className="ed-thumb">
                                        <img src={event && event.image} alt="img" />
                                    </div>
                                    <ul className="ed-status">
                                        <li><i className="bi bi-calendar2-week"></i>  {event && moment(event.eventStDate).format('MMMM Do YYYY')}</li>
                                        <li className="active"><i className="bi bi-diagram-3"></i> <span>{event && event.noOfTicket}</span> Seat</li>
                                        <li><i className="bi bi-geo"></i> {event && event.eventLocation}</li>
                                    </ul>
                                    <div className="event-info row align-items-center justify-content-between">
                                        <div className="col-lg-3 col-md-4">
                                            <div className="single-event-info">
                                                <div className="info-icon"><i className="bi bi-blockquote-left"></i></div>
                                                <div className="info-content">
                                                    <h5>Event Type</h5>
                                                    <p>{category && category.categoryname}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-4">
                                            <div className="single-event-info">
                                                <div className="info-icon"><i className="bi bi-lightning"></i></div>
                                                <div className="info-content">
                                                    <h5>Sponsor</h5>
                                                    <p>{sponser && sponser.sponserName}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-4">
                                            <div className="event-rating text-center">
                                                <ul className="d-flex justify-content-center">
                                                    <li><i className="bi bi-star-fill"></i></li>
                                                    <li><i className="bi bi-star-fill"></i></li>
                                                    <li><i className="bi bi-star-fill"></i></li>
                                                    <li><i className="bi bi-star-fill"></i></li>
                                                    <li><i className="bi bi-star-half"></i></li>
                                                </ul>
                                                <h6>(500)</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ul className="d-flex justify-content-between align-items-center mx-3 flex-wrap pt-3 pb-2 ">
                                    <li className="pt-2 fw-semibold fs-6 text-secondary-emphasis"><i className="bi bi-diagram-3 me-2"></i> <span>{event && totalTicket}</span> Availabel Seat</li>
                                    <li className="pt-2 fw-semibold fs-6 text-secondary-emphasis"><i className="bi bi-calendar2-week"></i>  <span>{event && moment(event.eventEndDate).format('MMMM Do YYYY')}</span>  Event End Date</li>
                                    <li className='pt-2 fw-semibold fs-6 text-secondary-emphasis'><i className="bi bi-tag-fill me-2"></i> ₹ {event && event.totalPrice} Price</li>
                                </ul>
                                <div className="ed-tabs-wrapper mt-3">
                                    <div className="tab-content" id="pills-tabContent2">
                                        <div className="tab-pane fade show active" id="pills-details" role="tabpanel"
                                            aria-labelledby="pills-details-tab">
                                            <div className="details-tab-content">
                                                <h3 className="ed-title">Media companies need to better one then educate
                                                    advertisers. better one then educate.</h3>
                                                <p>Cras semper, massa vel aliquam luctus, eros odio tempor turpis, ac placerat
                                                    metus tortor eget magna. Donec mattis posuere pharetra. Donec vestibulum
                                                    ornare velit ut sollicitudin. Pellentesque in faucibus purus.Nulla nisl
                                                    tellus, hendrerit nec dignissim pellentesque, posuere in est. Suspendisse
                                                    bibendum vestibulum elit eu placerat. In ut ipsum in odio euismod tincidunt
                                                    non lacinia nunc. Donec ligula augue, mattis eu varius ac.</p>
                                                <div className="row ed-overview">
                                                    <div className="col-lg-6">
                                                        <h5 className="ed-subtitle">Over View</h5>
                                                        <ul className="overview-list">
                                                            <li><i className="bi bi-check2"></i> You Got Full Free Certificate.</li>
                                                            <li><i className="bi bi-check2"></i> Unlimited Coffe & Tea When U
                                                                Boring.</li>
                                                            <li><i className="bi bi-check2"></i> Etiam dictum, dui sit amet
                                                                venenatis.</li>
                                                            <li><i className="bi bi-check2"></i> Class aptent taciti sociosqu ad
                                                                litora.</li>
                                                            <li><i className="bi bi-check2"></i> Lunch Suspendisse in commodo feli.
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="overview-images d-grid">
                                                            <div className="overview-img1">
                                                                <img src="https://demo.egenslab.com/html/eventlab/assets/images/gallary/view1.png" alt="img"
                                                                    className="img-fluid" />
                                                            </div>
                                                            <div className="overview-img2">
                                                                <img src="https://demo.egenslab.com/html/eventlab/assets/images/gallary/view2.png" alt="img"
                                                                    className="img-fluid" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p>Cras semper, massa vel aliquam luctus, eros odio tempor turpis, ac placerat
                                                    metus tortor eget magna. Donec mattis posuere pharetra. Donec vestibulum
                                                    ornare velit ut sollicitudin. Pellentesque in faucibus purus.Nulla nisl
                                                    tellus, hendrerit nec dignissim pellentesque.</p>
                                                <div className="comment-form">
                                                    <h5 className="ed-subtitle">Leave Your Comment</h5>
                                                    <form action="#" id="comment-form">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="primary-input-group">
                                                                    <input type="text" id="name" placeholder="Your Full Name" />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="primary-input-group">
                                                                    <input type="email" id="email" placeholder="Your Email" />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="primary-input-group">
                                                                    <input type="text" id="subject" placeholder="Subject" />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="primary-input-group">
                                                                    <textarea name="massege" id="massege" cols="30" rows="7"
                                                                        placeholder="Message"></textarea>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="submit-btn">
                                                                    <button type="submit" className="primary-submit">Submit Now</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="event-d-sidebar">
                                {!localStorage.getItem('usertoken') ?
                                    <div className='text-center m-5'>
                                        <Link to="/login" className='nav-btn'><button className='primary-btn-fill'>Please Login/Register</button></Link>
                                    </div>
                                    : event && event.soldTicket === event.noOfTicket ? <div>
                                        This Event show is full. Please book another event.
                                    </div> : <div className="event-book-form">
                                        <div className="category-title"><i className="bi bi-bookmark-check"></i>
                                            <h4>Book This Event</h4>
                                        </div>
                                        <form action="#" method='post' id="event-book" className="event-book">
                                            <div className="primary-input-group">
                                                <input type="text" id="e-name" name='name' value={bookEvent && bookEvent.name} onChange={onchange} placeholder="Your Full Name" required />
                                            </div>
                                            <div className="primary-input-group">
                                                <input type="email" id="e-email" name='email' value={bookEvent && bookEvent.email} onChange={onchange} placeholder="Your Email" required />
                                            </div>
                                            <div className="primary-input-group">
                                                <input type="tel" id="e-tel" name='phoneno' value={bookEvent && bookEvent.phoneno} onChange={onchange} placeholder="Phone" required />
                                            </div>
                                            <div className="primary-input-group">
                                                <input type="number" placeholder='Quantiy' value={bookEvent && bookEvent.quantity} onChange={onchange} name='quantity' required />
                                            </div>
                                            <div className="submit-btn">
                                                <button type="submit" onClick={handlePurchaseEvent} className="primary-submit d-block w-100">Book Event</button>
                                            </div>
                                        </form>
                                    </div>}
                                {/* <div className="event-d-sidebar-cards">
                            <div className="category-title"><i className="bi bi-layout-text-sidebar-reverse"></i>
                                <h4>Recent Event</h4>
                            </div>
                            <ul className="event-cards-list">
                                <li className="event-card-sm">
                                    <div className="event-thumb">
                                        <a href="event-details.html">
                                            <img src="https://demo.egenslab.com/html/eventlab/assets/images/event/event-thumb-sm1.png" alt="img"/>
                                        </a>
                                    </div>
                                    <div className="event-sm-info">
                                        <h5><a href="event-details.html">Donec risus dui, suscipit iand
                                                tempor lacinia vehicula.</a></h5>
                                        <div className="event-bottom">
                                            <a className="event-date" href="."><i className="bi bi-calendar2-week"></i> January
                                                21, 2021</a>
                                            <div className="event-deat"><i className="bi bi-diagram-3"></i> <span>500</span>
                                            </div>
                                        </div>
                                        <div className="event-d-btn">
                                            <a href="/eventdetail">Book Now</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div> */}
                                <div className="event-organizer-wrap">
                                    <div className="category-title"><i className="bi bi-person-plus"></i>
                                        <h4>Event Organized By</h4>
                                    </div>
                                    <div className="organizer-info">
                                        <div className="organizer-image">
                                            <img src={user && user.image} alt="img" />
                                        </div>
                                        <h4>{user && user.fname} {user && user.lname}</h4>
                                        <h6 className='mt-2'><i className="bi bi-person-lines-fill"></i> {user && user.contactno}</h6>
                                        <h6 className='mt-2'><i className="bi bi-envelope"></i> {user && user.email}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default EventDetail
