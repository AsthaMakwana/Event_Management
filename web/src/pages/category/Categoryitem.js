import React from 'react'
import { FileEdit, Trash2 } from 'lucide-react'

const Categoryitem = (props) => {
    const { category, updateCategory, index, handleDeleteCategory } = props
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
                        <span><a href="event-details.html">{category.categoryname}</a></span>
                    </div>
                </td>
                <td>
                    <div className="attendant__seminer_decription">
                        <span><a href="event-details.html">{category.categorydescription}</a></span>
                    </div>
                </td>
                <td>
                    <div className="attendant__action d-flex gap-2">
                        <span onClick={() => { updateCategory(category) }}><FileEdit absoluteStrokeWidth /></span>
                        <span onClick={() => handleDeleteCategory(category)}><Trash2 absoluteStrokeWidth color='red' /></span>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default Categoryitem
