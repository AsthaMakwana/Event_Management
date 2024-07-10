import React, { useContext, useEffect, useState } from 'react'
import CalendarCompo from '../../components/calender-compo/CalenderCompo'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import HeaderTop from '../../components/top section/HeaderTop'
import './calendar.css'
import { Link } from 'react-router-dom'
import { Eye } from 'lucide-react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import Paper from "@mui/material/Paper";
import SearchBar from "material-ui-search-bar";
import calendarData from '../../context/Eventcontext'

const Calendar = () => {

  // handle dropdown of header and navbar 

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
    setdropdown((prevShowMenu) => !prevShowMenu);
  }
  const handleSidebarBtnClick = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  // convert mongo db date into 'day-month-year' format 
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
  }

  // convert local date into 'day-month-year' format 

  function selectdateformate(date) {
    const inputDate = new Date(date);
    const day = (inputDate.getDate()).toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const year = inputDate.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const context = useContext(calendarData)
  const { events, selectDate, getcategory, getsponser } = context
  const [selectEvent, setSelectEvent] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [category, setCategory] = useState([])
  const [sponser,setSponser] = useState([])

  // fetch event data 

  useEffect(() => {
    setSelectEvent(events)
  }, [events])

  // filtered event data from selected date 

  useEffect(() => {
    if (selectDate) {
      const filtered = selectEvent.filter((event) => {
        if (formatDate(event.eventStDate) === selectdateformate(selectDate)) {
          return true
        }
        else {
          return false
        }
      });
      setFilteredEvents(filtered);
      const fetchcategoryData = async () => {
        try {
          const categorydata = await getcategory()
          setCategory(categorydata)
        }
        catch (err) {
          console.log(err)
        }
      }
      fetchcategoryData()
      const fetchsponserData = async () => {
        try {
          const sponserdata = await getsponser()
          setSponser(sponserdata)
        }
        catch (err) {
          console.log(err)
        }
      }
      fetchsponserData()
    } else {
      setFilteredEvents([]);
    }
  }, [selectDate, selectEvent]);

  // fetch category name form the filtered Event data 

  const fetchcategoryname = (id) => {
    const name = category.find((c)=>c._id===id)
    return name ? name.categoryname : 'event hase no category'
  }

  // fetch sponser name form the filtered Event data 

  const fetchsponsername = (id) => {
    const name = sponser.find((s)=>s._id===id)
    return name ? name.sponserName: 'event hase no sponser'
  }

  // table data 

  const [row, setRow] = useState(filteredEvents)
  const [pg, setpg] = useState(0);
  const [rpg, setrpg] = useState(10);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    setRow(filteredEvents);
  }, [filteredEvents]);

  const requestSearch = (searchedVal) => {
    const filteredRows = filteredEvents.filter((event) => {
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
  const handleviewEvent = (id) => {
    localStorage.setItem('eventdetail', id)
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
            <HeaderTop text={'Event Calender'} style={'invisible'} />
            <CalendarCompo />
            {selectDate ?
              <div className="attendant__wrapper my-5 shadow-lg border-0">
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
                          <TableCell>Category</TableCell>
                          <TableCell>Sponser</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.length === 0 ? <TableCell>No Event Availabel on this date</TableCell> :
                          row && row.slice(pg * rpg, pg * rpg + rpg).map((event, index) => {
                            return (<tr>
                              <td>
                                <div className="attendant__serial">
                                  <span>{index + 1}</span>
                                </div>
                              </td>
                              <td>
                                <div className="attendant__seminer">
                                  <span><Link>{event.eventName}</Link></span>
                                </div>
                              </td>
                              <td>
                                <div className="attendant__seminer">
                                  <span><Link>{fetchcategoryname(event.category)}</Link></span>
                                </div>
                              </td>
                              <td>
                                <div className="attendant__seminer">
                                  <span><Link>{fetchsponsername(event.sponser)}</Link></span>
                                </div>
                              </td>
                              <td>
                                <div className="attendant__action">
                                  <span onClick={() => handleviewEvent(event._id)}><Link to={`/organiser/event/eventdetailm`}><Eye absoluteStrokeWidth /></Link></span>
                                </div>
                              </td>
                            </tr>)
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
              : <div className='p-2 mx-auto'>Please Select Date</div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Calendar
