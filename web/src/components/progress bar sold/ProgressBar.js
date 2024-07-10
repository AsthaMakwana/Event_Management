import React from 'react'
import Svg from './Svg'
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'
import './progressbar.css'
import { ThumbsUp } from 'lucide-react';

const ProgressBar = ({title}) => {
  const idCSS = "hello";
  const percentage = 70;
  return (
    <div className="card__wrapper total__seat-wapper shadow-lg" style={{height:'95%'}}>
      <div className="card__header mb-35">
        <div className="card__header-top">
          <div className="card__title-inner">
            <div className="card__header-icon" style={{ marginBottom: '10px', marginRight: '10px' }}>
              <ThumbsUp absoluteStrokeWidth size={30} />
            </div>
            <div className="card__header-title">
              <h4 style={{fontSize:'1.2rem'}}>{title}</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center h-75">
      <div className="total__seat-progress">
        <div id="radialChart">
        <Svg />
        <CircularProgressbar
          strokeWidth={5}
          value={percentage}
          text={`${percentage}%`}
          styles={{
            path: { stroke: `url(#${idCSS})`, height: "100%" },
            trail: {
              stroke: "#f1f1f1"
            }
          }}
        />
        </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
