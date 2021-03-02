'use strict';

const express = require('express');
const cors = require('cors');
const router = express.Router();
const Collection = require('../models/dataCollection');
const client = new Collection();
// console.log('made it to the routes page');
// console.log('this is the collection', Collection);
// console.log('this is the client', client);
app.use(cors());

var allowlist = ['http://localhost:3000', 'https://tedashi-trained.herokuapp.com']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
console.log('Made it to API routes page!');

router.get('/', cors(corsOptionsDelegate), handleGetAll);
router.get('/:id', cors(corsOptionsDelegate), handleGetOne);
router.post('/', cors(corsOptionsDelegate), handleAdd);
router.put('/:id', cors(corsOptionsDelegate), handleUpdate);
router.delete('/:id', cors(corsOptionsDelegate), handleDelete);

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