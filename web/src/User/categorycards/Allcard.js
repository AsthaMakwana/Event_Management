import React, { useContext, useEffect, useState } from 'react'
import eventContext from '../../context/Eventcontext'
import Card from '../card/Card'
const Allcard = () => {
    // for fetch all event from db

    const [eventData, setEventData] = useState([])
    const context = useContext(eventContext)
    const { userfetchevent } = context
    const fetchevent = async () => {
        try {
          const response = await userfetchevent();
          const filteredEvents = response.filter((e) => {
            const eventDate = new Date(e.eventEndDate)
            const currentDate = new Date()
            return eventDate > currentDate;
          });
          setEventData(filteredEvents);
        } catch (error) {
          console.log("fetching event", error);
        }
      };
      
      useEffect(() => {
        fetchevent();
      }, [eventData]);
      
    // for card pagination

    const CardsPerPage = 6;

    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the range of cards to display on the current page
    const startIndex = (currentPage - 1) * CardsPerPage;
    const endIndex = startIndex + CardsPerPage;
    const displayedCards = eventData && eventData.slice(startIndex, endIndex);

    const totalPages = eventData && Math.ceil(eventData.length / CardsPerPage);

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    return (
        <>
            {eventData===null || eventData.length === 0 ?(<div>No event availabel. Event Added soon</div>): (
                <>
                    <div className="row">
                        {
                            displayedCards.map((event) => {
                                return <Card event={event} id={event._id} />
                            })
                        }
                    </div>
                    <div className='d-flex justify-content-between align-items-center mt-5'>
                        <button onClick={goToPreviousPage} disabled={currentPage === 1} className='BackButton'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" /> </svg>
                            <span>Back</span>
                        </button>
                        <span>Page {currentPage}/{totalPages}</span>
                        <button onClick={goToNextPage} disabled={currentPage === totalPages} className='nextButton'>
                            <span>Next</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" /> </svg>
                        </button>
                    </div>
                </>) 
            }
        </>
    )
}

export default Allcard
