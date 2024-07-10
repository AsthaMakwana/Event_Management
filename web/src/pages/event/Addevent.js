import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import eventValue from '../../context/Eventcontext'
import './addevent.css'
import jwtDecode from 'jwt-decode';
import HeaderTop from '../../components/top section/HeaderTop';
import { showAlert } from '../../components/alert/Alert';

const Addevent = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [arrow, setarrow] = useState(false)
  const [arrowE, setarrowE] = useState(false)
  const [dropdown, setdropdown] = useState(false)

  const handleArrowClick = () => {
    setarrow((prevArrow) => !prevArrow);
  };
  const handleArrowEClick = () => {
    setarrowE((prevArrow) => !prevArrow);
  };
  const handleDropdown = () => {
    console.log('hello')
    setdropdown((prevShowMenu) => !prevShowMenu);
  }
  const handleSidebarBtnClick = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const context = useContext(eventValue)
  const { addevent, getcategory, getsponser } = context
  const [event, setEvent] = useState({ name: '', detail: '', location: '', stdate: '', endate: '', contact: '', image: '', noticket: '', price: '', category: '', sponser: '' })
  const [catg, setCatg] = useState()
  const [spn, setSpn] = useState()
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const categoryData = await getcategory();
        setCatg(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const fetchSponserData = async () => {
      try {
        const sponserData = await getsponser()
        setSpn(sponserData)
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      }
    }
    fetchSponserData()
    getsponser();
    fetchCategoryData();
    getcategory();
  }, []);
  const handleClick = async (e) => {
    e.preventDefault()
    if (!event.name || !event.detail || !event.location || !event.stdate || !event.endate || !event.contact || !event.image || !event.noticket || !event.price || !event.category || !event.sponser) {
      showAlert('error', 'Please fill out all fields.');
      return;
    }
    
    const catgData = JSON.parse(localStorage.getItem('categoryData')) || []
    const catgdecodedDataArray = [];

    catgData.forEach(token => {
      try {
        const catgdecodedData = jwtDecode(token);
        catgdecodedDataArray.push(catgdecodedData);
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    });
    const categorydata = catgdecodedDataArray.filter((val) => {
      return val === event.category
    })
    if (categorydata.length > 0) {
      localStorage.setItem('categoryid', categorydata);
    } else {
      console.log('No matching category found');
    }

    const spnData = JSON.parse(localStorage.getItem('sponserData')) || []
    const spndecodedDataArray = [];

    spnData.forEach(token => {
      try {
        const spndecodedData = jwtDecode(token);
        spndecodedDataArray.push(spndecodedData);
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    });
    const sponserdata = spndecodedDataArray.filter((val) => {
      return val === event.sponser
    })
    if (sponserdata.length > 0) {
      localStorage.setItem('sponserid', sponserdata);
    } else {
      console.log('No matching category found');
    }
    addevent(event.name, event.detail, event.location, event.stdate, event.endate, event.contact, event.image, event.noticket, event.price)
  }

  const onchange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value })
  }

  const convertToBase64 = (e) => {
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setEvent({ ...event,image: reader.result })
    }
    reader.onerror = (error) => {
      console.log('error:', error)
    }
  }

  // start date and End date
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <div className="offcanvas__overlay"></div>
      <div className="offcanvas__overlay-white"></div>
      <div className="page__full-wrapper">
        <Navbar handleArrowClick={handleArrowClick} showMenu={showMenu} arrow={arrow} arrowE={arrowE} handleArrowEClick={handleArrowEClick} />
        <div className='page__body-wrapper'>
          <Header handleSidebarBtnClick={handleSidebarBtnClick} handleDropdown={handleDropdown} dropdown={dropdown} showMenu={showMenu} />
          <div className="app__slide-wrapper">
            <HeaderTop text={'Add Event'} style={'invisible'} />
            <div className="row">
              <div className="col-xxl-12">
                <div className="create__event-area shadow-lg my-3">
                  <div className="body__card-wrapper">
                    <div className="card__header-top">
                      <div className="card__title-inner">
                        <h4 className="event__information-title">Event Information</h4>
                      </div>
                    </div>
                    <form action="">
                      <div className="create__event-main pt-25">
                        <div className="event__left-box">
                          <div className="create__input-wrapper">
                            <div className="singel__input-field mb-5">
                              <label htmlFor='name' className="input__field-text">Event Title</label>
                              <input type="text" name='name' placeholder='Enter Event Title' value={event.name} onChange={onchange} />
                            </div>
                            <div className="event__input mb-5">
                              <label htmlFor='detail' className="input__field-text">Event Details</label>
                              <textarea name='detail' value={event.detail} onChange={onchange} placeholder='Enter Event Details'></textarea>
                            </div>
                          </div>
                          <div className="event__update-wrapper mb-5">
                            <span>Add Image</span>
                            <div className="event__update-file">
                              {event && event.image ? <div className="event__update-thumb">
                                <img src={event.image} alt="image not found" className='img-fluid' />
                                <span className="update__thumb-close" onClick={()=>{setEvent({image:''})}}><i className="fa-solid fa-xmark" style={{ fontSize: '1.3rem', margin: '0.34rem 0.4rem' }}></i></span>
                              </div> : ''}
                              <div className="event__update-thumb">
                                <div className="box__input">
                                  <input type="file" name="image" onChange={convertToBase64} id="image" className="box__file" accept='image/*' />
                                  <label className="input__field-text" htmlFor="image"><span><i className="fa-regular fa-plus"></i></span><span>Add Image</span></label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row g-20">
                            <div className="col-xxl-6 col-xl-6 col-lg-6">
                              <div className="singel__input-field is-color-change mb-5">
                                <label htmlFor='stdate' className="input__field-text">Start Date</label>
                                <input type="date" name='stdate' value={event.stdate} onChange={onchange} min={today}  />
                              </div>
                            </div>
                            <div className="col-xxl-6 col-xl-6 col-lg-6">
                              <div className="singel__input-field is-color-change mb-5">
                                <label htmlFor='endate' className="input__field-text">End Date</label>
                                <input name='endate' value={event.endate} onChange={onchange} min={event.stdate ? new Date(event.stdate).toISOString().split('T')[0] : today} type="date"  />
                              </div>
                            </div>

                          </div>
                        </div>
                        <div className="event__right-box">
                          <div className="create__input-wrapper">
                            <div className="col-xxl-12 col-xl-12 col-lg-12">
                              <div className="singel__input-field mb-5">
                                <label htmlFor='location' className="input__field-text">Venue / Address</label>
                                <input name='location' value={event.location} onChange={onchange} type="text" placeholder='Enter Event Address' />
                              </div>
                            </div>
                            <div className="row g-20" style={{ marginBottom: '3rem' }}>
                              <div className="col-xxl-6 col-xl-6 col-lg-6">
                                <label className="input__field-text">Event Category</label>
                                <div className="contact__select">
                                  <select onChange={onchange} value={event.category} name='category'>
                                    <option hidden>Select the category</option>
                                    {catg && catg.map((category) => {
                                      return <option value={category._id}>{category.categoryname}</option>
                                    })}
                                  </select>
                                </div>
                              </div>
                              <div className="col-xxl-6 col-xl-6 col-lg-6">
                                <div className="singel__input-field mb-5">
                                  <label htmlFor='noticket' className="input__field-text">Total Seat</label>
                                  <input name='noticket' value={event.noticket} placeholder='Enter Total seat' onChange={onchange} type="number" />
                                </div>
                              </div>
                              <div className="col-xxl-6 col-xl-6 col-lg-6">
                                <div className="singel__input-field">
                                  <label htmlFor='price' className="input__field-text">Ticket Price</label>
                                  <input name='price' onChange={onchange} type="number" placeholder='Enter Ticket Price' value={event.price} />
                                </div>
                              </div>
                              <div className="col-xxl-6 col-xl-6 col-lg-6">
                                <label className="input__field-text">Event Sponser</label>
                                <div className="contact__select">
                                  <select onChange={onchange} name='sponser' value={event.sponser}>
                                    <option hidden>Select the sponser</option>
                                    {spn && spn.map((sponser) => {
                                      return <option value={sponser._id}>{sponser.sponserName}</option>
                                    })}
                                  </select>
                                </div>
                              </div>
                            </div>
                            {/* <div className="singel__input-field mb-5">
                              <label className="input__field-text">Email</label>
                              <input type="text"/>
                            </div> */}
                            <div className="singel__input-field mb-5">
                              <label htmlFor='contact' className="input__field-text">Phone Number</label>
                              <input name='contact' value={event.contact} placeholder='Enter Phone Number' onChange={onchange} type="number" />
                            </div>
                            <button className="input__btn w-100" type="submit" onClick={handleClick}>Create Event</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Addevent
