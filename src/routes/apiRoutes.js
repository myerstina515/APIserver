'use strict';

const express = require('express');
const router = express.Router();
const Collection = require('../models/dataCollection');
const client = new Collection();
const { sendNotification } = require('../utils/mailer');


router.get('/', handleGetAll);
router.get('/:id', handleGetOne);
router.post('/', handleAdd);
router.put('/:id', handleUpdate);
router.delete('/:id', handleDelete);

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
    let inquiry = req.body;
    let newRecord = await client.create(inquiry);
    await sendNotification(req.body);
    res.status(201).json({
      message: 'Inquiry saved and email sent!',
      record: newRecord
    });
    console.log('local test: email send successfully')
 } catch (e) {
   console.error('Error in handleAdd:', e.message);
    // If anything fails (DB or Email), send the error once
    res.status(500).json({ error: e.message });
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