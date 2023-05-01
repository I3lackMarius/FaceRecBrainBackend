const handleProfile = (req, res, db) => {
  const { id } = req.params;
  // database.users.forEach((user) => {
  //   if (user.id === id) {
  //     found = true;
  //     return res.json(user);
  //   }
  // });
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      user.length ? res.json(user[0]) : res.status(400).json("User not found");
    })
    .catch((err) => res.status(400).json("Error getting user"));
  // found ? "" : res.status(404).json("no such user");
};

module.exports = {
  handleProfile: handleProfile,
};
