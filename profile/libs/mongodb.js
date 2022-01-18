const username = process.env.MONGO_USER;
const password = process.env.MONGO_PWD;
const cluster = process.env.MONGO_CLUSTER;
const database = process.env.MONGO_DATABASE;

const MONGO_URL_ATLAS = `mongodb+srv://${username}:${password}@${cluster}.binhr.mongodb.net/${database}?retryWrites=true&w=majority`;
const MONGO_URL_LOCAL = 'mongodb://localhost:27017/curabl';

module.exports = { MONGO_URL_ATLAS, MONGO_URL_LOCAL };