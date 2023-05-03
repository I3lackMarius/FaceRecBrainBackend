const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("Incorrect form submission");
  }
  // bcrypt.hash(password, null, null, (err, hash) => {
  //   // console.log(hash);
  // });
  // database.users.push({
  //   id: "125",
  //   name: name,
  //   email: email,
  //   password: password,
  //   entries: 0,
  //   joined: new Date(),
  // });

  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: password, //hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("User already exists"));
  // res.json(
  //   database.users[database.users.length - 1].name + " user was registered"
  // );
};

module.exports = {
  handleRegister: handleRegister,
};
