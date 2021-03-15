const FormData = require('form-data');
const express = require('express');
const path = require('path');
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

const API_BASE_URL = 'https://openapi.naver.com/v1/vision';
const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, callback) {
      const fileType = file.mimetype.split('/')[1];
      callback(null, `${uuidv4()}.${fileType}`);
    },
  }),
});

app.post('/api/celeb', upload.single('image'), async (req, res) => {
  try {
    const API_URL = API_BASE_URL + '/celebrity';
    const { path } = req.file;

    const formData = new FormData();
    formData.append('image', fs.createReadStream(path));

    const response = await axios.post(API_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        'X-Naver-Client-Id': CLIENT_ID,
        'X-Naver-Client-Secret': CLIENT_SECRET,
      },
    });

    fs.unlink(path, (err) => {
      if (err) throw err;
    });

    return res.status(200).send(response.data);
  } catch (err) {
    console.log(err);
  }
});

app.post('/api/face', upload.single('image'), async (req, res) => {
  try {
    const API_URL = API_BASE_URL + '/face';
    const { path } = req.file;

    const formData = new FormData();
    formData.append('image', fs.createReadStream(path));

    const response = await axios.post(API_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        'X-Naver-Client-Id': CLIENT_ID,
        'X-Naver-Client-Secret': CLIENT_SECRET,
      },
    });

    fs.unlink(path, (err) => {
      if (err) throw err;
    });

    return res.status(200).send(response.data);
  } catch (err) {
    console.log(err);
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'build/')));
}

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
