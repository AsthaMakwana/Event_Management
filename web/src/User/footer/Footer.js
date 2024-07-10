import React from 'react'

const Footer = () => {
  return (
 <>
 <div className="footer-outer pt-24 gray-300">
                <div className="footer-area">
                    <div className="container">
                        <div className="footer-wrapper">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-5 order-1">
                                    <div className="footer-widget mt-0">
                                        <h5 className="footer-widget-title">
                                            Quick Link
                                        </h5>
                                        <div className="footer-links">
                                            <ul className="link-list">
                                                <li><a href="/" className="footer-link">About Us</a></li>
                                                <li><a href="/" className="footer-link">Event</a> </li>
                                                <li><a href="/" className="footer-link">Schedule</a></li>
                                                <li><a href="/" className="footer-link">Our Support</a></li>
                                                <li><a href="/" className="footer-link">Speaker</a></li>
                                                <li><a href="/" className="footer-link">Sponsor</a></li>
                                                <li><a href="/" className="footer-link">Blog</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 order-lg-2 order-3">
                                    <div className="footer-newslatter-wrapper text-center">
                                        <h3>Subscribe Our Newsletter</h3>
                                        <h5>Don’t Miss Our Feature Update</h5>
                                        <form className="newslatter-form" action="#" id="newslatter-form">
                                            <div className="newslatter-input-group d-flex">
                                                <input type="email" placeholder="Enter Your Email" />
                                                <button type="submit">Subscribe</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-7 order-lg-3 order-2 ">
                                    <div className="footer-widget">
                                        <h5 className="footer-widget-title">
                                            Contact
                                        </h5>
                                        <div className="footer-links">
                                            <ul className="link-list">
                                                <li className="contact-box">
                                                    <div className="contact-icon">
                                                        <i className="bi bi-telephone-plus"></i>
                                                    </div>
                                                    <div className="contact-links">
                                                        <a href="tel:+17632275032">+1 763-227-5032</a>
                                                        <a href="tel:+17632275032">+1 763-227-5032</a>
                                                    </div>
                                                </li>
                                                <li className="contact-box">
                                                    <div className="contact-icon">
                                                        <i className="bi bi-envelope-open"></i>
                                                    </div>
                                                    <div className="contact-links">
                                                        <a
                                                            href="https://demo.egenslab.com/cdn-cgi/l/email-protection#066f68606946637e676b766a632865696b"><span
                                                                className="__cf_email__"
                                                                data-cfemail="b5dcdbd3daf5d0cdd4d8c5d9d09bd6dad8">[email&#160;protected]</span></a>
                                                        <a
                                                            href="https://demo.egenslab.com/cdn-cgi/l/email-protection#a5d6d0d5d5cad7d1e5c0ddc4c8d5c9c08bc6cac8"><span
                                                                className="__cf_email__"
                                                                data-cfemail="4d3e383d3d223f390d28352c203d2128632e2220">[email&#160;protected]</span></a>
                                                    </div>
                                                </li>
                                                <li className="contact-box">
                                                    <div className="contact-icon">
                                                        <i className="bi bi-geo-alt"></i>
                                                    </div>
                                                    <div className="contact-links">
                                                        <a href="/">2752 Willison Street
                                                            Eagan, United State</a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-bottom">
                            <div className="row align-items-center">
                                <div className="col-lg-5  order-3 order-lg-1">
                                    <div className="footer-copyright">
                                        <p>Copyright 2021 EventLab| Design By <a href="/">Egens Lab</a></p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 order-1 order-lg-2">
                                    <div className="footer-logo">
                                        <a href="/"><img src="https://demo.egenslab.com/html/eventlab/assets/images/logo-v2.png" alt="img" /></a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 order-2 order-lg-3">
                                    <ul className="d-flex footer-social-links justify-content-lg-end justify-content-center">
                                        <li><a href="/"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="/"><i className="fab fa-instagram"></i></a></li>
                                        <li><a href="/"><i className="fab fa-linkedin-in"></i></a></li>
                                        <li><a href="/"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="/"><i className="fab fa-whatsapp"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Footer
