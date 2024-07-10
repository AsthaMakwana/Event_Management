import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import '../event/addevent.css'
import categoryValue from '../../context/Eventcontext'
import Alert, { showAlert } from '../../components/alert/Alert';
import HeaderTop from '../../components/top section/HeaderTop';

const Addcategory = () => {

  // handle dropdown of header and navbar 

  const [showMenu, setShowMenu] = useState(false);
  const [arrow, setarrow] = useState(false)
  const [arrowE, setarrowE] = useState(false)
  const [dropdown, setdropdown] = useState(false)

  const context = useContext(categoryValue)
  const { addcategory, getcategory } = context
  const [category, setCategory] = useState({ title: '', detail: '' })

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

  useEffect(() => {
    getcategory();
    // eslint-disable-next-line
  }, [])

  const handleClick = (e) => {
    e.preventDefault()
    if (!category.title) {
      showAlert('error', 'Please fill out all fields.');
      return;
    }
    addcategory(category.title, category.detail)
    setCategory({ title: '', detail: '' })
  }
  const onchange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Alert />
      <div className="offcanvas__overlay"></div>
      <div className="offcanvas__overlay-white"></div>
      <div className="page__full-wrapper">
        <Navbar handleArrowClick={handleArrowClick} showMenu={showMenu} arrow={arrow} arrowE={arrowE} handleArrowEClick={handleArrowEClick} />
        <div className='page__body-wrapper'>
          <Header handleSidebarBtnClick={handleSidebarBtnClick} handleDropdown={handleDropdown} dropdown={dropdown} showMenu={showMenu} />
          <div className="app__slide-wrapper">
            <HeaderTop text={'Add Category'} style={'invisible'} />
            <div className="row">
              <div className="col-xxl-12">
                <div className="create__event-area shadow-lg my-3">
                  <div className="body__card-wrapper">
                    <div className="card__header-top">
                      <div className="card__title-inner">
                        <h4 className="event__information-title">Category Information</h4>
                      </div>
                    </div>
                    <form action="">
                      <div className="create__event-main pt-25">
                        <div className="event__left-box">
                          <div className="create__input-wrapper">
                            <div className="singel__input-field mb-5">
                              <label className="input__field-text" htmlFor='title'>Category Title</label>
                              <input type="text" name='title' placeholder='Enter Category Title' value={category.title} onChange={onchange} />
                            </div>
                          </div>
                        </div>
                        <div className="event__right-box">
                          <div className="create__input-wrapper">
                            <div className="col-xxl-12 col-xl-12 col-lg-12">
                              <div className="event__input mb-5">
                                <label className="input__field-text" htmlFor='detail'>Category Details</label>
                                <textarea name='detail' placeholder='Enter Category Details' value={category.detail} onChange={onchange}></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button className="input__btn w-100" type="submit" onClick={handleClick}>Add Category</button>
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

export default Addcategory
