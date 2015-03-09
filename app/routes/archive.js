'use strict'

var Document = App.model('document');
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

function create(req, res) {
  var visitNumber = req.params.visitNumber;
  var tmpa = visitNumber && custom.isInt(visitNumber) ? 'archive/create' : 'error/general';
  res.render(tmpa, {
    title: 'Create an outbound document for visit ' + visitNumber,
    visitNumber: visitNumber
  });
}

function addNew(req, res) {
  console.log(req.body);
  var data = {
    visitNumber: req.params.visitNumber,
    body: req.body.editor,
    type: req.body.type
  };
  var d = new Document(data);

  d.save(function(err){
    if (err)
      res.status(422).send('Problem: ' + err.message);

    res.redirect('/archive');
  });
}

module.exports = {
  index: index,
  create: create,
  addNew: addNew
}
