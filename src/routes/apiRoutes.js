'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
const Collection = require('../models/dataCollection');
const client = new Collection();
// console.log('made it to the routes page');
// console.log('this is the collection', Collection);
// console.log('this is the client', client);
app.use(cors());

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});
const whitelist = ['http://localhost:3000', 'https://tedashi-trained.herokuapp.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// const allowlist = ['http://localhost:3000', 'https://tedashi-trained.herokuapp.com']
// const corsOptionsDelegate = function (req, callback) {
//   let corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }
console.log('Made it to API routes page!');

router.get('/', cors(corsOptions), handleGetAll);
router.get('/:id', cors(corsOptions), handleGetOne);
router.post('/', cors(corsOptions), handleAdd);
router.put('/:id', cors(corsOptions), handleUpdate);
router.delete('/:id', cors(corsOptions), handleDelete);

async function handleGetAll(req, res) {
  console.log('made it in the get all function');
  try {
    console.log('this is the request', req);
    let allclients = await client.get();
    res.status(200).json(allclients);
 } catch (e) {
   throw new Error(e.message)
 }
}
async function handleGetOne(req, res) {
 try {
  console.log('this is the request', req);
    const id = req.params.id;
    let oneclient = await client.get(id)
    res.status(200).json(oneclient);
 } catch (e) {
   throw new Error(e.message)
 }
}
async function handleAdd(req, res) {
 try {
  console.log('this is the request', req);
    let obj = req.body;
    let newRecord = await client.create(obj);
    res.status(201).json(newRecord);
 } catch (e) {
   throw new Error(e.message)
 }
}
async function handleUpdate(req, res) {
 try {
  console.log('this is the request', req);
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await client.update(id, obj)
    res.status(200).json(updatedRecord);
 } catch (e) {
   throw new Error(e.message)
 }
}
async function handleDelete(req, res) {
 try {
    let id = req.params.id;
    let deletedRecord = await client.delete(id);
    res.status(200).json(deletedRecord);
 } catch (e) {
   throw new Error(e.message)
 }
}

module.exports = router;