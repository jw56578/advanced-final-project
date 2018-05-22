// dotenv allows us to declare environment variables in a .env file, \
// find out more here https://github.com/motdotla/dotenv
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const sessionRoutes = require("./routes/SessionRoutes");
const authenticationRoutes = require("./routes/AuthenticationRoutes");
const CheckIn = require("./models/CheckIn");

mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongodburi);

const app = express();

app.get("/publicinformation", function (req, res) {
  res.send("Anyone can see this");
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(userRoutes);
app.use(sessionRoutes);
app.use(authenticationRoutes);

app.post("/checkins",(req,res)=>{
  let ci = new CheckIn({userId:req.user.id, activityId:req.body.activityId,date:(new Date().getTime())});
  ci.save((newCi)=>{
    getCheckInStats((err,data)=>{
      res.json(data);
    });
  })
  
});

app.get("/canigetthis", function (req, res) {
  res.send("You got the data. You are authenticated");
});
app.get("/secret", function (req, res) {
  res.send(`The current user is ${req.user.username}`);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});



function getCheckInStats(cb){
  function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }
  let monday = getMonday(new Date());
 
  CheckIn.
    find({})
    .where('date').gt(new Date(monday.getFullYear(), monday.getMonth(), monday.getDay()).getTime())//lt(66).
    .exec(cb);

}