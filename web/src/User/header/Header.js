import React, { useState, useEffect } from 'react'
import '../style/style.css'
import '../style/responsive.css'
import '../style/animate.css'
import { Link } from 'react-router-dom'
import { showAlert } from '../../components/alert/Alert'


const Header = ({ logo, linkColor }) => {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])
    useEffect(() => {
    }, [localStorage.getItem('usertoken')])
    const handleLogout = () => {
        localStorage.removeItem('usertoken')
        localStorage.removeItem('categoryData')
        localStorage.removeItem('sponserData')
        localStorage.removeItem('categoryid')
        localStorage.removeItem('sponserid')
        localStorage.removeItem('eventdetail')
        showAlert('success', 'Logout')
    }
    return (
        <>
            <header>
                <div className={`header-area header-style-one header-light ${isSticky ? 'sticky' : ''}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-2 col-lg-12 col-md-12 col-sm-12 col-xs-12 d-xl-flex align-items-center">
                                <div className="logo d-flex align-items-center justify-content-between">
                                    <Link to="/" className='logo-dark' style={{ display: `${isSticky ? 'block' : 'none'}` }}><img src='https://demo.egenslab.com/html/eventlab/assets/images/logo.png' alt="logo" /></Link>
                                    <Link to="/" className='logo-light' style={{ display: `${isSticky ? 'none' : 'block'}` }}><img src={logo} alt="logo" /></Link>
                                    <div className="mobile-menu d-flex ">
                                        <div onClick={toggleNav} className="hamburger d-block d-xl-none">
                                            <span className="h-top"></span>
                                            <span className="h-middle"></span>
                                            <span className="h-bottom"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-6 col-xs-6">
                                <nav className={`main-nav ${isNavVisible ? 'slidenav' : ''}`}>
                                    <div className="inner-logo d-xl-none">
                                        <Link to="/"><img src="https://demo.egenslab.com/html/eventlab/assets/images/logo-v2.png" alt="logo" /></Link>
                                    </div>
                                    <ul>
                                        <li className="has-child-menu">
                                            <Link to="/" style={{ color: linkColor }}>Home</Link>
                                        </li>
                                        {/* <li><Link to="/contact" style={{color:linkColor}}>Contact</Link></li> */}
                                        <li><Link to="/profile" style={{ color: linkColor }}>Profile</Link></li>
                                    </ul>
                                    {localStorage.getItem('usertoken') ?
                                        <div className="inner-btn d-xl-none">
                                            <Link to="/" className="primary-btn-fill" onClick={() => localStorage.removeItem('usertoken')}>Logout</Link>
                                        </div> :
                                        <div className="inner-btn d-xl-none">
                                            <Link to="/login" className="primary-btn-fill">Login</Link>
                                        </div>}
                                </nav>
                            </div>
                            <div className="col-xl-2 col-2 d-none d-xl-block p-0">
                                <div className="nav-right h-100 d-flex align-items-center justify-content-end">
                                    <ul>
                                        {localStorage.getItem('usertoken') ?
                                            <li className="nav-btn">
                                                <Link className="primary-btn-fill" to="/" onClick={handleLogout}>Logout</Link>
                                            </li> :
                                            <li className="nav-btn">
                                                <Link className="primary-btn-fill" to="/login">Log in</Link>
                                            </li>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
