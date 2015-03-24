'use strict'

var Visit = App.model('visit');
var Carrier = App.model('carrier');

function index(req, res) {
  Carrier.find(function(err, carriers){
    if (err) throw err;

    if (!carriers) console.log('No carriers found!');

    res.render('carriers/index', {
      title: 'Carrier List',
      carriers: carriers
    });
  });
}

function overview(req, res) {
  var carrierName = req.params.carrierName;
  Carrier.find({name: carrierName}, function(err, c){
    if (err) throw err;

    c = c[0];			// bug?

    if (!c) console.log('No visit found for the visit provided!');

    res.render('carriers/overview', {
      title: c.name,
      carrier: c
    });
  });
}

function createGet(req, res) {
  res.render('carriers/create', {
    title: 'Create Carrier'
  });
}

function createPost(req, res, next) {
  console.log(req.body);
  var tmp = req.body;
  var c = new Carrier({
    name: tmp.carrierName,
    description: tmp.description,
    providerPortal: tmp.portal
  });

  c.save(function(err){
    if (err)
      res.status(422).send('Problem: ' + err.message);

    res.redirect('/carriers/' + req.body.carrierName);
  })

}

module.exports = {
  index: index,
  createGet: createGet,
  createPost: createPost,
  overview: overview
}
