const mongoose = require('mongoose');

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PWD;
const cluster = process.env.MONGO_CLUSTER;
const database = process.env.MONGO_DATABASE;

const RemoteMongoDBURL = `mongodb+srv://${username}:${password}@${cluster}.binhr.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;
console.log(RemoteMongoDBURL);
mongoose.connect(String(RemoteMongoDBURL), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection Successful to DB");
}).catch((e) => {
    console.log("No connection", e);
});


// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://curabl_admin:curabl123@cluster0.binhr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });