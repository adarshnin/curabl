const pass = require("../services/password")
const adminSchema = require("../models/Admin")



var email = 'no.reply.curabl@gmail.com';
var password = "#admin123"
async function temp(email,password){
    Password = await pass.toHash(password)
    const adminsingup = new adminSchema({
        name : "First Admin",
        email: email,
        password:Password,
    });
    adminsingup.save()
        .then(data => {
            
            console.log(data);
        })
        .catch(error => {
            var data = { error: "Unauthorized Access!", message: "Retry!! Unable to sign up" }
            console.log("Unauthorized Access!")
            // res.status(201).json(data);
            // console.log(error);
            // res.status(500).json({ error });
        });

}

temp(email,password);



// module.exports = router;