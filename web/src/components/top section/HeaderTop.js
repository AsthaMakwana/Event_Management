import React from 'react'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

const HeaderTop = ({ text, btnText, style,redirect }) => {
    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="breadcrumb__wrapper mb-35">
                        <div className="breadcrumb__main">
                            <div className="breadcrumb__inner">
                                <div className="breadcrumb__menu">
                                    <nav>
                                        <ul>
                                            <Home absoluteStrokeWidth size={35} />
                                            <li><span><Link to="/organiser">Home</Link></span></li>
                                            <li className="active"><span>{text}</span></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className={`breadcrum__button ${style}`}>
                                <Link className="breadcrum__btn event__popup-active" to={redirect}> {btnText}<i className="fa-regular fa-plus"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderTop
