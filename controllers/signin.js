const handleSignin = (req, res, db, bcrypt) => {
  // bcrypt.compare(
  //   "apples",
  //   "$2a$10$wnRIc3vB2LJqD8ka.r3YM.ahugKiwDWLrHSCM7T4KS6Wz1uBRLSH2",
  //   (err, res) => {
  //     console.log("first guess", res);
  //   }
  // );
  // bcrypt.compare(
  //   "veggies",
  //   "$2a$10$wnRIc3vB2LJqD8ka.r3YM.ahugKiwDWLrHSCM7T4KS6Wz1uBRLSH2",
  //   (err, res) => {
  //     console.log("second guess", res);
  //   }
  // );
  // (req.body.email === database.users[0].email &&
  //   req.body.password === database.users[0].password) ||
  // (req.body.email === database.users[1].email &&
  //   req.body.password === database.users[1].password)
  //   ? res.json(database.users[0])
  //   : res.status(400).json("error logging in");

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Incorrect form submission");
  }
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = password === data[0].hash ? true : false; //bcrypt.compareSync(password, data[0].hash);
      // console.log(isValid);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            // console.log(user);
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("Unable to get user"));
      }
      res.status(400).json("Wrong credentials");
      // data.length ? res.json(data[0]) : res.status(400).json("User not found");
    })
    .catch((err) => res.status(400).json("Wrong credentials"));
};

module.exports = {
  handleSignin: handleSignin,
};
