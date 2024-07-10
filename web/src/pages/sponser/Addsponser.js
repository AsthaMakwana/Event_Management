import React, { useContext, useRef, useState } from 'react'
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { Link } from 'react-router-dom'
import sponserValue from '../../context/Eventcontext'
import '../event/addevent.css'
import {Home} from 'lucide-react'
import Alert,{ showAlert } from '../../components/alert/Alert';
import HeaderTop from '../../components/top section/HeaderTop';

const Addsponser = () => {

  const [showMenu, setShowMenu] = useState(false);
  const [arrow, setarrow] = useState(false)
  const [arrowE, setarrowE] = useState(false)
  const [dropdown, setdropdown] = useState(false)

  const context = useContext(sponserValue) 
  const {addsponser} = context
  const [sponser,setSponser] = useState({name:'',detail:'',logo:''})
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
  const handleClick = (e)=>{
    e.preventDefault()
    if(!sponser.name || !sponser.logo){
      showAlert('error','Please fill out all fields.')
      return
    }
    addsponser(sponser.name,sponser.detail,sponser.logo)
    setSponser({name:'',detail:'',logo:''})
  }
  const onchange = (e)=>{
    setSponser({...sponser,[e.target.name]:e.target.value})
  }

  // for image 

  const convertToBase64 = (e) => {
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setSponser({ ...sponser,logo: reader.result })
    }
    reader.onerror = (error) => {
      console.log('error:', error)
    }
  }
  return (
    <>
    <Alert/>
      <div className="offcanvas__overlay"></div>
      <div className="offcanvas__overlay-white"></div>
      <div className="page__full-wrapper">
        <Navbar handleArrowClick={handleArrowClick} showMenu={showMenu} arrow={arrow} arrowE={arrowE} handleArrowEClick={handleArrowEClick} />
        <div className='page__body-wrapper'>
          <Header handleSidebarBtnClick={handleSidebarBtnClick} handleDropdown={handleDropdown} dropdown={dropdown} showMenu={showMenu} />
          <div className="app__slide-wrapper">
            <HeaderTop text={'Add Sponser'} style={'invisible'}/>
            <div className="row">
              <div className="col-xxl-12">
                <div className="create__event-area shadow-lg my-3">
                  <div className="body__card-wrapper">
                    <div className="card__header-top">
                      <div className="card__title-inner">
                        <h4 className="event__information-title">Sponser Information</h4>
                      </div>
                    </div>
                    <form action="">
                      <div className="create__event-main pt-25">
                        <div className="event__left-box">
                          <div className="create__input-wrapper">
                            <div className="singel__input-field mb-5">
                              <label htmlFor='name'className="input__field-text">Sponser Title</label>
                              <input type="text" name='name' placeholder='Enter Sponser Title' value={sponser.name} onChange={onchange} />
                            </div>
                            <div className="popup__update">
                              <label htmlFor='logo'>Upload Image ( 200x200px )</label>
                              <input type="file" name='logo' onChange={convertToBase64} accept="image/*"/>
                            </div>
                          </div>
                        </div>
                        <div className="event__right-box">
                          <div className="create__input-wrapper">
                            <div className="col-xxl-12 col-xl-12 col-lg-12">
                              <div className="event__input mb-5">
                                <label htmlFor='detail'className="input__field-text">Sponser Details</label>
                                <textarea name='detail' placeholder="Enter Sponser Details" value={sponser.detail} onChange={onchange}></textarea>
                              </div>
                              <button className="input__btn w-100" type="submit" onClick={handleClick}>Add Sponser</button>
                            </div>
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

export default Addsponser
