import React from 'react'
import { Eye, FileEdit, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const Eventitem = (props) => {
    const { event, updateEvent, index ,handledeleteEvent} = props

    const handleviewEvent=()=>{
        localStorage.setItem('eventdetail',event._id)
    }
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getUTCFullYear();
    
        return `${day}-${month}-${year}`;
      }
    return (
        <>
            <tr>
                <td>
                    <div className="attendant__serial">
                        <span>{index + 1}</span>
                    </div>
                </td>
                <td>
                    <div className="attendant__seminer">
                        <span><Link>{event.eventName}</Link></span>
                    </div>
                </td>
                <td>
                    <div className="attendant__speakers">
                        <div className="attendant__speakers-thumb">
                            <img src={event.image} alt='img not found' />
                        </div>
                    </div>
                </td>
                <td>
                    <div className="attendant__time">
                        <span>{formatDate(event.eventStDate)}</span>
                    </div>
                </td>
                <td>
                    <div className="attendant__date">
                        <span>{event.noOfTicket}</span>
                    </div>
                </td>
                <td>
                    <div className="attendant__location">
                        <span>{event.totalPrice}</span>
                    </div>
                </td>
                <td>
                    <div className="attendant__location">
                        <span>{event.eventLocation}</span>
                    </div>
                </td>
                <td>
                    <div className="attendant__action d-flex gap-2">
                        <span onClick={handleviewEvent}><Link to={`/organiser/event/eventdetailm`}><Eye absoluteStrokeWidth /></Link></span>
                        <span onClick={() => updateEvent(event)}><FileEdit absoluteStrokeWidth color='gray' /></span>
                        <span onClick={()=>handledeleteEvent(event)}><Trash2 absoluteStrokeWidth color='red' /></span>
                    </div>
                </td>
            </tr>

        </>
    )
}

export default Eventitem
