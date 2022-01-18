const mongoose = require('mongoose');
const RemoteMongoDBURL = 'mongodb+srv://curabl_admin:curabl123@cluster0.binhr.mongodb.net/signupTable?retryWrites=true&w=majority';

mongoose.Promise = global.Promise;

mongoose.connect(String(RemoteMongoDBURL), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection Successful to DB");
}).catch((e) => {
    console.log("No connection");
});


// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://curabl_admin:curabl123@cluster0.binhr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });