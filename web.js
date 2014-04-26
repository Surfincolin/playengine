var express = require("express");
var logfmt = require("logfmt");
var mongo = require("mongodb");
var path = require('path');
var api = require('infusionsoft-api');

var app = express();

//var infusionsoft = new api.DataContext('pc183', '08595c541d3112ff21d18545b9ef7fcd');
var infusionsoft = new api.DataContext('st109', '415f720a8209bbdda5060635f7f28930');

var mongoUri = process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';
var BSON = require('mongodb').pure().BSON;
var ObjectID = require('mongodb').ObjectID;

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(logfmt.requestLogger());
app.use(allowCrossDomain);
app.use(express.static(path.join(__dirname, 'public')));


function saveRecord(item, callback) {
    if (item._id !== undefined) {
        item._id = new ObjectID(item._id);
        mongo.Db.connect(mongoUri, function (err, db) {
        db.collection('filstats', function(er, collection) {
            collection.save(item, {safe: true}, function(er,rs) {
                if (er) {
                    console.log(er);
                } else {
                    console.log("SAVE RECORD");
                    callback(rs);
                }
            });
        });
    });
    } else {
    item.created = new Date().getTime();
    mongo.Db.connect(mongoUri, function (err, db) {
        db.collection('filstats', function(er, collection) {
            collection.save(item, {safe: true}, function(er,rs) {
                if (er) {
                    console.log(er);
                } else {
                    console.log("CREATE RECORD");
                    callback(rs);
                }
            });
        });
    });

    }
}

mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('filstats', function(er, collection) {
            collection.find().toArray(function(err, items) {
                console.log(items);
                //res.send(items);
            });
        });
    });

function addTag(viewId, evAct) {
    console.log(viewId + ":ACTION:" + evAct);
    infusionsoft.ContactService
            .addToGroup(viewId, evAct)
            .done(function(result) {
                console.log(result);
            });
}

app.get('/stats', function(req, res) {
	/*var timeWatched = Math.round(req.query.watched/100)/10;*/
    var evAct = req.query.evAct;
    //console.log(req.query);
    var userInfo = req.query;
    userInfo.evAct = null;

    function proRecord(item1, item2) {
        saveRecord(item1, function (result) {
            if (result === 0) {
                console.log("Error Updating");
            } else if (result === 1) {
                res.send(item1);
            } else {
                res.send(result);
            }
        });
    }


    if (userInfo.viewId !== "" && (userInfo.viewId % 2) == 0) {

        if (evAct == 391)
            {
            userInfo.evPlay0 = 'true';
            console.log("first play by ID:" + userInfo.viewId);
            addTag(userInfo.viewId, evAct);
            proRecord(userInfo);
            }
        else if (evAct == 393)
            {
            userInfo.evPlay1 = 'true';
            console.log("1 hour event:" + userInfo.viewId);
            addTag(userInfo.viewId, evAct);
            proRecord(userInfo);
            }
        else if (evAct == 395)
            {
            userInfo.evPlay2 = 'true';
            userInfo.evPlay1 = 'true';
            console.log("2 hour event:" + userInfo.viewId);
            addTag(userInfo.viewId, evAct);
            proRecord(userInfo);
            }
        else if (evAct == 397)
            {
            userInfo.evPlay3 = 'true';
            userInfo.evPlay2 = 'true';
            userInfo.evPlay1 = 'true';
            console.log("3 hour event:" + userInfo.viewId);
            addTag(userInfo.viewId, evAct);
            proRecord(userInfo);
            }
        else if (evAct == 399)
            {
            userInfo.evPlay4 = 'true';
            userInfo.evPlay3 = 'true';
            userInfo.evPlay2 = 'true';
            userInfo.evPlay1 = 'true';
            console.log("4 hour event:" + userInfo.viewId);
            addTag(userInfo.viewId, evAct);
            proRecord(userInfo);
            }
        else if (evAct == 401)
            {
            userInfo.evPlay5 = 'true';
            userInfo.evPlay4 = 'true';
            userInfo.evPlay3 = 'true';
            userInfo.evPlay2 = 'true';
            userInfo.evPlay1 = 'true';
            console.log("5 hour event:" + userInfo.viewId);
            addTag(userInfo.viewId, evAct);
            proRecord(userInfo);
            }
        else if (evAct == 403)
            {
            userInfo.evPlay6 = 'true';
            userInfo.evPlay5 = 'true';
            userInfo.evPlay4 = 'true';
            userInfo.evPlay3 = 'true';
            userInfo.evPlay2 = 'true';
            userInfo.evPlay1 = 'true';
            console.log("6 hour event:" + userInfo.viewId);
            addTag(userInfo.viewId, evAct);
            proRecord(userInfo);
            }
        else if (evAct == 405)
            {
            userInfo.evPlay7 = 'true';
            userInfo.evPlay6 = 'true';
            userInfo.evPlay5 = 'true';
            userInfo.evPlay4 = 'true';
            userInfo.evPlay3 = 'true';
            userInfo.evPlay2 = 'true';
            userInfo.evPlay1 = 'true';
            console.log("7 hour event:" + userInfo.viewId);
            addTag(userInfo.viewId, evAct);
            proRecord(userInfo);
            }
        else if (evAct == 407)
            {
            userInfo.evPlay8 = 'true';
            userInfo.evPlay7 = 'true';
            userInfo.evPlay6 = 'true';
            userInfo.evPlay5 = 'true';
            userInfo.evPlay4 = 'true';
            userInfo.evPlay3 = 'true';
            userInfo.evPlay2 = 'true';
            userInfo.evPlay1 = 'true';
            console.log("8 hour event:" + userInfo.viewId);
            addTag(userInfo.viewId, evAct);
            proRecord(userInfo);
            }
        else if (evAct == 0)
            {
            console.log("CLOSED event:" + userInfo.viewId);
            proRecord(userInfo);
            }
        else
        {
            console.log("--wrong actions--");
            proRecord(userInfo);          
        };

    } else {

        if (evAct == 391)
            {
            userInfo.evPlay0 = 'true';
            console.log("first play!");
            proRecord(userInfo);
            }
        else if (evAct == 393)
            {
            userInfo.evPlay1 = 'true';
            console.log("1 hour event!");
            proRecord(userInfo);
            }
        else if (evAct == 395)
            {
            userInfo.evPlay2 = 'true';
            userInfo.evPlay1 = 'true';
            console.log("2 hour event!");
            proRecord(userInfo);
            }
        else if (evAct == 397)
            {
            userInfo.evPlay3 = 'true';
            userInfo.evPlay2 = 'true';
            userInfo.evPlay1 = 'true';
            console.log("3 hour event!");
            proRecord(userInfo);
            }
        else if (evAct == 399)
            {
            userInfo.evPlay4 = 'true';
            userInfo.evPlay3 = 'true';
            userInfo.evPlay2 = 'true';
            userInfo.evPlay1 = 'true';
            console.log("4 hour event!");
            proRecord(userInfo);
            }
        else if (evAct == 401)
            {
            userInfo.evPlay5 = 'true';
            userInfo.evPlay4 = 'true';
            userInfo.evPlay3 = 'true';
            userInfo.evPlay2 = 'true';
            userInfo.evPlay1 = 'true';
            console.log("5 hour event!");
            proRecord(userInfo);
            }
        else if (evAct == 403)
            {
            userInfo.evPlay6 = 'true';
            userInfo.evPlay5 = 'true';
            userInfo.evPlay4 = 'true';
            userInfo.evPlay3 = 'true';
            userInfo.evPlay2 = 'true';
            userInfo.evPlay1 = 'true';
            console.log("6 hour event!");
            proRecord(userInfo);
            }
        else if (evAct == 405)
            {
            userInfo.evPlay7 = 'true';
            userInfo.evPlay6 = 'true';
            userInfo.evPlay5 = 'true';
            userInfo.evPlay4 = 'true';
            userInfo.evPlay3 = 'true';
            userInfo.evPlay2 = 'true';
            userInfo.evPlay1 = 'true';
            console.log("7 hour event!");
            proRecord(userInfo);
            }
        else if (evAct == 407)
            {
            userInfo.evPlay8 = 'true';
            userInfo.evPlay7 = 'true';
            userInfo.evPlay6 = 'true';
            userInfo.evPlay5 = 'true';
            userInfo.evPlay4 = 'true';
            userInfo.evPlay3 = 'true';
            userInfo.evPlay2 = 'true';
            userInfo.evPlay1 = 'true';
            console.log("8 hour event!");
            proRecord(userInfo);
            }
        else if (evAct == 0)
            {
            console.log("CLOSED event!");
            proRecord(userInfo);
            }
        else
        {
            console.log("guest record saved");
            proRecord(userInfo);
    }

    }
    //res.end('{"success" : "Updated Successfully", "status" : 200}');

});




var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});