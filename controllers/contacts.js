module.exports = function (app) {
  const ContactController = {
    index: function (req, res) {
      const user = req.session.user;
      const contacts = req.session.user.contacts;
      const params = { user: user, contacts: contacts };

      res.render("contacts/index", params);
    },

    create: function (req, res) {
      const contact = req.body.contact;
      const user = req.session.user;

      user.contacts.push(contact);
      res.redirect("/contacts");
    },

    show: function (req, res) {
      const id = req.params.id;
      const contact = req.session.user.contacts[id];
      const params = { contact: contact, id: id };

      res.render("contacts/show", params);
    },

    edit: function (req, res) {
      const id = req.params.id;
      const user = req.session.user;
      const contact = user.contacts[id];
      const params = { user: user, contact: contact, id: id };

      res.render("contacts/edit", params);
    },

    update: function (req, res) {
      const contact = req.body.contact;
      const user = req.session.user;

      user.contacts[req.params.id] = contact;
      res.redirect("/contacts");
    },

    destroy: function (req, res) {
      const user = req.session.user;
      const id = req.params.id;

      user.contacts.splice(id, 1);
      res.redirect("/contacts");
    },
  };
  return ContactController;
};
