import React, { useContext, useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import events from '../../context/Eventcontext'
import { Eye } from 'lucide-react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import Paper from "@mui/material/Paper";
import { useNavigate, Link } from 'react-router-dom';
const UserPurchased = () => {
    const [date, setDate] = useState(new Date())
    const context = useContext(events)
    const { fetchpurchaseevent, userfetchevent } = context
    const [event, setEvent] = useState([])
    const [bookevent, setBookEvent] = useState([])
    let navigate = useNavigate()
    useEffect(() => {
        if (bookevent) {
            const fetchData = async () => {
                try {
                    const response = await fetchpurchaseevent();
                    setBookEvent(response.data);
                } catch (error) {
                    console.error('Error fetching purchase events:', error);
                    navigate('/login');
                }
            };
            fetchData();
            const fetchUserEvents = async () => {
                try {
                    const data = await userfetchevent();
                    setEvent(data);
                } catch (error) {
                    console.error('Error fetching user events:', error);
                }
            };

            fetchUserEvents();
        } else {
            alert('Please login first.');
            navigate('/login');
        }
    }, []);

    const [row, setRow] = useState(bookevent)
    const [pg, setpg] = useState(0);
    const [rpg, setrpg] = useState(10);

    // Sorting purchase events when they change
    bookevent.sort((a, b) => new Date(b.date) - new Date(a.date));
    useEffect(() => {
        setRow(bookevent);
    }, [bookevent]);

    function handleChangePage(event, newpage) {
        setpg(newpage);
    }

    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }
    // console.log(bookevent)

    const fetcheventimage = (id) => {
        const eventimage = event.find((e) => e._id === id)
        return eventimage ? eventimage.image : 'not found'
    }

    const fetcheventname = (id) => {
        const name = event.find((e) => e._id === id)
        return name ? name.eventName : 'not found'
    }
    const fetchprice = (id)=>{
        const name = event.find((e) => e._id === id)
        return name ? name.totalPrice : 'not found'
    }
    return (
        <>
            <div className="purchased-tab-content pt-5">
                <div className="container shadow p-5">
                    <div className="purchased">
                        <h5 className="ed-subtitle">Purchased Event</h5>
                        <div className="tabel my-4">
                            <Paper>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ID</TableCell>
                                                <TableCell>Event Name</TableCell>
                                                <TableCell>Event Image</TableCell>
                                                <TableCell>User Name</TableCell>
                                                <TableCell>Price</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row && row.length === 0 ? <TableCell>No purchase event availabel please book event</TableCell> :
                                                row && row.slice(pg * rpg, pg * rpg + rpg).map((purchaseevent, index) => {
                                                    if (event) {
                                                        return <>
                                                            <tr>
                                                                <td>
                                                                    <div className="attendant__serial">
                                                                        <span>{index + 1}</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="attendant__seminer">
                                                                        <span><a href="">{fetcheventname(purchaseevent.event)}</a></span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="attendant__speakers">
                                                                        <div className="attendant__speakers-thumb">
                                                                            <img src={fetcheventimage(purchaseevent.event)} alt="image not found" />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="attendant__seminer_decription">
                                                                        <span><a href="">{purchaseevent && purchaseevent.name}</a></span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="attendant__seminer_decription">
                                                                        <span><a href="">{fetchprice(purchaseevent.event)}</a></span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="attendant__seminer_decription">
                                                                        <span><a href="">{purchaseevent && purchaseevent.quantity}</a></span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="attendant__action d-flex gap-2">
                                                                        <span ><Link to={`/eventdetail/${purchaseevent.event}`}><Eye absoluteStrokeWidth /></Link></span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    }
                                                    else {
                                                        return null
                                                    }
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
                    <div className="calendar my-5">
                        <div className="h-100">
                            <h5 className="ed-subtitle">Calendar view</h5>
                            <div className='calendar-container d-flex justify-content-center my-4'>
                                <Calendar onChange={setDate} value={date} className='shadow-none' style={{ fontSize: '15px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserPurchased
