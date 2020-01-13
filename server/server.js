const express = require('express');
const path = require('path');
const os = require("os");
const request = require('request');
const multer = require('multer');

var fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

const client_id = 'glSHQedHpNBlwaF8I_D0';
const client_secret = 'F3tPDnL2Ng';

app.use(express.static(path.join(__dirname, '..', 'public/')));
// app.use(express.static(path.join(__dirname, '..', 'build/')));

// if you need api routes add them here
app.get("/api/getUsername", function(req, res, next){
    res.send({ username: os.userInfo().username });
});

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

app.post('/api/celeb', upload.single('image'), (req, res) => {

    const api_url = 'https://openapi.naver.com/v1/vision/celebrity';
    const api_url2 = 'https://openapi.naver.com/v1/vision/face';

    const file_name = req.file.filename;
    var _formData = {
        image:'image',
        image: fs.createReadStream(path.resolve('../human-face/uploads/' + file_name))
      };
    
    var _req = request.post({url:api_url, formData: _formData,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}}).on('response', function(response) {
         console.log(response.statusCode) // 200
         console.log(response.headers['content-type'])
      });

    console.log( request.head  );
    _req.pipe(res);
})

app.post('/api/face', upload.single('image'), (req, res) => {

  const api_url = 'https://openapi.naver.com/v1/vision/face';

  const file_name = req.file.filename;
  var _formData = {
      image:'image',
      image: fs.createReadStream(path.resolve('../human-face/uploads/' + file_name))
    };
  
  var _req = request.post({url:api_url, formData: _formData,
      headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}}).on('response', function(response) {
       console.log(response.statusCode) // 200
       console.log(response.headers['content-type'])
    });

  console.log( request.head  );
  _req.pipe(res);
})

app.listen(PORT, () => {
console.log(`Check out the app at http://localhost:${PORT}`);
});