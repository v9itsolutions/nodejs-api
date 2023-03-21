const express = require("express");
const sequelize = require("./database");
const User = require("./User");
const cors = require("cors");

sequelize.sync().then(() => console.log("db is ready"));

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hey this is my API running...");
});

app.post("/users", async (req, res) => {
  await User.create(req.body);
  res.send("user is inserted");
});

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

app.get("/users/:id", async (req, res) => {
  const reqId = req.params.id;
  const user = await User.findOne({ where: { id: reqId } });
  res.send(user);
});

app.put("/users/:id", async (req, res) => {
  const reqId = req.params.id;
  const user = await User.findOne({ where: { id: reqId } });
  if (req.body.username) {
    user.username = req.body.username;
    await user.save();
    res.send(user);
  } else if (user.username === req.body.username) {
    res.send('Data already updated');
  } else {
    res.send("No data found");
  }
 
});

app.delete("/users/:id", async (req, res) => {
  const reqId = req.params.id;
  await User.destroy({ where: { id: reqId } });
  res.send("removed");
});

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT}`);
});
