'use strict'

var Visit = App.model('visit');
var Carrier = App.model('carrier');
var Comment = App.model('comment');

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
  Visit.findOne({visitNumber: visitNumber}, function(err, v){
    if (err) throw err;
    if (!v) console.log('No visit found for the visit ' + visitNumber + '!');

    Comment.find({visitNumber: visitNumber}, function(err, comments) {
      if (err) throw err;
      if (!comments) console.log('No comments found for the visit ' + visitNumber + '!');

      res.render('visits/overview', {
	title: v.visitNumber + ' | SYNERGEN', // TODO: fix bug here
	visit: v,
	comments: comments
      });
    });
  });
}

function editGet(req, res) {
  var visitNumber = req.params.visitNumber;
  Visit.findOne({visitNumber: visitNumber}, function(err, visit) {
    if (err) throw err;

    res.render('visits/edit', {
      title: 'Edit Visit ' + visitNumber,
      visitNumber: visitNumber,
      visit: visit
    });
  });
}

function editPost(req, res) {	// TODO: include for carrier and group number
  console.log(req.body)
  var visitNumber = req.params.visitNumber;
  console.log(visitNumber);
  var comment = new Comment({
    visitNumber: visitNumber,
    body: req.body.comment,
    claimNumber: req.body.claimNumber,
    eobDate: req.body.eobDate,
    paymentNumber: req.body.paymentNumber,
    paymentDate: req.body.paymentDate,
    modified: new Date()
  });

  Visit.findOneAndUpdate({visitNumber: visitNumber}, {status: req.body.status}, function(err) {
    if (err) throw err;
  });

  comment.save(function(err){
    if (err)
      res.status(422).send('Problem: ' + err.message);

    res.redirect('/visits/' + visitNumber);
  });
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
  var tmpa = [];
  tmp.carrierName = tmp.carrierName.filter(Boolean); // remove empty strings
  tmp.carrierName.forEach(function(carrier, i) {
    tmpa.push(i);
  });
  var v = new Visit({
    visitNumber: tmp.visitNumber,
    billType: tmp.billType,
    cpt: tmp.cpt,
    unitCharge: tmp.unitCharge,
    carrier: tmp.carrierName,
    cob: tmpa,
    specimenCode: tmp.specimenCode
  });

  v.save(function(err){
    if (err)
      res.status(422).send('Problem: ' + err.message);

    res.redirect('/visits/' + req.body.visitNumber);
  });
}

module.exports = {
  index: index,
  overview: overview,
  editGet: editGet,
  editPost: editPost,
  createGet: createGet,
  createPost: createPost
}
