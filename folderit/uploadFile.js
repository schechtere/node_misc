var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('folderId', '415953');
data.append('file', fs.createReadStream('/C:/Users/ebschech/Pictures/wallaby.jpg'));
const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTgwMDM1ODEsIm5iZiI6MTYxODAwMzU4MSwiZXhwIjoxNjE4NjA4MzgxLCJkYXRhIjp7ImlkIjoyMTQyNX19.Sjsbp4DMHUkqrUZQct2JvRyiqYwgnWo0MBOd3PpB3Pg`;


var config = {
  method: 'post',
  url: 'https://api.folderit.com/files',
  headers: { 
    'Authorization': `Bearer ${token}`, 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
