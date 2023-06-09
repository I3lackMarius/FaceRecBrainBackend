/**
 ** STRUCTURE
 * * /--> res = this is working
 * * /signin --> POST = success || fail
 * * /register --> POST = user
 * * /profile/:userId --> GET = user
 * * /image --> PUT --> user
 **/

const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const fetch = require("node-fetch");

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DATABASE_HOST, //"localhost",
    ssl: { rejectUnauthorized: false }, //for online setup only
    port: 5432, //for online setup only
    user: process.env.DATABASE_USER, //"postgres",
    password: process.env.DATABASE_PW, //"test",
    database: process.env.DATABASE_DB, //"smart-brain",
  },
});

// console.log("debug:", process.env.DATABASE_URL);
// console.log(
//   db
//     .select("*")
//     .from("users")
//     .then((data) => {
//       console.log(data);
//     })
// );

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "John@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "Sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  // res.send(database.users);
  res.status(200).json({ status: "success" });
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageUrl", (req, res) => {
  image.handleApiCall(req, res, fetch);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
