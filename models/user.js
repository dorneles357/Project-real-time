const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = (app) => {

  let contact = Schema({
    name: String,
    email: String,
  });

  let user = Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    contacts: [contact],
  });

  return mongoose.model("user", user);
};
