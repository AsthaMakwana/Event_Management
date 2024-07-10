import { useState } from "react";
import EventContext from "./Eventcontext";
import jwtEncode from 'jwt-encode'
import { showAlert } from "../components/alert/Alert";
import { useNavigate } from "react-router-dom";
const JWT_SECRET = 'Abhiisgoodb@oy'


const Eventstate = (props) => {
  const host = "http://localhost:5000"
  const categoryInitial = []
  const sponserInitial = []
  const eventInitial = []
  const purchaseInitial = []

  const [users, setUsers] = useState()
  const [categorys, setCategorys] = useState(categoryInitial)
  const [sponseres, setSponseres] = useState(sponserInitial)
  const [events, setEvents] = useState(eventInitial)
  const [purchaseEvent,setPurchaseEvent] = useState(purchaseInitial)
  const navigate = useNavigate()

  // fetch all the user 

  const getuser = async () => {
    const response = await fetch(`${host}/api/user/getuser`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    const json = await response.json()
    if (json.success) {
      setUsers(json.data)
      return json.data
    }
  }

  // update user's data 

  const updateuser = async (id, fname, lname, email, country, contactno, gender, detail, image) => {
    const response = await fetch(`${host}/api/user/updateuser/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "jwtData": localStorage.getItem('usertoken')
      },
      body: JSON.stringify({ fname, lname, email, country, contactno, gender, detail, image })
    })
    const json = await response.json()
    let newuser = JSON.parse(JSON.stringify(users))
    for (let index = 0; index < newuser.length; index++) {
      const element = newuser[index];
      if (element._id === id) {
        element.firstname = fname
        element.lastname = lname
        element.email = email
        element.country = country
        element.contactno = contactno
        element.gender = gender
        element.detail = detail
        element.image = image
        break
      }
    }
    if (json.success) {
      setUsers(newuser)
      console.log(newuser)
      navigate('/profile')
      showAlert('success', json.message)
    } else {
      showAlert('error', json.message)
    }
  }
  const updateorganiser = async (id, fname, lname, email, country, contactno, gender, detail, image) => {
    const response = await fetch(`${host}/api/user/updateuser/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "jwtData": localStorage.getItem('organisertoken')
      },
      body: JSON.stringify({ fname, lname, email, country, contactno, gender, detail, image })
    })
    const json = await response.json()
    let newuser = JSON.parse(JSON.stringify(users))
    for (let index = 0; index < newuser.length; index++) {
      const element = newuser[index];
      if (element._id === id) {
        element.firstname = fname
        element.lastname = lname
        element.email = email
        element.country = country
        element.contactno = contactno
        element.gender = gender
        element.detail = detail
        element.image = image
        break
      }
    }
    if (json.success) {
      setUsers(newuser)
      navigate('organiser/profilem')
      showAlert('success', json.message)
    } else {
      showAlert('error', json.message)
    }
  }

  // fetch all the category

  const getcategory = async () => {
    const response = await fetch(`${host}/api/event/category/fetchcategory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "jwtData": localStorage.getItem('organisertoken')
      }
    })
    const json = await response.json()
    const catgjwtArray = []
    if (json.success) {
      json.data.forEach(category => {
        const jwt = jwtEncode(category._id, JWT_SECRET)
        catgjwtArray.push(jwt);
      })
      const catgjwtArrayString = JSON.stringify(catgjwtArray);
      localStorage.setItem('categoryData', catgjwtArrayString);
      setCategorys(json.data)
      return json.data
    }
  }

  // Add a category

  const addcategory = async (categoryname, categorydescription) => {
    const response = await fetch(`${host}/api/event/category/addcategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "jwtData": localStorage.getItem('organisertoken')
      },
      body: JSON.stringify({ categoryname, categorydescription })
    });
    const json = await response.json();
    if (json.success) {
      const category = json.data
      setCategorys(categorys.concat(category))
      showAlert('success', json.message)
      navigate('organiser/event/category')
    }
    else {
      showAlert('error', json.message)
    }
  }

  // update category

  const editcategory = async (id, categoryname, categorydescription) => {
    const response = await fetch(`${host}/api/event/category/updatecategory/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "jwtData": localStorage.getItem('organisertoken'),
      },
      body: JSON.stringify({ categoryname, categorydescription })
    });
    const json = await response.json();
    let newCategory = JSON.parse(JSON.stringify(categorys))
    for (let index = 0; index < newCategory.length; index++) {
      const element = newCategory[index];
      if (element._id === id) {
        element.categoryname = categoryname
        element.categorydescription = categorydescription
        break
      }
    }
    if (json.success) {
      setCategorys(newCategory)
      showAlert('success', json.message)
    }
    else {
      showAlert('error', json.message)
    }
  }

  // Delete a category

  const deletecategory = async (id) => {
    const response = await fetch(`${host}/api/event/category/deletecategory/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "jwtData": localStorage.getItem('organisertoken')
      },
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      const newCategory = categorys.filter((category) => { return category._id !== id })
      setCategorys(newCategory)
      showAlert('success', json.message)
    }
  }

  // Sponser
  // Fetch all the sponser

  const getsponser = async () => {
    const response = await fetch(`${host}/api/event/sponser/fetchsponser`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'jwtData': localStorage.getItem('organisertoken')
      }
    })
    const json = await response.json()

    const spnjwtArray = []
    if (json.success) {
      json.data.forEach(sponser => {
        const jwt = jwtEncode(sponser._id, JWT_SECRET)
        spnjwtArray.push(jwt);
      })
      const spnjwtArrayString = JSON.stringify(spnjwtArray);
      localStorage.setItem('sponserData', spnjwtArrayString);
      setSponseres(json.data)
      return json.data
    }
  }

  // Add a Sponser

  const addsponser = async (sponserName, sponserDetail, sponserLogo) => {
    const response = await fetch(`${host}/api/event/sponser/addsponser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "jwtData": localStorage.getItem('organisertoken')
      },
      body: JSON.stringify({ sponserDetail, sponserLogo, sponserName })
    });
    const json = await response.json();
    if (json.success) {
      const sponser = json.data
      setSponseres(sponseres.concat(sponser))
      showAlert('success', json.message)
      navigate('organiser/event/sponser')
    }
    else {
      showAlert('error', json.message)
    }
  }

  // update Sponser's data

  const editsponser = async (id, sponserName, sponserLogo, sponserDetail) => {
    const response = await fetch(`${host}/api/event/sponser/updatesponser/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "jwtData": localStorage.getItem('organisertoken')
      },
      body: JSON.stringify({ sponserName, sponserDetail, sponserLogo })
    });
    const json = await response.json();
    let newSponser = JSON.parse(JSON.stringify(sponseres))
    for (let index = 0; index < newSponser.length; index++) {
      const element = newSponser[index];
      if (element._id === id) {
        element.sponserLogo = sponserLogo
        element.sponserName = sponserName
        element.sponserDetail = sponserDetail
        break
      }
    }
    if (json.success) {
      setSponseres(newSponser)
      showAlert('success', json.message)
    }
    else {
      showAlert("error", json.message)
    }
  }

  // Delete a Sponser

  const deletesponser = async (id) => {
    const response = await fetch(`${host}/api/event/sponser/deletesponser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "jwtData": localStorage.getItem('organisertoken')
      },
    });
    const json = await response.json();
    if (json.success) {
      const newSponser = sponseres.filter((sponser) => { return sponser._id !== id })
      setSponseres(newSponser)
      showAlert('success', json.message)
    }
  }

  // Event

  // Fetch all the Event

  const getevent = async () => {
    const response = await fetch(`${host}/api/event/fetchevent`, {
      method: "GET",
      headers: {
        'Content-type': "application/json",
        "jwtData": localStorage.getItem('organisertoken'),
      }
    })
    const json = await response.json()
    if (json.success) {
      setEvents(json.data)
      return json.data
    }
  }

  // Add a Event

  const addevent = async (name, detail, location, stdate, endate, contact, image, noticket, price) => {

    const requestBody = {
      eventName: name,
      eventDescription: detail,
      eventLocation: location,
      eventStDate: stdate,
      eventEndDate: endate,
      contact: contact,
      image: image,
      noOfTicket: noticket,
      totalPrice: price,
    };
    const response = await fetch(`${host}/api/event/addevent`, {
      method: "POST",
      headers: {
        'Content-type': "application/json",
        "jwtData": localStorage.getItem('organisertoken'),
        'categoryid': localStorage.getItem('categoryid'),
        'sponserid': localStorage.getItem('sponserid')
      },
      body: JSON.stringify(requestBody)
    })

    const json = await response.json()
    if (json.success) {
      const event = json.data
      setEvents(events.concat(event))
      showAlert('success', json.message)
      navigate('organiser/event')
    }
    else {
      showAlert('error', json.message)
    }
  }


  // Edit a Event

  const editevent = async (id, name, detail, location, stdate, endate, contact, image, noticket, price, category, sponser) => {
    const requestBody = {
      id: id,
      eventName: name,
      eventDescription: detail,
      eventLocation: location,
      eventStDate: stdate,
      eventEndDate: endate,
      contact: contact,
      image: image,
      noOfTicket: noticket,
      totalPrice: price
    }
    const response = await fetch(`${host}/api/event/updateevent/${id}`, {
      method: "PUT",
      headers: {
        'Content-type': "application/json",
        "jwtData": localStorage.getItem('organisertoken'),
        'categoryid': localStorage.getItem('categoryid'),
        'sponserid': localStorage.getItem('sponserid')
      },
      body: JSON.stringify(requestBody)
    })
    const json = await response.json()
    console.log(json)
    let newEvent = JSON.parse(JSON.stringify(events))
    for (let index = 0; index < newEvent.length; index++) {
      const element = newEvent[index];
      if (element._id === id) {
        element.name = name
        element.detail = detail
        element.location = location
        element.stdate = stdate
        element.endate = endate
        element.image = image
        element.noticket = noticket
        element.price = price
        element.category = category
        element.sponser = sponser
        break
      }
    }
    if (json.success) {
      setEvents(newEvent)
      showAlert('success', json.message)
    }
    else {
      showAlert('error', json.message)
    }
  }

  // Delete a Event

  const deletevent = async (id) => {
    const response = await fetch(`${host}/api/event/deleteevent/${id}`, {
      method: "DELETE",
      headers: {
        'Content-type': "application/json",
        "jwtData": localStorage.getItem('organisertoken'),
      }
    })
    const json = await response.json()
    if (json.success) {
      const newEvent = events.filter((event) => { return event._id !== id })
      setEvents(newEvent)
      showAlert('success', json.message)
    }
  }

  // upload event image

  const eventImage = async (id, image) => {
    const response = await fetch(`${host}/api/event/uploadeventimage/${id}`, {
      method: 'POST',
      headers: {
        'Content-type': "application/json",
        "jwtData": localStorage.getItem('organisertoken'),
      },
      body: JSON.stringify({
        base64: image
      })
    })
    const json = await response.json()
    console.log(json)
  }

  // for calendar date

  const [selectDate, setSelectDate] = useState(null)
  const calendarDate = (date) => {
    setSelectDate(date)
  }

  // for user side fetch all event

  const userfetchevent = async () => {
    const response = await fetch(`${host}/api/event/user/fetchevent`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    const json = await response.json()
    return json
  }

  // for user side fetch all category

  const userfetchcategory = async () => {
    const response = await fetch(`${host}/api/event/user/fetchcategory`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    const json = await response.json()
    return json
  }

  // for user side fetch all sponser

  const userfetchsponser = async () => {
    const response = await fetch(`${host}/api/event/user/fetchsponser`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    const json = await response.json()
    return json
  }

  // for user purchase event

  const purchaseEvents = async(id,name,email,phoneno,quantity)=>{
    const response = await fetch(`${host}/api/event/user/purchaseevent/${id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'jwtData':localStorage.getItem('usertoken')
      },
      body : JSON.stringify({name,email,phoneno,quantity})
    })
    const json = await response.json()
    if(json.success){
      setPurchaseEvent(json.data)
      showAlert('success',json.message)
    }else{
      showAlert('error',json.message)
    }
  }

  // for fetch purchase events

  const fetchpurchaseevent = async()=>{
    const response = await fetch(`${host}/api/event/user/fetchpurchaseevent`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'jwtData':localStorage.getItem('usertoken')
      },
    })
    const json =  await response.json();
    return json
  }

  const afterBookEventUpdateEvent = async(eid,quantity)=>{
    try {
      const response = await fetch(`${host}/api/event/user/afterbookeventupdateevent?eid=${eid}&quantity=${quantity}`,{
        method:'GET',
        headers: {
          'Content-type': 'application/json'
        }
      })
      const json = await response.json()
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <EventContext.Provider value={{afterBookEventUpdateEvent,fetchpurchaseevent, purchaseEvent,purchaseEvents,userfetchsponser, userfetchcategory, userfetchevent, navigate, selectDate, calendarDate, users, getuser, updateuser,updateorganiser, categorys, getcategory, addcategory, editcategory, deletecategory, sponseres, getsponser, addsponser, editsponser, deletesponser, events, getevent, addevent, editevent, deletevent, eventImage }}>
      {props.children}
    </EventContext.Provider>
  )
}

export default Eventstate
