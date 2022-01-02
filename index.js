const express = require('express');
const cors = require("cors");
const mongodb = require("mongodb");
const ObjectId = require('mongodb').ObjectId;
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => res.send("hello world this is ExpressJs Home page!"))

// mongodb connect -------------------------->

const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lvyry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
        const database = client.db("team26-bazar");
        const productsCollection = database.collection("productsCollection");
        const userCollection = database.collection("userCollection");
        
      // create a document to insert
      app.post("/addProduct", async (req, res) => {
        const result = await productsCollection.insertOne(req.body);
        res.json(result);
        })
      
      // create a userdocument to insert
        app.post("/addUser", async (req, res) => {
          const result = await userCollection.insertMany(req.body);
          res.json(result);
        })
      
      // get a userdocument to insert
        app.get("/addUser", async (req, res) => {
        const result = await userCollection.find({}).toArray();
        res.json(result);
        })
        
        // get product --------------->

        app.get("/products", async (req, res) => {
            const result = await productsCollection.find({}).toArray();
            res.json(result);
        })
        
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

// app listen ------------------------------>
app.listen(port, () => console.log(`The Express port is ${port}`));