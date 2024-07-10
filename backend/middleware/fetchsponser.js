const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Abhiisgoodb@oy'

const fetchsponser = async (req,res,next)=>{
    const sponserid = req.header('sponserid')
    if (!sponserid) {
        res.status(401).send({ error: "id is not available" })
    }
    try {
        const sponser = jwt.verify(sponserid, JWT_SECRET)
        req.sponser = sponser.sponser
        next();
    }
    catch (error) {
        res.status(401).send({ error: "some error occured in sponser" })
    }
}

module.exports = fetchsponser