'use strict'

function todaysDate() {
  var today = new Date().toJSON().split('T')[0];
  return today
}

function checkSettings() {
  // *** Function incomplete
  //
  var cookieStatus;

  if (navigator.cookieEnabled == true)
    cookieStatus = 'Cookies are enabled.';
  else
    cookieStatus = 'Cookies are not enabled.';

  document.getElementById('demo').innerHTML = cookieStatus;
}

function updateDate(el) {
  // Given a tag name as an input, this function searches for the string
  // 'today' and replaces it with today's date.
  var i, tmpa;
  tmpa = document.getElementsByTagName(el);
  for (i = 0; i < tmpa.length; i++) { // TODO: improve loop
    if (tmpa[i].min === 'today')
      tmpa[i].min = todaysDate();
    else if (tmpa[i].max === 'today')
      tmpa[i].max = todaysDate();
  };
}

function generateComment() {
  var comment = document.getElementById('collectionComment').value;
  var claimNumber = document.getElementById('claimNumber').value;
  var eobDate = document.getElementById('eobDate').value;
  var checkNumber = document.getElementById('checkNumber').value;
  var checkDate = document.getElementById('checkDate').value;
  var e = document.getElementsByClassName('modal-body')[0];
  var tmpa = [];
  var tmpb;
  var tmpc = [];

  tmpa = ['collectionComment', 'claimNumber', 'eobDate', 'checkNumber', 'checkDate'];

  tmpa.forEach(function(el){
    tmpb = document.getElementById(el).value;
    if (tmpb) {
      if (el === 'collectionComment') tmpc.push(tmpb);
      if (el === 'claimNumber') tmpc.push('Claim #: ' + tmpb);
      if (el === 'eobDate') tmpc.push('EOB date: ' + tmpb);
      if (el === 'checkNumber') tmpc.push('Check / EFT #: ' + tmpb);
      if (el === 'checkDate') tmpc.push('Check / EFT date: ' + tmpb);
    }
  })

  e.innerHTML = tmpc.join('</br>');
}

window.onload = function() {
  updateDate('input');
}
