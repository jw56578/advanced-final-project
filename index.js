// dotenv allows us to declare environment variables in a .env file, \
// find out more here https://github.com/motdotla/dotenv
require("dotenv").config();

const mongoose = require("mongoose");

const CheckIn = require("./server/models/CheckIn");

mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongodburi);



getCheckInStats((err,data)=>{
    
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
    .where('date').gt(new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()).getTime())//lt(66).
    .exec(cb);

}