const express = require("express")
const app = express();
const mongoose = require("mongoose");
const URI = "mongodb+srv://toyyib:toyyib10@cluster0.c6xilee.mongodb.net/noiseMaker?retryWrites=true&w=majority";
app.use(express.static('css files'));
const ejs = require("ejs")
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true})); 

mongoose.connect(URI, (err) => {
  if (err) {
    console.log("an error occured")
  } else {
    console.log("mongoose has started")
  }
})
const makerSchema = mongoose.Schema({
  name : String,
  value : String
})
let makerModel = mongoose.model("noisemaker_tb", makerSchema)

app.get("/", (req,res) => {
  console.log("/ gotten")
  makerModel.find((err,result) => {
    if (err) {
      console.log("an error occured")
    } else {
      info = result;
      res.render("noise", {message: "", info})
    }
  }) 
})
app.post("/addname", (req,res) => {
  const makerDetails = req.body;
  let {make,num} = req.body;
  let form = new makerModel(makerDetails)
  if (make == ""){
    console.log("worked")
  } else {
    form.save((err)=> {
      if (err) {
        console.log(err)
        console.log("an error occured")
      } else {
        res.redirect("/")
      }
    })
  }
  
})

app.post("/add", (req,res) => {
  let {name,value, id} = req.body;
  value = Number(value)
  value += 1;
  value = String(value)
  makerModel.findOneAndUpdate({_id: id}, {name,value}, (err , result) => {
    if (err) {
      console.log("add no save")
    } else {
      console.log(result)
      res.redirect("/")
    }
  })
})
app.post("/sub", (req,res) => {
  let {name,value, id} = req.body;
  value = Number(value)
  value -= 1
  if (value < 1){
    value = 1;
  }
  value = String(value)
  makerModel.findOneAndUpdate({_id: id}, {name,value}, (err , result) => {
    if (err) {
      console.log("sub no sub")
    } else {
      console.log(result)
      res.redirect("/")
    }
  })
})

app.post("/del", (req,res) => {
  let {name,value, id} = req.body;
  makerModel.deleteOne({_id: id}, (err , result) => {
    if (err) {
      console.log("del no del")
    } else {
      res.redirect("/")
    }
  })
})

app.listen(1110, () => {
  console.log('server started')
})