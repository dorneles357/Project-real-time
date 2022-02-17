module.exports = function (app, io) {
  const onlines = {};

  io.on("connection", (client) => {
    const session = client.handshake.session;
    const user = session.user;

    onlines[user.email] = user.email;
    for (let email in onlines) {
      client.emit("notify-onlines", email);
      client.broadcast.emit('notify-onlines', email);
    }

    client.on("send-server", (hash_sala, msg) => {
      const res = `<b>${user.name}:</b> ${msg} <br>`;
      const newMessage = { email: user.email, sala: hash_sala };
      session.sala = hash_sala;
      client.broadcast.emit('new-message', newMessage);
      io.to(hash_sala).emit("send-client", res);
    });

    client.on("create-room", (hash_sala) => {
      session.sala = hash_sala;
      client.join(hash_sala);
    });

    client.on("disconnect", () => {
      const sala = session.sala;
      const res = `<b>${user.name}:</b> saiu.<br>`;
      delete onlines[user.email];
      client.leave(sala);
      client.broadcast.emit("notify-offlines", user.email);
      io.to(sala).emit("send-client", res);
    });
  });
};
