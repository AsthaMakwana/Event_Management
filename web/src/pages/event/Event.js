import React, { useState, useRef, useContext, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { showAlert } from '../../components/alert/Alert'
import { useNavigate } from 'react-router-dom'
import "./event.css"
import eventValue from '../../context/Eventcontext'
import Eventitem from './Eventitem';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import Paper from "@mui/material/Paper";
import SearchBar from "material-ui-search-bar";
import jwtDecode from 'jwt-decode';
import HeaderTop from '../../components/top section/HeaderTop';

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

const Event = () => {
  const ref = useRef(null)
  const refclose = useRef(null)
  const refdelete = useRef(null)
  const refdeleteclose = useRef(null)
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
    // console.log('hello')
    setdropdown((prevShowMenu) => !prevShowMenu);
  }
  const handleSidebarBtnClick = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const context = useContext(eventValue)
  const { events, getevent, editevent, getcategory, getsponser,deletevent } = context
  const [event, setEvent] = useState({ id: '', ename: '', edetail: '', elocation: '', estdate: '', eendate: '', econtact: '', eimage: '', enoticket: '', eprice: '', ecategory: '', esponser: '' })
  const [catg, setCatg] = useState([])
  const [spn, setSpn] = useState([])
  let navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('organisertoken')) {
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
      fetchSponserData();
      fetchCategoryData();
      getcategory();
      getsponser();
    } else {
      alert('error')
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);
  useEffect(()=>{
    getevent();
  },[events])
  const updateEvent = (currentEvent) => {
    ref.current.click()
    setEvent({
      id: currentEvent._id, ename: currentEvent.eventName, edetail: currentEvent.eventDescription, elocation: currentEvent.eventLocation, estdate: currentEvent.eventStDate, eendate: currentEvent.eventEndDate, econtact: currentEvent.contact, eimage: currentEvent.image, enoticket: currentEvent.noOfTicket, eprice: currentEvent.totalPrice, ecategory: currentEvent.category, esponser: currentEvent.sponser
    })
  }
  const handleClick = () => {
    refclose.current.click()

    const regex = /^\S*$/;
    if(!regex.test(event.ename) || !regex.test(event.edetail) || !regex.test(event.elocation) || !regex.test(event.econtact)){
      showAlert("error", "Input field can not be blank.");
    }

    const categorydata = catgdecodedDataArray.filter((val) => {
      return val === event.ecategory
    })
    if (categorydata.length > 0) {
      localStorage.setItem('categoryid', categorydata);
    } else {
      console.log('No matching category found');
    }
    const sponserdata = spndecodedDataArray.filter((val) => {
      return val === event.esponser
    })
    if (sponserdata.length > 0) {
      localStorage.setItem('sponserid', sponserdata);
    } else {
      console.log('No matching category found');
    }
    editevent(event.id, event.ename, event.edetail, event.elocation, event.estdate, event.eendate, event.econtact, event.eimage, event.enoticket, event.eprice, event.ecategory, event.esponser)
  }
  const onchange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value })
  }

  // for image

  const convertToBase64 = (e) => {
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setEvent({ ...event, eimage: reader.result })
    }
    reader.onerror = (error) => {
      console.log('error:', error)
    }
  }

  // delete event

  const handledeleteEvent = (currentEvent) => {
    refdelete.current.click()
    setEvent({
      id: currentEvent._id, ename: currentEvent.eventName, edetail: currentEvent.eventDescription, elocation: currentEvent.eventLocation, estdate: currentEvent.eventStDate, eendate: currentEvent.eventEndDate, econtact: currentEvent.contact, eimage: currentEvent.image, enoticket: currentEvent.noOfTicket, eprice: currentEvent.totalPrice, ecategory: currentEvent.category, esponser: currentEvent.sponser
    })
}
const delevent = ()=>{
  refdeleteclose.current.click()
  deletevent(event.id)
  localStorage.removeItem('categoryid')
  localStorage.removeItem('sponserid')
}
  // event table
  const [row, setRow] = useState(events)
  const [pg, setpg] = useState(0);
  const [rpg, setrpg] = useState(10);
  const [searched, setSearched] = useState("");

  // for sorting category list descending order(to see recent event first)

  events.sort((a, b) => new Date(b.date) - new Date(a.date))
  useEffect(() => {
    setRow(events);
  }, [events]);      

  const requestSearch = (searchedVal) => {
    const filteredRows = events.filter((event) => {
      return event.eventName.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRow(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }
  return (
    <>
      <div className="offcanvas__overlay"></div>
      <div className="offcanvas__overlay-white"></div>
      <div class="modal fade" id="delete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Sponser</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Once a event is deleted, it cannot be recovered.
              Do you want to delete a event?
            </div>
            <div class="modal-footer">
              <button ref={refdeleteclose} type="button" class="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
              <button onClick={delevent} type="button" class="btn btn-primary">delete event</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title" id="exampleModalLabel">Event</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label for="ename" className="form-label text-dark" >Event Title</label>
                <input type="text" className="form-control" id="ename" name='ename' onChange={onchange} placeholder="" value={event.ename} />
              </div>
              <div className="mb-3">
                <label for="edetail" className="form-label text-dark">Event Details</label>
                <textarea className="form-control" id="edetail" name='edetail' onChange={onchange} rows="3" value={event.edetail}></textarea>
              </div>
              <div className="mb-3">
                <label for="eimg" className="form-label text-dark">Add image</label>
                <input className="form-control" onChange={convertToBase64} type="file" id="eimg" name='eimg' />
              </div>
              <div className="mb-3">
                <label for="estdate" className="form-label text-dark" >Start Date</label>
                <input type="date" className="form-control" id="estdate" name='estdate' min={new Date().toISOString().split('T')[0]} onChange={onchange} placeholder="" value={event.estdate} />
              </div>
              <div className="mb-3">
                <label for="endate" className="form-label text-dark" >End Date</label>
                <input type="date" className="form-control" id="eendate" name='eendate' onChange={onchange} min={new Date().toISOString().split('T')[0]} placeholder="" value={event.eendate} />
              </div>
              <div className="mb-3">
                <label for="elocation" className="form-label text-dark">Venu / Address</label>
                <textarea className="form-control" id="elocation" name='elocation' onChange={onchange} rows="3" value={event.elocation}></textarea>
              </div>
              <div className="mb-3">
                <label for="ecategory" className="form-label text-dark">Event Category</label>
                <select className="form-select form-select-sm " onChange={onchange} aria-label="Small select example" name='ecategory' value={event.ecategory}>
                  <option hidden>Open this select menu</option>
                  {catg && catg.map((category) => {
                    return <option value={category._id}>{category.categoryname}</option>
                  })}
                </select>
              </div>
              {/* TODO  */}
              <div className="mb-3">
                <label for="esponser" className="form-label text-dark">Event Sponser</label>
                <select className="form-select form-select-sm" onChange={onchange} aria-label="Small select example" name='esponser' value={event.esponser}>
                  <option hidden>Open this select menu</option>
                  {spn && spn.map((sponser) => {
                    return <option value={sponser._id}>{sponser.sponserName}</option>
                  })}
                </select>
              </div>
              <div className="mb-3">
                <label for="enoticket" className="form-label text-dark" >Total seat</label>
                <input type="tel" className="form-control" id="enoticket" name='enoticket' onChange={onchange} placeholder="" value={event.enoticket} />
              </div>
              <div className="mb-3">
                <label for="eprice" className="form-label text-dark" >Ticket Price</label>
                <input type="tel" className="form-control" id="eprice" name='eprice' onChange={onchange} placeholder="" value={event.eprice} />
              </div>
              {/* TODO  */}
              {/* <div className="mb-3">
                <label for="eemail" className="form-label" >Email</label>
                <input type="email" className="form-control" id="eemail" name='eemail' placeholder="" style={{ background: 'transparent', color: '#fff', borderColor: '#404040' }} />
              </div> */}
              <div className="mb-3">
                <label for="econtact" className="form-label text-dark" >Phone Number</label>
                <input type="tel" className="form-control" id="econtact" name='econtact' onChange={onchange} placeholder="" value={event.econtact} />
              </div>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Event</button>
            </div>
          </div>
        </div>
      </div>
      <div className="page__full-wrapper">
        <Navbar handleArrowClick={handleArrowClick} showMenu={showMenu} arrow={arrow} arrowE={arrowE} handleArrowEClick={handleArrowEClick} />
        <div className='page__body-wrapper'>
          <Header handleSidebarBtnClick={handleSidebarBtnClick} handleDropdown={handleDropdown} dropdown={dropdown} showMenu={showMenu} />
          <div className="app__slide-wrapper">
            <HeaderTop text={'Event List'} btnText={'Add Event'} style={'visible'} redirect={"/organiser/event/addevent"} />
            <button ref={refdelete} type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#delete"></button>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>
            <div className="event__list-area pb-5 mt-5">
              <div className="event__content-inner shadow-lg">
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="day-tab-1-pane" role="tabpanel" aria-labelledby="day-tab-1" tabindex="0">
                    <div className="body__card-wrapper">
                      <h4 className="event__information-title mb-2">Event List</h4>
                      <div className="attendant__wrapper my-5">
                        <Paper>
                          <SearchBar
                            value={searched}
                            onChange={(searchVal) => requestSearch(searchVal)}
                            onCancelSearch={() => cancelSearch()}
                          />
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>ID</TableCell>
                                  <TableCell>Name</TableCell>
                                  <TableCell>Image</TableCell>
                                  <TableCell>Start Date</TableCell>
                                  <TableCell>Total seat</TableCell>
                                  <TableCell>Price</TableCell>
                                  <TableCell>Location</TableCell>
                                  <TableCell>Action</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {row.length === 0 ? <TableCell>No event availabel please add event</TableCell> :
                                  row && row.slice(pg * rpg, pg * rpg + rpg).map((event, index) => {
                                    return <Eventitem index={index} event={event} key={event._id} updateEvent={updateEvent} handledeleteEvent={handledeleteEvent}/>
                                  })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={row.length}
                            rowsPerPage={rpg}
                            page={pg}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                          />
                        </Paper>
                      </div>
                    </div>
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

export default Event;
