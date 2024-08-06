var express = require('express');
var mongodb = require('mongodb')
var router = express.Router();

/* GET users listing. */
router.get('/get-users', async function (req, res, next) {
  const url = "mongodb+srv://stepup:stepup@stepup8am.znntnil.mongodb.net/"
  const clinet = mongodb.MongoClient
  const server = await clinet.connect(url)
  const db = server.db("stepup")
  const collection = db.collection('users')
  const reuslt = await collection.find({}).toArray()
  res.send(reuslt)
});

router.post('/register/:loc', async function (req, res, next) {  // receive the req
  try {
    // take the data from req
    const name = req.query.name
    const loc = req.params.loc
    const phone = req.headers.phone;
    const email = req.body.email;

    //connect with DB

    const url = "mongodb+srv://stepup:stepup@stepup8am.znntnil.mongodb.net/"
    const clinet = mongodb.MongoClient
    const server = await clinet.connect(url)
    const db = server.db("stepup")
    const collection = db.collection('users')
    // perform some operations
    const result = await collection.insertOne({ name, loc, phone, email })
    // prepare thr rs
    // send it back to client
    res.send(result);
  } catch (ex) {
    console.error(ex);
    res.send(ex.message);
  } finally {

  }
})

module.exports = router;
