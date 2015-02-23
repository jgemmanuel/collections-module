'use strict'

var Visit = App.model('visit');
var Carrier = App.model('carrier');

function index(req, res) {
  Visit.find(function(err, visits){
    if (err) throw err;

    if (!visits) console.log('No visits found!');

    res.render('visits/index', {
      title: 'All Visits',
      visits: visits
    });
  });
}

function edit(req, res) {
  var visitNumber = req.params.visitNumber;
  Visit.find({visitNumber: visitNumber}, function(err, v){
    if (err) throw err;

    v = v[0];

    if (!v) console.log('No visit found for the visit provided!');

    res.render('visits/overview', {
      title: v.visitNumber + ' | SYNERGEN', // TODO: fix bug here
      visit: v
    });
  });
}

function create(req, res, next) {
  console.log(req.body);
  var tmp = req.body;
  var v = new Visit({
    visitNumber: tmp.visitNumber,
    billType: tmp.billType,
    cpt: tmp.cpt,
    unitCharge: tmp.unitCharge,
    // carrier: tmp.carrierName[0], // TODO: include secondary et al.
    specimenCode: tmp.specimenCode
  });

  v.markModified('lines');
  v.save(function(err){
    if (err)
      res.status(422).send('Problem: ' + err.message);

    res.redirect('/visits/' + req.body.visitNumber);
  })
}

function addNew(req, res) {
  res.render('visits/create', {
    title: 'Create Visit'
  });
}

module.exports = {
  index: index,
  create: create,
  edit: edit,
  addNew: addNew
}
