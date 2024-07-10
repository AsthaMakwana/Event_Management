import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Lock, Contact, Globe } from 'lucide-react'
import './signup.css'
import { showAlert } from '../../components/alert/Alert'
const Signup = () => {
  const [formdata, setFormdata] = useState({ name: '', email: '', password: '', country: '', contactno: '', role: '' })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formdata.name || !formdata.email || !formdata.password || !formdata.country || !formdata.contactno || !formdata.role) {
      showAlert('error', 'Please fill out all fields.');
      return;
    }

    const regex = /^\S*$/;
    if(!regex.test(formdata.name) || !regex.test(formdata.email) || !regex.test(formdata.password) || !regex.test(formdata.country) || !regex.test(formdata.contactno) || !regex.test(formdata.role)){
      showAlert("error", "Input field can not be blank.");
    }

    // create user 

    const response = await fetch("http://localhost:5000/api/user/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fname: formdata.name, email: formdata.email, password: formdata.password, country: formdata.country, contactno: formdata.contactno, role: formdata.role })
    })
    const json = await response.json()
    console.log(json)
    if (json.success) {
      if(json.role==='user'){
        localStorage.setItem('usertoken', json.data)
        navigate('/')
        showAlert('success',json.message)
      }else{
        localStorage.setItem('organisertoken',json.data)
        navigate('/organiser')
        showAlert('success',json.message)
      }
    }
    else {
      // setFormdata({ name: '', email: '', password: '', country: '', contactno: '', role: '' })
      showAlert('error',json.message)
    }

  }
  const onchange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }
  return (
    <div id='signup'>
      <section className="signin__area">
        <div className="sign__main-wrapper shadow-lg">
          <div className="sign__left">
            <div className="sign__header">
              <div className="sign__logo">
                <Link to="/">
                  <strong>Event</strong> Management
                </Link>
              </div>
              <div className="sign__link">
                <Link className="sign__link-text" to="/login">Sign in</Link>
                <Link className="sign__link-active" to="/signup">Sign Up</Link>
              </div>
            </div>
            <div className="sign__center-wrapper text-center mt-80">
              <div className="sign__title-wrapper mb-40">
                <h3 className="sign__title">Create An Account</h3>
                <p>The faster you fill up. the faster you get a ticket</p>
              </div>
              <div className="sign__input-form text-center">
                <form onSubmit={handleSubmit}>
                  <div className="sign__input">
                    <input type="text" name='name' onChange={onchange} value={formdata.name} placeholder="User Name" />
                    <span><User /></span>
                  </div>
                  <div className="sign__input">
                    <input type="email" name='email' onChange={onchange} value={formdata.email} placeholder="Email Address" />
                    <span><User /></span>
                  </div>
                  <div className="sign__input">
                    <input type="password" name='password' onChange={onchange} value={formdata.password} placeholder="Enter Password" />
                    <span><Lock /></span>
                  </div>
                  <div className="contact__select country mb-4">
                    <span style={{position: 'absolute',top: '14px',insetInlineStart: '20px',zIndex:'1'}}><Globe  /></span>
                    <select onChange={onchange} value={formdata.country} name='country' className='border-white m-0' id='country' style={{color:'#000',width:'100%',height: '60px',paddingInlineStart: '50px',paddingInlineEnd: '20px'}}>
                      <option>Select the country</option>
                      <option value={'India(+91)'}>India(+91)</option>
                      <option value={'UK(+44)'}>UK(+44)</option>
                      <option value={'USA(+1)'}>USA(+1)</option>
                      <option value={'Australia(+61)'}>Australia(+61)</option>
                      <option value={'Italy(+39)'}>Italy(+39)</option>
                    </select>
                  </div>
                  <div className="sign__input">
                    <input type="tel" name='contactno' value={formdata.contactno} onChange={onchange} placeholder="Enter Phone Number" />
                    <span><Contact /></span>
                  </div>
                  <div className="contact__select country mb-4">
                    <span style={{position: 'absolute',top: '14px',insetInlineStart: '20px',zIndex:'1'}}><User/></span>
                    <select onChange={onchange} value={formdata.role} name='role' className='border-white m-0' id='country' style={{color:'#000',width:'100%',height: '60px',paddingInlineStart: '50px',paddingInlineEnd: '20px'}}>
                      <option>Select the Role</option>
                      <option value={'user'}>User</option>
                      <option value={'organizer'}>Organizer</option>
                    </select>
                  </div>
                  {/* <div className="sign__input">
                    <input type="text" name='role' onChange={onchange} value={formdata.role} placeholder="Enter Role" />
                    <span><User/></span>
                  </div> */}
                  <div className="sing__button mb-20">
                    <button className="input__btn w-100 mb-20" type="submit">Sign Up</button>
                  </div>
                </form>
                <div className="if__account mt-90">
                  <p>Already have an account? <Link to="/login">Sign in</Link></p>
                </div>
              </div>
            </div>
          </div>
          <div className="sign__right">
            <div className="sign__input-thumbSignup include__bg w-img ">
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Signup
