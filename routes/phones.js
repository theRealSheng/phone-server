
'use strict';

const express = require('express');
const router = express.Router();
const Phone = require('../models/phone');
const fsPromise = require('fs').promises;
const fs = require('fs');

const upload = require('../configs/multer');

router.get('/', (req, res, next) => {
  Phone.find({})
    .then((phones) => res.json(phones))
    .catch(next);
});

router.post('/', upload.single('file'), async (req, res, next) => {
  const formData = await req.body;
  const phoneJSON = JSON.parse(formData.phone);
  phoneJSON.image = `uploads/${formData.name}`;
  const newPhone = Phone(phoneJSON);

  return newPhone.save()
    .then(() => res.json(newPhone))
    .catch(next)
});

router.post('/delete/:id', async (req, res, next) => {
  const imagePath = `public/${req.body.photoId}`;
  const fileExist = await fs.existsSync(imagePath);
  if (fileExist) {
    await fsPromise.unlink(imagePath);
  }

  return Phone.deleteOne({ id: req.params.id})
    .then(() => res.send({ status: '200', response: 'success' }))
    .catch(next)
});

router.put('/update-with-image', upload.single('file'), async (req, res, next) => {
  const formData = await req.body;
  const phoneJSON = JSON.parse(formData.phone);
  const imagePath = `public/${formData.oldPhoto}`;
  const fileExist = await fs.existsSync(imagePath);
  if (fileExist) {
    await fsPromise.unlink(imagePath);
  }
  phoneJSON.image = `uploads/${formData.name}`;

  return Phone.findOneAndUpdate({ _id: phoneJSON._id}, phoneJSON)
    .then(() => res.json(phoneJSON))
    .catch(next)
});

router.put('/update', async (req, res, next) => {
  const phoneUpdate = await req.body;

  return Phone.findOneAndUpdate({ _id: phoneUpdate._id}, phoneUpdate)
    .then(() => res.json(phoneUpdate))
    .catch(next)
});

module.exports = router;