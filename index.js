require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

const HomeController = require("./controllers/homeController");
const AuthController = require("./controllers/authController");
const NoteController = require("./controllers/noteController");

const errHandler = require("./middlewares/errorHandler");
const authentication = require("./middlewares/authentication");
const authorization = require("./middlewares/authorization");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// public
app.get("/", HomeController.home);
app.post("/register", AuthController.register);
app.post("/login", AuthController.login);

// authentication
app.use(authentication);

app.get("/note", NoteController.getNote);
app.post("/note", NoteController.addNote);

// authentication + authorization
app.patch(
  "/edit-description/:id",
  authorization,
  NoteController.editDescription
);
app.put("/edit-note/:id", authorization, NoteController.editNote);
app.delete("/delete-note/:id", authorization, NoteController.deleteNote);

app.use(errHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
