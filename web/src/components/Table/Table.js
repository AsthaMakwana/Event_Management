import React, { useState, useEffect, useContext } from 'react'
import './table.css'
import { Ticket, Eye } from 'lucide-react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import Paper from "@mui/material/Paper";
import SearchBar from "material-ui-search-bar";
import moment from 'moment';
import userdata from '../../context/Eventcontext'
import { Link } from 'react-router-dom';
const List = () => {
  const context = useContext(userdata)
  const { getevent } = context
  const [lastsixmonthevent, setLastsixmonthevent] = useState([])
  // event table
  const [row, setRow] = useState(lastsixmonthevent)
  const [pg, setpg] = useState(0);
  const [rpg, setrpg] = useState(10);
  const [searched, setSearched] = useState("");
  useEffect(() => {
    const eventdata = async () => {
      const data = await getevent();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      const filteredData = data && data.filter((e) => {
        const eventDate = new Date(e.eventStDate)
        const currentDate = new Date()
        return eventDate >= sixMonthsAgo && eventDate <= currentDate;
      })
      setLastsixmonthevent(filteredData)
    }
    eventdata();
  }, [])

  // for sorting category list descending order(to see recent event first)
  useEffect(() => {
    lastsixmonthevent.sort((a, b) => new Date(b.date) - new Date(a.date))
    setRow(lastsixmonthevent);
  }, [lastsixmonthevent]);

  const requestSearch = (searchedVal) => {
    const filteredRows = lastsixmonthevent.filter((event) => {
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
    localStorage.setItem('eventdetail',id)
  }
  return (
    <div className="card__wrappertable shadow-lg p-4 mb-4">
      <div className="card__header">
        <div className="card__header-top mb-5">
          <div className="card__title-inner">
            <div className="card__header-icon" style={{ marginBottom: '10px', marginRight: '10px' }}>
              <Ticket absoluteStrokeWidth size={30} />
            </div>
            <div className="card__header-title">
              <h4 style={{ fontSize: '1.2rem' }}>Last Six Months Events</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="attendant__wrapper mb-20">
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
                    return <>
                      <tr>
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
                          <div className="attendant__speakers">
                            <div className="attendant__speakers-thumb">
                              <img src={event.image} alt='img not found' />
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="attendant__time">
                            <span>{moment(event.eventStDate).format('MMMM Do YYYY')}</span>
                          </div>
                        </td>
                        <td>
                          <div className="attendant__date">
                            <span>{event.noOfTicket}</span>
                          </div>
                        </td>
                        <td>
                          <div className="attendant__location">
                            <span>{event.totalPrice}</span>
                          </div>
                        </td>
                        <td>
                          <div className="attendant__location">
                            <span>{event.eventLocation}</span>
                          </div>
                        </td>
                        <td>
                          <div className="attendant__action d-flex gap-2">
                            <span onClick={handleviewEvent(event._id)}><Link to={`/organiser/event/eventdetailm`}><Eye absoluteStrokeWidth /></Link></span>
                          </div>
                        </td>
                      </tr>
                    </>
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

  )
}

export default List
