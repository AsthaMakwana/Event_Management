const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const fetchuser = require('../middleware/fetchuser')
const Category = require("../model/Category")
const Sponser = require("../model/Sponser")
const Event = require("../model/Event")
const PurchaseEvent = require('../model/PurchaseEvent')
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Abhiisgoodb@oy'


// fetch category || Method : GET

router.get('/category/fetchcategory', fetchuser, async (req, res) => {
    try {
        const category = await Category.find({ user: req.user.id })
        return res.json({ success: true, data: category })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: "Internal server error" })
    }
})

// add category || Method : POST

router.post(
  '/category/addcategory',
  fetchuser,
  [
    body('categoryname')
      .isLength({ min: 4 })
      .withMessage('The category name should be at least 4 characters long')
      .custom((value) => {
        // Custom validation function to check for whitespace
        if (/\s/.test(value)) {
          throw new Error('The category name cannot contain whitespace');
        }
        return true;
      })
      .trim(),
    // Add other validations as needed
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsg = errors.array().map((error) => {
        return error.msg;
      });
      return res.status(400).json({ success: false, message: errorMsg[0] });
    }
    
    // Rest of your code for adding the category
  }
);



//update category || Method : PUT

router.put('/category/updatecategory/:id', fetchuser, [
    // check validation here...
    body('categoryname')
      .isLength({ min: 4 })
      .withMessage('The category name should be at least 4 characters long')
      .custom((value) => {
        // Custom validation function to check for whitespace
        if (/\s/.test(value)) {
          throw new Error('The category name cannot contain whitespace');
        }
        return true;
      })
      .trim()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorMsg = errors.array().map((error) => {
            return error.msg
        })
        return res.status(400).json({ success: false, message: errorMsg[0] })
    }
    try {
        const { categoryname, categorydescription } = req.body
        const newCategory = {}
        if (categoryname) { newCategory.categoryname = categoryname }
        if (categorydescription) { newCategory.categorydescription = categorydescription }

        let category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(404).send({ success: false, message: "Not found" })
        }
        if (category.user.toString() !== req.user.id) {
            return res.status(401).send({ success: false, message: 'Not allowed' })
        }
        category = await Category.findByIdAndUpdate(req.params.id, { $set: newCategory }, { new: true })
        return res.json({ success: true, data: category, message: 'Category Updated Successfully' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: "Internal server error" })
    }
})


//delete category || Method : DELETE

router.delete('/category/deletecategory/:id', fetchuser, async (req, res) => {
    try {
        let category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(404).send({ success: false, message: "Not found" })
        }
        if (category.user.toString() !== req.user.id) {
            return res.status(401).send({ success: false, message: 'Not allowed' })
        }

        category = await Category.findByIdAndDelete(req.params.id)
        return res.json({ success: true, message: "category has been deleted", data: category })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: "Internal server error" })
    }
})

// fetch sponser || Method : GET

router.get('/sponser/fetchsponser', fetchuser, async (req, res) => {
    try {
        const sponser = await Sponser.find({ user: req.user.id })
        return res.json({ success: true, data: sponser })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: "Internal server error" })
    }
})

// add sponser || Method : POST

router.post('/sponser/addsponser', fetchuser, [
    // check validation here...
    body('sponserName')
      .isLength({ min: 4 })
      .withMessage('The sponser name should be at least 4 characters long')
      .custom((value) => {
        // Custom validation function to check for whitespace
        if (/\s/.test(value)) {
          throw new Error('The sponser name cannot contain whitespace');
        }
        return true;
      })
      .trim()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMsg = errors.array().map((error) => {
            return error.msg
        })
        return res.status(400).json({ success: false, message: errorMsg[0] })
    }
    try {
        const { sponserName, sponserLogo, sponserDetail } = req.body
        const sponser = new Sponser({
            sponserName, sponserLogo, sponserDetail, user: req.user.id
        })
        let saveSponser = await sponser.save()
        saveSponser = {
            sponser: {
                id: sponser.id
            }
        }
        const sponserData = jwt.sign(saveSponser, JWT_SECRET)
        return res.json({ success: true, data: sponserData, message: 'Sponser Added Successfully' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: "Internal server error" })
    }
})

// update sponser || Method : PUT

router.put('/sponser/updatesponser/:id', fetchuser, [
    // check validation here...
    body('sponserName')
    .isLength({ min: 4 })
    .withMessage('The sponser name should be at least 4 characters long')
    .custom((value) => {
      // Custom validation function to check for whitespace
      if (/\s/.test(value)) {
        throw new Error('The sponser name cannot contain whitespace');
      }
      return true;
    })
    .trim()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMsg = errors.array().map((error) => {
            return error.msg
        })
        return res.status(400).json({ success: false, message: errorMsg[0] })
    }
    try {
        const { sponserName, sponserLogo, sponserDetail } = req.body
        const newSponser = {}
        if (sponserName) { newSponser.sponserName = sponserName }
        if (sponserLogo) { newSponser.sponserLogo = sponserLogo }
        if (sponserDetail) { newSponser.sponserDetail = sponserDetail }

        let sponser = await Sponser.findById(req.params.id)
        if (!sponser) {
            return res.status(404).send({ success: false, message: "Not found" })
        }
        if (sponser.user.toString() !== req.user.id) {
            return res.status(401).send({ success: false, message: 'Not allowed' })
        }
        sponser = await Sponser.findByIdAndUpdate(req.params.id, { $set: newSponser }, { new: true })
        return res.json({ success: true, data: sponser, message: 'Sponser Updated Successfully' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: "Internal server error" })
    }
})

// delete sponser || Method : DELETE

router.delete('/sponser/deletesponser/:id', fetchuser, async (req, res) => {
    try {
        let sponser = await Sponser.findById(req.params.id)
        if (!sponser) {
            return res.status(404).send({ success: false, message: "Not found" })
        }
        if (sponser.user.toString() !== req.user.id) {
            return res.status(401).send({ success: false, message: 'Not allowed' })
        }

        sponser = await Sponser.findByIdAndDelete(req.params.id)
        return res.json({ success: true, message: "sponser has been deleted", data: sponser })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: "Internal server error" })
    }
})


// fetch event || Method : GET

router.get('/fetchevent', fetchuser, async (req, res) => {
    try {
        const event = await Event.find({ user: req.user.id })
        return res.json({ success: true, data: event })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

// fetch user and category 

router.post('/addevent', fetchuser, async (req, res, next) => {
    const categoryid = req.header('categoryid')
    try {
        req.category = categoryid
        next();
    } catch (error) {
        return res.status(401).send({ error: "Please authenticate using a valid token" })
    }
})

// fetch sponser

router.post('/addevent', async (req, res, next) => {
    const sponserid = req.header('sponserid')
    try {
        req.sponser = sponserid
        next();
    } catch (error) {
        res.status(401).send({ error: "some error occured in sponser" })
    }
})

// add event || Method : POST

router.post('/addevent',
    [
        // check validation here...
        body('eventName')
        .isLength({ min: 4 })
        .withMessage('The event name should be at least 4 characters long')
        .custom((value) => {
          // Custom validation function to check for whitespace
          if (/\s/.test(value)) {
            throw new Error('The event name cannot contain whitespace');
          }
          return true;
        })
        .trim(),
        body('eventLocation')
        .custom((value) => {
          // Custom validation function to check for whitespace
          if (/\s/.test(value)) {
            throw new Error('The event location cannot contain whitespace');
          }
          return true;
        })
        .trim(),
        body('eventDescription')
        .custom((value) => {
          // Custom validation function to check for whitespace
          if (/\s/.test(value)) {
            throw new Error('The event description cannot contain whitespace');
          }
          return true;
        })
        .trim(),
        body('noOfTicket', 'total ticket must be positive').custom((val) => {
            if (val < 0) {
                return false;
            }
            return true;
        }),
        body('totalPrice', 'total ticket must be positive').custom((val) => {
            if (val < 0) {
                return false;
            }
            return true;
        }),
        body('contact', 'Mobile number should contains 10 digits').isLength({ min: 10, max: 10 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMsg = errors.array().map((error) => {
                return error.msg
            })
            console.log(errorMsg)
            return res.status(400).json({ success: false, message: errorMsg[0] })
        }
        try {
            const { eventName, eventDescription, eventLocation, eventStDate, eventEndDate, contact, image, noOfTicket, totalPrice } = req.body
            let event = new Event({
                eventName, eventDescription, eventLocation, eventStDate, eventEndDate, contact, image, noOfTicket, totalPrice, user: req.user.id,
                category: req.category,
                sponser: req.sponser
            })
            const saveEvent = await event.save()
            return res.json({ success: true, data: saveEvent, message: 'Event Added Successfully' })
        } catch (error) {
            console.log("error:", error.message)
            return res.status(500).json({ error: "Internal server error" })
        }
    })

// fetch user and category 

router.put('/updateevent/:id', fetchuser, async (req, res, next) => {
    const categoryid = req.header('categoryid')
    try {
        req.category = categoryid
        next();
    } catch (error) {
        console.log('error in fetchctegory:', error)
        res.status(401).send({ error: "some error occured in sponser" })
    }
})

// fetch sponser 

router.put('/updateevent/:id', async (req, res, next) => {
    const sponserid = req.header('sponserid')
    try {
        req.sponser = sponserid
        next();
    } catch (error) {
        console.log('error in fetchsponser:', error)
        res.status(401).send({ error: "some error occured in sponser" })
    }
})

// UPDATE EVENT || METHOD  : PUT

router.put('/updateevent/:id', [
    body('eventName')
        .isLength({ min: 4 })
        .withMessage('The event name should be at least 4 characters long')
        .custom((value) => {
          // Custom validation function to check for whitespace
          if (/\s/.test(value)) {
            throw new Error('The event name cannot contain whitespace');
          }
          return true;
        })
        .trim(),
        body('eventLocation')
        .custom((value) => {
          // Custom validation function to check for whitespace
          if (/\s/.test(value)) {
            throw new Error('The event location cannot contain whitespace');
          }
          return true;
        })
        .trim(),
        body('eventDescription')
        .custom((value) => {
          // Custom validation function to check for whitespace
          if (/\s/.test(value)) {
            throw new Error('The event description cannot contain whitespace');
          }
          return true;
        })
        .trim(),
        body('noOfTicket', 'total ticket must be positive').custom((val) => {
            if (val < 0) {
                return false;
            }
            return true;
        }),
        body('totalPrice', 'total ticket must be positive').custom((val) => {
            if (val < 0) {
                return false;
            }
            return true;
        }),
        body('contact', 'Mobile number should contains 10 digits').isLength({ min: 10, max: 10 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMsg = errors.array().map((error) => {
            return error.msg
        })
        console.log(errorMsg)
        return res.status(400).json({ success: false, message: errorMsg[0] })
    }
    try {
        const { eventName, eventDescription, eventLocation, eventStDate, eventEndDate, contact, image, noOfTicket, totalPrice } = req.body
        const newEvent = {}
        if (eventName) { newEvent.eventName = eventName }
        if (eventDescription) { newEvent.eventDescription = eventDescription }
        if (eventLocation) { newEvent.eventLocation = eventLocation }
        if (eventStDate) { newEvent.eventStDate = eventStDate }
        if (eventEndDate) { newEvent.eventEndDate = eventEndDate }
        if (contact) { newEvent.contact = contact }
        if (image) { newEvent.image = image }
        if (noOfTicket) { newEvent.noOfTicket = noOfTicket }
        if (totalPrice) { newEvent.totalPrice = totalPrice }
        newEvent.category = req.category
        newEvent.sponser = req.sponser

        let event = await Event.findById(req.params.id)
        if (!event) {
            return res.status(404).send({ success: false, message: "Not found" })
        }
        if (event.user.toString() !== req.user.id) {
            return res.status(401).send({ success: false, message: 'Not allowed' })
        }
        event = await Event.findByIdAndUpdate(req.params.id, { $set: newEvent }, { new: true })
        return res.json({ success: true, data: event, message: 'Event Updated Successfully' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: "Internal server error in edit" })
    }
})

// delete event || Method : DELETE

router.delete('/deleteevent/:id', fetchuser, async (req, res) => {
    try {
        let event = await Event.findById(req.params.id)
        if (!event) {
            return res.status(404).send({ success: false, message: "Not found" })
        }
        if (event.user.toString() !== req.user.id) {
            return res.status(401).send({ success: false, message: 'Not allowed user' })
        }
        event = await Event.findByIdAndDelete(req.params.id)
        return res.json({ success: true, message: "event has been deleted", data: event })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: "Internal server error" })
    }
})

// event image

router.post('/uploadeventimage/:id', fetchuser, async (req, res) => {
    const { base64 } = req.body
    try {
        const image = await Event.findByIdAndUpdate(req.params.id, { image: base64 })
        return res.send(image)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }
})


// for user side fetch all event

router.get('/user/fetchevent', async (req, res) => {
    try {
        const data = await Event.find()
        return res.json(data)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }
})

// for user side fetch all category

router.get('/user/fetchcategory', async (req, res) => {
    try {
        const data = await Category.find()
        return res.json(data)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }
})

//for user side fetch all sponser

router.get('/user/fetchsponser', async (req, res) => {
    try {
        const data = await Sponser.find()
        return res.json(data)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }
})

//  for event purchase
router.post('/user/purchaseevent/:id', fetchuser, [
    body('name')
        .custom((value) => {
          // Custom validation function to check for whitespace
          if (/\s/.test(value)) {
            throw new Error('The name cannot contain whitespace');
          }
          return true;
        })
        .trim(),
    body('phoneno', 'Mobile number should contain 10 digits').matches(/^\d{10}$/),
    body('email', 'Enter a valid email').isEmail(),
    body('quantity', 'Quantity must be positive').custom((val) => {
        if (val < 0) {
            return false;
        }
        return true;
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMsg = errors.array().map((error) => {
            return error.msg;
        });
        console.log(errorMsg);
        return res.status(400).json({ success: false, message: errorMsg[0] });
    }
    try {
        const { name, email, phoneno, quantity } = req.body;
        const purchaseEvent = new PurchaseEvent({
            name, email, phoneno, quantity, user: req.user.id,
            event: req.params.id
        });
        const saveEvent = await purchaseEvent.save();
        return res.json({ success: true, data: saveEvent, message: 'Event Purchased Successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// fetch purchased event user vise

router.get('/user/fetchpurchaseevent', fetchuser, async (req, res) => {
    try {
        const event = await PurchaseEvent.find({ user: req.user.id })
        if (!event) {
            return res.status(404).send({ success: false, message: "not found" })
        } else {
            return res.json({ success: true, data: event })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})

//  after book event updated event 

router.get('/user/afterbookeventupdateevent', async (req, res) => {
    try {
        const eid = req.query.eid;
        const quantity = parseInt(req.query.quantity);
        await Event.findOneAndUpdate({ _id: eid }, { $inc: { soldTicket: quantity } })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router