var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://mike:test1234@ds051534.mongolab.com:51534/testwknd04');
mongoose.model('Message', new Schema({"name": String, "message": String}, {collection: 'messages'}));
var Message = mongoose.model('Message');

router.post('/data', function (req, res) {
    //console.log(req);
    var addedMessage = new Message({
        "name" : req.body.namePost,
        "message" : req.body.messagePost
    });

    addedMessage.save(function(err, data){
        if(err) console.log(err);
        res.send(data);
    });
});

router.get('/data', function(req,res) {

    Message.find({}, function(err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        //console.log(data);
        res.send(data);
    });

});

router.delete('/data/', function(req, res){
    console.log(req.body.id);

    Message.findByIdAndRemove({"_id" : req.body.id}, function(err, data){
        if(err) console.log (err);
        res.send(data);
    });
});

//router.get("/admin", function(req,res){
//    var file = req.params[0] || "views/admin.html";
//    res.sendFile(path.join(__dirname, "../public/", file));
//});

router.get("/*", function(req,res){
    var file = req.params[0] || "views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});

module.exports = router;