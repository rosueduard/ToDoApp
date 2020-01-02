var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  var myobj = [
    { name: 'Apa', done: false},
    { name: 'Bere', done: false},
    { name: 'Paine', done: true},
    { name: 'Dero', done: false}
  ];
  dbo.collection("list").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
