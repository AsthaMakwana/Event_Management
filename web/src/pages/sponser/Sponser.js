import React, { useState, useRef, useContext, useEffect } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import Paper from "@mui/material/Paper";
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { Link, useNavigate } from 'react-router-dom'
import sponserValue from '../../context/Eventcontext'
import Sponseritem from './Sponseritem';
import { Home } from 'lucide-react'
import jwtDecode from 'jwt-decode';
import jwtEncode from 'jwt-encode'
import SearchBar from "material-ui-search-bar";
import { showAlert } from '../../components/alert/Alert';
import HeaderTop from '../../components/top section/HeaderTop';
const JWT_SECRET = 'Abhiisgoodb@oy'

const Sponser = () => {
  const ref = useRef(null)
  const refclose = useRef(null)
  const refdelete = useRef(null)
  const refdeleteclose = useRef(null)
  const context = useContext(sponserValue)
  const { sponseres, getsponser, editsponser, deletesponser } = context
  const [showMenu, setShowMenu] = useState(false);
  const [arrow, setarrow] = useState(false)
  const [arrowE, setarrowE] = useState(false)
  const [dropdown, setdropdown] = useState(false)
  const [sponser, setSponser] = useState({ id: '', ename: '', edetail: '', elogo: '' })
  let navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('organisertoken')) {
      getsponser();
    }
    else {
      alert('error')
      navigate('login')
    }
  }, [sponseres])
  // for sorting category list descending order(to see recent event first)

  sponseres.sort((a, b) => new Date(b.date) - new Date(a.date))
  useEffect(() => {
    setRow(sponseres);
  }, [sponseres]);
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
  const handleClick = () => {
    refclose.current.click()

    const regex = /^\S*$/;
    if(!regex.test(sponser.ename)){
      showAlert("error", "Input field can not be blank.");
      return 
    }

    const spndecodedDataArray = [];

    const spnData = JSON.parse(localStorage.getItem('sponserData')) || []
    spnData.forEach(token => {
      try {
        const spndecodedData = jwtDecode(token);
        spndecodedDataArray.push(spndecodedData);
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    });
    const sponserdata = spndecodedDataArray.filter((val) => {
      return val !== sponser.id
    })
    const updatesponserdata = spndecodedDataArray.filter((val) => {
      return val === sponser.id
    })
    if (sponserdata.length >= 0) {
      const jwtData = sponserdata.map(data => jwtEncode(data, JWT_SECRET));
      jwtData.push(jwtEncode(updatesponserdata, JWT_SECRET))
      localStorage.setItem('sponserData', JSON.stringify(jwtData));

    } else {
      console.log('No matching category found');
    }
    editsponser(sponser.id, sponser.ename, sponser.elogo, sponser.edetail)
  }
  const updatesponser = (currentSponser) => {
    ref.current.click()
    console.log(currentSponser)
    setSponser({ id: currentSponser._id, ename: currentSponser.sponserName, edetail: currentSponser.sponserDetail, elogo: currentSponser.sponserLogo })
  }
  const onchange = (e) => {
    setSponser({ ...sponser, [e.target.name]: e.target.value })
  }

  //delete sponser

  const handleDeleteSponser = (currentSponser) => {
    refdelete.current.click()
    setSponser({ id: currentSponser._id, ename: currentSponser.sponserName, edetail: currentSponser.sponserDetail, elogo: currentSponser.sponserLogo })
  }
  const delsponser = () => {
    refdeleteclose.current.click()
    const spndecodedDataArray = [];

    const spnData = JSON.parse(localStorage.getItem('sponserData')) || []
    spnData.forEach(token => {
      try {
        const spndecodedData = jwtDecode(token);
        spndecodedDataArray.push(spndecodedData);
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    });
    const sponserdata = spndecodedDataArray.filter((val) => {
      return val !== sponser.id
    })
    if (sponserdata.length > 0) {
      const jwtData = sponserdata.map(data => jwtEncode(data, JWT_SECRET));
      localStorage.setItem('sponserData', JSON.stringify(jwtData));

    }
    else if (sponserdata.length === 0) {
      localStorage.removeItem("sponserData");
    } else {
      console.log('No matching category found');
    }
    deletesponser(sponser.id)
  }

  // for image 
  
  const convertToBase64 = (e) => {
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setSponser({ ...sponser, elogo: reader.result })
    }
    reader.onerror = (error) => {
      console.log('error:', error)
    }
  }
  // sponser table
  const [row, setRow] = useState(sponseres)
  const [pg, setpg] = useState(0);
  const [rpg, setrpg] = useState(10);
  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = sponseres.filter((sponser) => {
      return sponser.sponserName.toLowerCase().includes(searchedVal.toLowerCase());
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
              Once a Sponser is deleted, it cannot be recovered.
              Do you want to delete a sponser?
            </div>
            <div class="modal-footer">
              <button ref={refdeleteclose} type="button" class="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
              <button onClick={delsponser} type="button" class="btn btn-primary">delete sponser</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title" id="exampleModalLabel">Sponser</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="ename" className="form-label text-dark" >Sponser Title</label>
                <input type="email" className="form-control" id="ename" name='ename' onChange={onchange} placeholder="" value={sponser.ename} />
              </div>
              <div className="mb-3">
                <label htmlFor="edetail" className="form-label text-dark">Sponser Details</label>
                <textarea className="form-control" id="edetail" name='edetail' onChange={onchange} rows="3" value={sponser.edetail}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="elogo" className="form-label text-dark">Add image</label>
                <input className="form-control" type="file" id="elogo" name='elogo' onChange={convertToBase64} />
              </div>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Sponser</button>
            </div>
          </div>
        </div>
      </div>
      <div className="page__full-wrapper">
        <Navbar handleArrowClick={handleArrowClick} showMenu={showMenu} arrow={arrow} arrowE={arrowE} handleArrowEClick={handleArrowEClick} />
        <div className='page__body-wrapper'>
          <Header handleSidebarBtnClick={handleSidebarBtnClick} handleDropdown={handleDropdown} dropdown={dropdown} showMenu={showMenu} />
          <div className="app__slide-wrapper">
            <HeaderTop text={'Sponser List'} btnText={'Add Sponser'} style={'visible'} redirect={"/organiser/event/sponser/addsponser"} />
            <button ref={refdelete} type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#delete"></button>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Launch demo modal
            </button>
            <div className="event__list-area pb-5 mt-5">
              <div className="event__content-inner shadow-lg">
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="day-tab-1-pane" role="tabpanel" aria-labelledby="day-tab-1" tabIndex="0">
                    <div className="body__card-wrapper">
                      <h4 className="event__information-title mb-3">Sponser List</h4>
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
                                  <TableCell>Description</TableCell>
                                  <TableCell>Action</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {row.length === 0 ? <TableCell>No sponser availabel please add sponser</TableCell> :
                                  row && row.slice(pg * rpg, pg * rpg + rpg).map((sponser, index) => {
                                    return <Sponseritem index={index} sponser={sponser} key={sponser._id} updatesponser={updatesponser} handleDeleteSponser={handleDeleteSponser} />
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

export default Sponser
