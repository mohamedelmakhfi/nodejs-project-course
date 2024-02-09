const express = require("express");
const mongoose = require("mongoose");

const app = express();

// wassit bin database u application ms pour les articles 
const Articale = require("./models/Articale");

mongoose
  .connect(
    "mongodb+srv://mohamedelmakhfi6:txcsAgAnpAENJeNN@cluster0.g5bfrva.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected successfuly");
  })
  .catch((error) => {
    console.log("error with connecting with the db", error);
  });

//datababe orm odm ?
// mongodb+srv://mohamedelmakhfi6:<txcsAgAnpAENJeNN>@cluster0.g5bfrva.mongodb.net/?retryWrites=true&w=majority

//request with path body il faut ajouter jSon pour afficher
app.use(express.json());

app.put("/hi", (req, res) => {
  res.send("you testing out !");
});

app.post("/addcommit", (req, res) => {
  res.send("post request on add commit");
});

app.delete("/testingdelete", (req, res) => {
  res.send("delete request");
});

/////////////////////////////////////////////////////////

app.get("/numbers", (req, res) => {
  let number = "";
  for (let i = 0; i <= 100; i++) {
    number += i + " - ";
  }
  res.send(`the numbers are : ${number}`);
});

//request with path params

app.get("/findSummation/:number1/:number2", (req, res) => {
  // console.log(req.params);
  const num1 = req.params.number1;
  const num2 = req.params.number2;
  const total = Number(num1) + Number(num2);
  res.send(`the total is : ${total}`);
});

//request with path body
//request with path query

app.get("/sayHello", (req, res) => {
  // localhost:3000/sayHello
  // localhost:3000/sayHello?age=50

  // console.log(req.body);
  // console.log(req.query)
  // res.send(`Hello ${req.body.name} ,age is :${req.query.age}`);

  res.json({
    name: req.body.name,
    age: req.query.age,
  });
});

//res  >> sendfile html

app.get("/number", (req, res) => {
  let number = "";
  for (let i = 0; i <= 100; i++) {
    number += i + " - ";
  }

  //    res.sendFile(__dirname + "/views/numbers.html");
  // apres l'installation de package ejs
  res.render("numbers.ejs", {
    name: "elmakhfi",
    numbers: number,
  });
});


//------------------- ARTICLES ENDPOINTS --------------------
//add article
app.post("/articales", async (req,res) => {
    const newarticle = new Articale();
    newarticle.title = req.body.articaletitle;
    newarticle.body= req.body.articalebody;
    newarticle.numbOfLikes = req.body.articalenumberoflikes;
    //ajouter ces inform dans db
    await newarticle.save();

    res.send("the new artical has been stored");
})

//get articles
app.get("/articales", async (req,res) => {
    const articales = await Articale.find();
    res.json(articales);
})


//get spesific article
app.get("/articales/:articleId", async (req,res) => {
    const Id = req.params.articleId;
    const articale = await Articale.findById(Id);
    res.json(articale);
})


//delete article
app.delete("/articales/:articleId", async (req,res) => {
    const Id = req.params.articleId;
    const articale = await Articale.findByIdAndDelete(Id);
    res.json(articale);
})


//Show articles in html
app.get("/showarticales", async (req,res) => {
    const articales = await Articale.find();
    res.render("articales.ejs" , {
        allArticales: articales,
    });    
})

//-----------------------------------------------------------



app.listen(3000, () => {
  console.log("I'm listening in port 3000");
});
