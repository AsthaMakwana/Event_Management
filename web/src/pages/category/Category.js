import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { useNavigate } from 'react-router-dom'
import Categoryitem from './Categoryitem';
import CategoryValue from '../../context/Eventcontext'
import Alert, { showAlert } from '../../components/alert/Alert'
import jwtDecode from 'jwt-decode';
import jwtEncode from 'jwt-encode'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import Paper from "@mui/material/Paper";
import SearchBar from "material-ui-search-bar";
import HeaderTop from '../../components/top section/HeaderTop';
const JWT_SECRET = 'Abhiisgoodb@oy'

const Category = () => {


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
    console.log('hello')
    setdropdown((prevShowMenu) => !prevShowMenu);
  }
  const handleSidebarBtnClick = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const ref = useRef(null)
  const refclose = useRef(null)
  const refdelete = useRef(null)
  const refdeleteclose = useRef(null)
  const context = useContext(CategoryValue)
  const { categorys, getcategory, editcategory, deletecategory } = context
  const [catgory, setCatgory] = useState({ id: '', etitle: '', edetail: '' })
  let navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('organisertoken')) {
      getcategory();
    }
    else {
      alert('error')
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [categorys])

  // for sorting category list descending order(to see recent event first)

  categorys.sort((a, b) => new Date(b.date) - new Date(a.date))

  const handleClick = () => {
    refclose.current.click()

    const regex = /^\S*$/;
    if (!regex.test(catgory.etitle) || !regex.test(catgory.edetail)) {
      showAlert("error", "Input field can not be blank.");
      return 
    }

    const catgdecodedDataArray = [];

    const catgData = JSON.parse(localStorage.getItem('categoryData')) || []
    catgData.forEach(token => {
      try {
        const catgdecodedData = jwtDecode(token);
        catgdecodedDataArray.push(catgdecodedData);
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    });
    console.log(catgdecodedDataArray)
    const categorydata = catgdecodedDataArray.filter((val) => {
      return val !== catgory.id
    })
    const updatecategorydata = catgdecodedDataArray.filter((val) => {
      return val === catgory.id
    })
    if (categorydata.length >= 0) {
      const jwtData = categorydata.map(data => jwtEncode(data, JWT_SECRET));
      jwtData.push(jwtEncode(updatecategorydata, JWT_SECRET))
      localStorage.setItem('categoryData', JSON.stringify(jwtData));

    } else {
      console.log('No matching category found');
    }
    editcategory(catgory.id, catgory.etitle, catgory.edetail)
  }
  const updateCategory = (currentCategory) => {
    ref.current.click()
    console.log(currentCategory)
    setCatgory({ id: currentCategory._id, etitle: currentCategory.categoryname, edetail: currentCategory.categorydescription })
    console.log(catgory)
  }
  const onchange = (e) => {
    setCatgory({ ...catgory, [e.target.name]: e.target.value })
  }

  // delete category 

  const handleDeleteCategory = (currentCategory) => {
    refdelete.current.click()
    setCatgory({ id: currentCategory._id, etitle: currentCategory.categoryname, edetail: currentCategory.categorydescription })
  }
  const delcategory = () => {
    refdeleteclose.current.click()
    const catgdecodedDataArray = [];
    const catgData = JSON.parse(localStorage.getItem('categoryData')) || []
    catgData.forEach(token => {
      try {
        const catgdecodedData = jwtDecode(token);
        catgdecodedDataArray.push(catgdecodedData);
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    });
    console.log(catgdecodedDataArray)
    const categorydata = catgdecodedDataArray.filter((val) => {
      return val !== catgory.id
    })
    if (categorydata.length > 0) {
      const jwtData = categorydata.map(data => jwtEncode(data, JWT_SECRET))
      localStorage.setItem("categoryData", JSON.stringify(jwtData))
    }
    else if (categorydata.length === 0) {
      localStorage.removeItem("categoryData");
    } else {
      console.log('No matching category found');
    }
    const eventcatg = localStorage.getItem('categoryid')
    catgdecodedDataArray.filter((val) => {
      if (val === eventcatg) {
        localStorage.removeItem('categoryid')
      }
    })
    deletecategory(catgory.id)
  }

  // category table
  const [row, setRow] = useState(categorys)
  const [pg, setpg] = useState(0);
  const [rpg, setrpg] = useState(10);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    setRow(categorys);
  }, [categorys]);

  const requestSearch = (searchedVal) => {
    const filteredRows = categorys.filter((category) => {
      return category.categoryname.toLowerCase().includes(searchedVal.toLowerCase());
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
  // console.log(categorys.slice(pg * rpg, pg * rpg + rpg))
  return (
    <>
      <Alert />
      <div className="offcanvas__overlay"></div>
      <div className="offcanvas__overlay-white"></div>


      <div class="modal fade" id="delete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Category</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Once a category is deleted, it cannot be recovered.
              Do you want to delete a category?
            </div>
            <div class="modal-footer">
              <button ref={refdeleteclose} type="button" class="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
              <button onClick={delcategory} type="button" class="btn btn-primary">delete category</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header" >
              <h1 className="modal-title" id="exampleModalLabel">Category</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label text-dark" >Category Title</label>
                <input type="email" className="form-control" id="etitle" name='etitle' onChange={onchange} placeholder="" value={catgory.etitle} />
              </div>
              <div className="mb-3">
                <label htmlFor="edetail" className="form-label text-dark">Category Details</label>
                <textarea className="form-control" id="edetail" name='edetail' onChange={onchange} rows="3" value={catgory.edetail}></textarea>
              </div>
            </div>
            <div className="modal-footer" >
              <button ref={refclose} type="button" className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Category</button>
            </div>
          </div>
        </div>
      </div>
      <div className="page__full-wrapper">
        <Navbar handleArrowClick={handleArrowClick} showMenu={showMenu} arrow={arrow} arrowE={arrowE} handleArrowEClick={handleArrowEClick} />
        <div className='page__body-wrapper'>
          <Header handleSidebarBtnClick={handleSidebarBtnClick} handleDropdown={handleDropdown} dropdown={dropdown} showMenu={showMenu} />
          <div className="app__slide-wrapper">
            <HeaderTop text={'Category List'} style={'visible'} btnText={'Add Category'} redirect={"/organiser/event/category/addcategory"} />
            <button ref={refdelete} type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#delete"></button>
            <button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>
            <div className="event__list-area pb-5 mt-5">
              <div className="event__content-inner shadow-lg">
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="day-tab-1-pane" role="tabpanel" aria-labelledby="day-tab-1" tabIndex="0">
                    <div className="body__card-wrapper">
                      <h4 className="event__information-title mb-2">Category List</h4>
                      <div className="attendant__wrapper my-5">
                        <Paper>
                          <SearchBar
                            className='my-1'
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
                                  <TableCell>Description</TableCell>
                                  <TableCell>Action</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {row && row.length === 0 ? <TableCell>No category availabel please add category</TableCell> :
                                  row && row.slice(pg * rpg, pg * rpg + rpg).map((category, index) => {
                                    if (category) {
                                      return <Categoryitem index={index} category={category} key={category._id} updateCategory={updateCategory} handleDeleteCategory={handleDeleteCategory} />
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

export default Category
