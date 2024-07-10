import React from 'react'
import './widget.css'

const Widget = ({ widgetname, icon,count }) => {
  return (
    <div className="expovent__count-item mb-20 shadow">
      <div className="expovent__count-thumb include__bg transition-3"></div>
      <div className="expovent__count-content">
        <h3 className="expovent__count-number">{count}</h3>
        <span className="expovent__count-text">{widgetname}</span>
      </div>
      <div className="expovent__count-icon">
      <i>{icon}</i>
      </div>
    </div>
  )
}

export default Widget
