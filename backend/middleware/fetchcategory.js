const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Abhiisgoodb@oy'

const fetchcategory = async (req,res,next)=>{
    const categoryid = req.header('categoryid')
    if (!categoryid) {
        res.status(401).send({ error: "id is not available" })
    }
    try {
        const category = jwt.verify(categoryid, JWT_SECRET)
        req.category = category.category
        console.log(req.category)
        next();
    }
    catch (error) {
        console.log(error.message)
        res.status(401).send({ error: "some error occured in category" })
    }
}

module.exports = fetchcategory