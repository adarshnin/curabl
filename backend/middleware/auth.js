const jwt = require("jsonwebtoken");
// Users

/** Authenticate 
 * find user and send it to next asynchronous method
 * 
 */
const auth = async (req, res, next) => {
    var token = null;
    var user = null;
    try {
        token = req.headers["x-access-token"];
        console.log(token);
        if (token) {
            //jwt token verified
            const verifyuser = jwt.verify(token, process.env.SECRET);
            req.token = token;
            req.userid = verifyuser.id;
            req.email = verifyuser.email;
        }
        else{
            var data = { error: "Unauthorized Access!", message: "You have entered invalid credentials." }
            console.log("Unauthorized Access!")
            res.status(201).json(data);
        }
        
        next();
    } catch (error) {
        var data = { error: "Unauthorized Access!", message: "Authorization Failed" }
        console.log("auth failed");
        res.status(201).send(data);
    }
}

module.exports = auth;