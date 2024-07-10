import React, { useState } from 'react'
import "./login.css"
import { Link, useNavigate } from 'react-router-dom'
import { User, Lock } from 'lucide-react'
import { showAlert } from '../../components/alert/Alert'
const Login = () => {
  const [formdata, setFormdata] = useState({ email: '', password: '' })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formdata.email || !formdata.password ) {
      showAlert('error', 'Please fill out all fields.');
      return;
    }

    const regex = /^\S*$/;
    if(!regex.test(formdata.email) || !regex.test(formdata.password)){
      showAlert("error", "Input field can not be blank.");
    }
    // login access for user 
    
    const response = await fetch('http://localhost:5000/api/user/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: formdata.email, password: formdata.password })
    })
    const json = await response.json()
    if (json.success) {
      if(json.role === 'user'){
        localStorage.setItem('usertoken', json.data)
        navigate('/')
        showAlert('success', json.message)
      }else{
        localStorage.setItem('organisertoken', json.data)
        navigate('/organiser')
        showAlert('success', json.message)
      }
    }
    else {
      setFormdata({email: '', password: '' }); 
      showAlert('error', json.message)
    }
  }
  const onchange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }
  return (
    <section className="signin__area" style={{ margin: '10rem 0' }}>
      <div className="sign__main-wrapper shadow-lg">
        <div className="sign__left">
          <div className="sign__header">
            <div className="sign__logo">
              <Link to="/">
                <strong>Event</strong> Management
              </Link>
            </div>
            <div className="sign__link">
              <Link className="sign__link-active" to="/login">Sign in</Link>
              <Link className="sign__link-text" to="/signup">Sign Up</Link>
            </div>
          </div>
          <div className="sign__center-wrapper text-center mt-90">
            <div className="sign__title-wrapper mb-40">
              <h3 className="sign__title">Welcome To Event Management</h3>
              <p>The faster you fill up. the faster you get a ticket</p>
            </div>
            <div className="sign__input-form text-center">
              <form onSubmit={handleSubmit}>
                <div className="sign__input">
                  <input type="text" placeholder="Email" name='email' value={formdata.email} onChange={onchange} />
                  <span><User/></span>
                </div>
                <div className="sign__input">
                  <input type="password" placeholder="Password" name='password' value={formdata.password} onChange={onchange} />
                  <span><Lock/></span>
                </div>
                <div className="sign__action">
                  <div className="sign__forget">
                    <span><Link to="#">Forget Password?</Link></span>
                  </div>
                </div>
                <div className="sing__button mb-20">
                  <button className="input__btn w-100 mb-20" type="submit">Sign in</button>
                </div>
              </form>
              <div className="if__account mt-85">
                <p>Don’t Have An Account?<Link to="/signup"> Sign up</Link></p>
              </div>
            </div>
          </div>
        </div>
        <div className="sign__right">
          <div className="sign__input-thumbLogin">
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
