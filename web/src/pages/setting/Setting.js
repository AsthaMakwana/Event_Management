import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { useNavigate } from 'react-router-dom'
import setting from '../../context/Eventcontext'
import jwtDecode from 'jwt-decode'
import { showAlert } from '../../components/alert/Alert'
import HeaderTop from '../../components/top section/HeaderTop'

const Setting = () => {
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

    const context = useContext(setting)
    const { getuser, updateorganiser, userImage} = context
    const [user, setUser] = useState()
    // setUser()
    let navigate = useNavigate()
    useEffect(() => {
        const fetchuserdata = async () => {
            try {
                const userdata = await getuser();
                const usertoken = localStorage.getItem('organisertoken')
                const userid = jwtDecode(usertoken)
                const currentUser = userdata.find(element => element._id === userid.user.id);
                if (currentUser) {
                    setUser(currentUser);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchuserdata()
    }, [])
    // console.log(user)
    const handleClick = async (e) => {
        e.preventDefault()

        if(!user.fname || !user.lname || !user.email || !user.country || !user.contactno || !user.gender || !user.detail || !user.image){
            showAlert('error','Please fill out all fields.')
            return
        }      

        const regex = /^\S*$/
        if(!regex.test(user.fname) || !regex.test(user.lname) || !regex.test(user.email) || !regex.test(user.contactno) || !regex.test(user.detail)){
            showAlert('error','Input Field can not be blank')
            return 
        }
        console.log(user.image)
        // userImage(user._id,user.image)
        updateorganiser(user._id, user.fname, user.lname, user.email, user.country, user.contactno, user.gender, user.detail, user.image)
    }
    const onchange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const convertToBase64 = (e) => {
        console.log(e)
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        console.log(reader.result)
        reader.onload = () => {
            setUser({ ...user, image: reader.result })
        }
        reader.onerror = (error) => {
            console.log('error:', error)
        }
    }
    return (
        <>
            <div className="offcanvas__overlay"></div>
            <div className="offcanvas__overlay-white"></div>
            <div className="page__full-wrapper">
                <Navbar handleArrowClick={handleArrowClick} showMenu={showMenu} arrow={arrow} arrowE={arrowE} handleArrowEClick={handleArrowEClick} />
                <div className='page__body-wrapper'>
                    <Header handleSidebarBtnClick={handleSidebarBtnClick} handleDropdown={handleDropdown} dropdown={dropdown} showMenu={showMenu} />
                    <div className="app__slide-wrapper">
                        <HeaderTop text={'Account Setting'} style={'invisible'} />

                        <div className="row">
                            <div className="col-xxl-12">
                                <div className="create__event-area shadow-lg my-4">
                                    <div className="body__card-wrapper">
                                        <div className="card__header-top">
                                            <div className="card__title-inner">
                                                <h4 className="event__information-title">Account Information</h4>
                                            </div>
                                        </div>
                                        {user && <form action="">
                                            <div className="create__event-main pt-25 row-gap-4">
                                                <div className="singel__input-field ">
                                                    <label htmlFor='fname' className="input__field-text">First Name</label>
                                                    <input type="text" name='fname' value={user.fname && user.fname} onChange={onchange} placeholder='Enter your first name' />
                                                </div>
                                                <div className="singel__input-field ">
                                                    <label htmlFor='lname' className="input__field-text">Last Name</label>
                                                    <input name='lname' onChange={onchange} value={user.lname && user.lname} type="text" placeholder='Enter your last name'/>
                                                </div>
                                                <div className="singel__input-field ">
                                                    <label htmlFor='email' className="input__field-text">Email</label>
                                                    <input name='email' onChange={onchange} value={user.email && user.email} type="email" placeholder= 'Enter your mail'/>
                                                </div>
                                                <div className="singel__input-field ">
                                                    <label htmlFor='contact' className="input__field-text">Contact Number</label>
                                                    <div className="input__number">
                                                        <div className="singel__input-field mb-15">
                                                            <div className="input__number-lang">
                                                                <div className="contact__select">
                                                                    <select onChange={onchange} value={user.country && user.country} name='country'>
                                                                        <option>Select the country</option>
                                                                        <option value={'India(+91)'}>India(+91)</option>
                                                                        <option value={'UK(+44)'}>UK(+44)</option>
                                                                        <option value={'USA(+1)'}>USA(+1)</option>
                                                                        <option value={'Australia(+61)'}>Australia(+61)</option>
                                                                        <option value={'Italy(+39)'}>Italy(+39)</option>
                                                                    </select>
                                                                </div>
                                                                <div className="input__tel">
                                                                    <input name='contactno' onChange={onchange} value={user.contactno && user.contactno} type="tel" placeholder='Enter your number'/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="singel__input-field ">
                                                    <label htmlFor='contact' className="input__field-text">Gender</label>
                                                    <div className="contact__select">
                                                        <select onChange={onchange} value={user.gender && user.gender} name='gender'>
                                                            <option>select the gender</option>
                                                            <option value={'Male'}>Male</option>
                                                            <option value={'Female'}>Female</option>
                                                            <option value={'Other'}>Other</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="event__input">
                                                    <label htmlFor='detail' className="input__field-text">About Your Self</label>
                                                    <textarea name='detail' onChange={onchange} value={user.detail && user.detail} placeholder='Enter your self'></textarea>
                                                </div>
                                                <div className="popup__update pt-0 mb-5">
                                                    <label>Upload Image ( 200x200px )</label>
                                                    <input type="file" name='image' onChange={convertToBase64} accept="image/*" />
                                                </div>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <button className="input__btn w-50" type="submit" onClick={handleClick}>Update Profile</button>
                                                </div>
                                            </div>
                                        </form>}
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

export default Setting
