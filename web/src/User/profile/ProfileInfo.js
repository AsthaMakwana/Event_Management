import React,{useContext,useEffect,useState} from 'react'
import jwtDecode from 'jwt-decode'
import userdetail from '../../context/Eventcontext'

const ProfileInfo = () => {
    const context = useContext(userdetail)
    const { getuser } = context
    const [user, setUser] = useState()
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
          console.error("Error fetching profile:", error);
        }
      };
      fetchuserdata()
    }, [user])
  return (
    <>
      <div className="details-tab-content pt-5">
                    <div className="container shadow p-5">
                      <h2 className='ed-subtitle mb-5'>Profile Information</h2>
                      <div className="row ">
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 mb-3">
                          <div className="img d-flex justify-content-center align-items-center">
                            <img src={user && user.image ? user.image :'https://i.stack.imgur.com/l60Hf.png'} alt="img" className='img-fluid h-75 rounded w-75' />
                          </div>
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12">
                          <div className="container">
                            <div className="fname my-2">
                              <span className='me-2'> <b>First Name : </b></span> {user && user.fname ? user.fname : 'updated your profile'}
                            </div>
                            <hr />
                            <div className="lname my-2">
                              <span className='me-2'><b>Last Name : </b></span> {user && user.lname ? user.lname : 'updated your profile'}
                            </div>
                            <hr />
                            <div className="email my-2">
                              <span className='me-2'><b>Email : </b></span> {user && user.email ? user.email : 'updated your profile'}
                            </div>
                            <hr />
                            <div className="contact my-2">
                              <span className='me-2'><b>Phone no : </b></span> {user && user.contactno ? user.contactno : 'updated your profile'}
                            </div>
                            <hr />
                            <div className="country_profile my-2">
                              <span className='me-2'><b>Country : </b></span> {user && user.country ? user.country : 'updated your profile'}
                            </div>
                            <hr />
                            <div className="gender_profile my-2">
                              <span className='me-2'><b>gender : </b></span> {user && user.gender ? user.gender : 'updated your profile'}
                            </div>
                            <hr />
                            <div className="info_profile my-2">
                              <span className='me-2'><b>Detail : </b></span> {user && user.detail ? user.detail : 'updated your profile'}
                            </div>
                            <hr />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
    </>
  )
}

export default ProfileInfo
