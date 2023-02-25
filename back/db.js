const mongoose = require('mongoose');

const DB_URL = 'mongodb+srv://semion:Sbw3YQJ7PO36xLr8@cluster0.4lmmvnm.mongodb.net/test';
async function connect() {
  try {
    await mongoose.connect(DB_URL);
    console.log('Connectd to DB');
  } catch (error) {
    console.log('Failed connecting to DB', error);
  }
}
module.exports = {connect};
