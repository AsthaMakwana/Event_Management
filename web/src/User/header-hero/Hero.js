import React from 'react'

const Hero = ({name}) => {
    return (
        <div className="breadcrumb-area">
            <div className="container">
                <div className="row align-items-end">
                    <div className="col-lg-12">
                        <div className="breadcrumb-content">
                            <h2 className="page-title">{name}</h2>
                            <ul className="page-switcher">
                                <li><a href="/">Home <i className="bi bi-caret-right"></i></a></li>
                                <li>{name}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
