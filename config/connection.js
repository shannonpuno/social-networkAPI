const { connect, connection } = require('mongoose');

const connectionString = 
    process.env.mongoDB_URI || 'mongodb://localhost:27017//socialNetwork_DB';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;