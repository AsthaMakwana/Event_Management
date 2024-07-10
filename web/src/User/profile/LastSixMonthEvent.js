import React, { useContext, useState, useEffect } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import Paper from "@mui/material/Paper";
import SearchBar from "material-ui-search-bar";
import eventdata from '../../context/Eventcontext'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
const LastSixMonthEvent = () => {
    const context = useContext(eventdata)
    const { userfetchevent } = context
    const [lastsixmonthevent, setLastsixmonthevent] = useState([])
    // event table
    const [row, setRow] = useState(lastsixmonthevent)
    const [pg, setpg] = useState(0);
    const [rpg, setrpg] = useState(10);
    const [searched, setSearched] = useState("");

    useEffect(() => {
        const eventdata = async () => {
            const data = await userfetchevent();
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
            const filteredData = data.filter((e) => {
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
    return (
        <>
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
                                                    <span><Link to={`/eventdetail/${event._id}`}><Eye absoluteStrokeWidth /></Link></span>
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
        </>
    )
}

export default LastSixMonthEvent
