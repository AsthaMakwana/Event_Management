import React,{useState,useContext,useEffect} from 'react'
import profileupdate from '../../context/Eventcontext'
import jwtDecode from 'jwt-decode'
import { showAlert } from '../../components/alert/Alert'

const UpdateProfile = () => {
    const context = useContext(profileupdate)
    const { getuser, updateuser} = context
    const [user, setUser] = useState()
    // setUser()
    useEffect(() => {
        const fetchuserdata = async () => {
            try {
                const userdata = await getuser();
                const usertoken = localStorage.getItem('usertoken')
                const userid = jwtDecode(usertoken)
                const currentUser = userdata.find(element => element._id === userid.user.id);
                if (currentUser) {
                    setUser(currentUser);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchuserdata()
    }, [])

    const handleClick = async (e) => {
        e.preventDefault()

        // if(!user.fname || !user.lname || !user.email || !user.country || !user.contactno || !user.gender || !user.detail || !user.image){
        //     showAlert('error','Please fill out all fields.')
        //     return
        // }      

        // const regex = /^\S*$/
        // if(!regex.test(user.fname) || !regex.test(user.lname) || !regex.test(user.email) || !regex.test(user.contactno) || !regex.test(user.detail)){
        //     showAlert('error','Input Field can not be blank')
        //     return 
        // }

        updateuser(user._id, user.fname, user.lname, user.email, user.country, user.contactno, user.gender, user.detail, user.image)
    }
    const onchange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const convertToBase64 = (e) => {
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setUser({ ...user, image: reader.result })
        }
        reader.onerror = (error) => {
            console.log('error:', error)
        }
    }
    return (
        <>
            <div className="edit-tab-content pt-5">
                <div className="container">
                    <div className="comment-form m-0 shadow">
                        <h5 className="ed-subtitle">Edit Your Profile</h5>
                        <form action="#" id="comment-form">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="primary-input-group">
                                        <input type="text" id="name" name='fname' value={user && user.fname} onChange={onchange} placeholder="Enter your first name" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="primary-input-group">
                                        <input type="text" name='lname' value={user && user.lname} onChange={onchange} placeholder="Enter your last name" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="primary-input-group">
                                        <input type="email"name='email' value={user && user.email} onChange={onchange} id="email" placeholder="Enter your Email" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="primary-input-group">
                                        <div className="input__number-lang">
                                            <div className="input__tel">
                                                <select name='country' onChange={onchange} value={user && user.country}>
                                                    <option selected disabled hidden>Select the country</option>
                                                    <option value={'India(+91)'}>India(+91)</option>
                                                    <option value={'UK(+44)'}>UK(+44)</option>
                                                    <option value={'USA(+1)'}>USA(+1)</option>
                                                    <option value={'Australia(+61)'}>Australia(+61)</option>
                                                    <option value={'Italy(+39)'}>Italy(+39)</option>
                                                </select>
                                            </div>
                                            <div className="input__tel">
                                                <input name='contactno' value={user && user.contactno} type="tel" placeholder='Enter your phone number' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="primary-input-group">
                                        <select name='gender' onChange={onchange} value={user && user.gender}>
                                            <option selected disabled hidden>Select the gender</option>
                                            <option value={'male'}>Male</option>
                                            <option value={'female'}>Female</option>
                                            <option value={'other'}>Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="primary-input-group">
                                        <input type="file" name="image" onChange={convertToBase64} id="" accept="image/png, image/jpeg, image/jpg"/>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="primary-input-group">
                                        <textarea name="detail" id="massege" cols="30" rows="7"
                                            placeholder="Enter about your self" onChange={onchange} value={user && user.detail}></textarea>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="submit-btn">
                                        <button type="submit" className="primary-submit" onClick={handleClick}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile
