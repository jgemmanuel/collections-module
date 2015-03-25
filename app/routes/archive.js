'use strict'

var Document = App.model('document');
var Visit = App.model('visit');
var custom = App.require('custom');

function index(req, res) {
  Document.find(function(err, documents){
    if (err) throw err;

    if (!documents) console.log('Archive is empty!');

    res.render('archive/index', {
      title: 'Archived Documents',
      documents: documents
    });
  });
}

function createGet(req, res) {
  var visitNumber = req.params.visitNumber;
  var tmpa = visitNumber && custom.isInt(visitNumber) ? 'archive/create' : 'error/general';
  Visit.findOne({visitNumber: visitNumber}, function(err, visit) {
    if (err) throw err;

    res.render(tmpa, {
      title: 'Create an outbound document for visit ' + visitNumber,
      visitNumber: visitNumber,
      carriers: visit.carrier
    });
  });
}

function createPost(req, res) {
  console.log(req.body);
  var data = {
    visitNumber: req.params.visitNumber,
    body: req.body.editor,
    type: req.body.type,
    carrier: req.body.carrier
  };
  var d = new Document(data);

  d.save(function(err){
    if (err)
      res.status(422).send('Problem: ' + err.message);

    Visit.findOneAndUpdate({visitNumber: data.visitNumber}, {archived: true}, function(err) {
      if (err) throw err;

      res.redirect('/archive');
    });
  });
}

module.exports = {
  index: index,
  createGet: createGet,
  createPost: createPost
}
