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

function overview(req, res) {
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

function editGet(req, res) {
  var visitNumber = req.params.visitNumber;
  res.render('visits/edit', {
    title: 'Edit Visit ' + visitNumber,
    visitNumber: visitNumber
  })
}

function editPost(req, res) {
  console.log(req.body)
  var visitNumber = req.params.visitNumber;
  Visit.findOneAndUpdate({visitNumber: visitNumber}, {
    comments: {
      author: '',
      body: req.body.comment,
      created: Date.now,
      modified: Date.now
    },
    carrier: {
      name: '',
      cob: '',
      claimNumber: req.body.claimNumber,
      eobDate: req.body.eobDate,
      checkNumber: req.body.checkNumber,
      checkDate: req.body.checkDate
    }
  }, function(err, visit) {
    if (err) throw err;

    res.redirect('back');
  })
}

function createGet(req, res) {
  Visit.find(function(err, visits) {
    if (err) throw err;

    if (!visits) console.log('No visits found!');

    Carrier.find(function(err, carriers) {
      var tmp;
      if (err) throw err;
      if (!carriers) console.log('No carriers found!');

      tmp = [];
      carriers.forEach(function(carrier) {
	tmp.push(carrier.name);
      })

      res.render('visits/create', {
	title: 'Create Visits',
	visits: visits,
	carrierNames: tmp
      });

    });
  });
}

function createPost(req, res) {
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

module.exports = {
  index: index,
  overview: overview,
  editGet: editGet,
  editPost: editPost,
  createGet: createGet,
  createPost: createPost
}
