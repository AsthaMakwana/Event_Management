import React from 'react'
import { Share2 } from 'lucide-react'
import moment from "moment"

const Card = ({ event, id }) => {
    const totalTicket = event.noOfTicket - event.soldTicket
    return (
        <>
            <div className="col-lg-4 col-md-6 wow fadeInUp animated" data-wow-delay="200ms"
                data-wow-duration="1500ms">
                <div className="event-card-md">
                    <div className="event-thumb h-50">
                        <div className="imgae" style={{position:'relative',overflow:'hidden',height:'0',paddingBottom:'75%'}}>
                            <img src={event.image} alt="img" className='img-fluid ' style={{objectFit:'cover'}}/>
                        </div>
                        <div className="event-lavel">
                            <i className="bi bi-diagram-3"></i> <span>{totalTicket} Seat</span>
                        </div>
                    </div>
                    <div className="event-content">
                        <div className="event-info">
                            <div className="event-date"><a href="/"> <i
                                className="bi bi-calendar2-week"></i> {moment(event.eventStDate).format('MMMM Do YYYY')}</a>
                            </div>
                            <div className="event-location"><a href="/"> <i
                                className="bi bi-geo-alt"></i> {event.eventLocation}</a></div>
                        </div>
                        <h5 className="event-title"><a href="/">{event.eventName}</a></h5>
                        <div className="event-bottom">
                            <div className="event-readme">
                                <a href={`/eventdetail/${id}`}>Book Now</a>
                            </div>
                            <div className="event-share-icons">
                                <ul className="share-options">
                                    <li><a href="/"><i className="fab fa-facebook-f" style={{ fontSize: '1rem' }}></i></a></li>
                                    <li><a href="/"><i className="fab fa-instagram" style={{ fontSize: '1rem' }}></i></a></li>
                                    <li><a href="/"><i className="fab fa-linkedin-in" style={{ fontSize: '1rem' }}></i></a></li>
                                    <li><a href="/"><i className="fab fa-twitter" style={{ fontSize: '1rem' }}></i></a></li>
                                </ul>
                                <div className="share-btn"><Share2 /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
