import React from 'react'
import { FileEdit, Trash2 } from 'lucide-react'

const Sponseritem = (props) => {

    const { sponser, updatesponser, index, handleDeleteSponser } = props

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
                        <span><a href="event-details.html">{sponser.sponserName}</a></span>
                    </div>
                </td>
                <td>
                    <div className="attendant__speakers">
                        <div className="attendant__speakers-thumb">
                            <img src={sponser.sponserLogo} alt="image not found" />
                        </div>
                    </div>
                </td>
                <td>
                    <div className="attendant__seminer_decription">
                        <span><a href="event-details.html">{sponser.sponserDetail}</a></span>
                    </div>
                </td>
                <td>
                    <div className="attendant__action d-flex gap-2">
                        <span onClick={() => { updatesponser(sponser) }}><FileEdit absoluteStrokeWidth /></span>
                        <span onClick={() => handleDeleteSponser(sponser)}><Trash2 absoluteStrokeWidth color='red' /></span>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default Sponseritem
