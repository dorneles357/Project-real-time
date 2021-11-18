module.exports = (app) => {
  const Schema = require("mongoose").Schema;

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

  return db.model("user", user);
};
