const express = require('express');
const path = require('path');
const request = require('request');
const multer = require('multer');

var fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

if(process.env.NODE_ENV === 'production') app.use(express.static(path.join(__dirname, '..', 'build/')));
else app.use(express.static(path.join(__dirname, '..', 'public/')));

const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/');
      },
      filename: function (req, file, cb) {
        cb(null, new Date().valueOf() + path.extname(file.originalname));
      }
    }),
  });

app.post('/api/celeb', upload.single('image'), async (req, res) => {

    const api_url = 'https://openapi.naver.com/v1/vision/celebrity';

    const file_name = req.file.filename;
    const file_path = path.resolve('../app/uploads/' + file_name);

    var _formData = {
        image:'image',
        image: fs.createReadStream(file_path)
      };
    
    var _req = await request.post({url:api_url, formData: _formData,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}}).on('response', function(response) {
         console.log(response.statusCode)
         console.log(response.headers['content-type'])
      });

    fs.unlink(file_path, function() {
    });
    console.log( request.head  );
    _req.pipe(res);
})

app.post('/api/face', upload.single('image'), async(req, res) => {

  const api_url = 'https://openapi.naver.com/v1/vision/face';

  const file_name = req.file.filename;
  const file_path = path.resolve('../app/uploads/' + file_name);

  var _formData = {
      image:'image',
      image: fs.createReadStream(file_path)
    };
  
  var _req = await request.post({url:api_url, formData: _formData,
      headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}}).on('response', function(response) {
       console.log(response.statusCode) // 200
       console.log(response.headers['content-type'])
    });

  console.log( request.head  );
  fs.unlink(file_path, function() {
  });
  _req.pipe(res);
})

app.listen(PORT, () => {
console.log(`Check out the app at http://localhost:${PORT}`);
});