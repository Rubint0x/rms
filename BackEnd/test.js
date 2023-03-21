var NodeRSA = require('node-rsa');
var fs = require('fs');

var key = new NodeRSA({b:512});
function encrypt() {
    fs.readFile('./private.pem', function (err, data) {
    var key = new NodeRSA(data);
    let cipherText = key.encryptPrivate('123456', 'base64');
    console.log(cipherText);
    });
   }
   //generator();
encrypt();
// var text = "123456";

// var encrtpted = nodersa.encrypt(text,'base64');

// console.log(encrtpted);