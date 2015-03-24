'use strict'

function todaysDate() {
  var today = new Date().toJSON().split('T')[0];
  return today
}

function checkSettings() {
  // *** Function incomplete
  //
  var msg;

  if (!navigator.cookieEnabled) {
    msg = 'Cookies are currently disabled. Please enable cookies.';

    // document.getElementById('demo').innerHTML = cookieStatus;
    console.log(msg);
  }
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
  var e = document.getElementsByClassName('modal-body')[0];
  var tmpa = [];
  var tmpb;
  var tmpc = [];
  var str;

  tmpa = ['collectionComment', 'claimNumber', 'eobDate', 'checkNumber', 'checkDate'];
  str = ['', 'Claim #', 'EOB date', 'Check&thinsp;/&thinsp;EFT number', 'Check&thinsp;/&thinsp;Eft date'];

  tmpa.forEach(function(el, index){
    tmpb = document.getElementById(el).value;
    if (tmpb) {
      if (index) tmpc.push(str[index] + ': ' + tmpb);
      else tmpc.push(tmpb);
    }
  })

  e.innerHTML = tmpc.join('</br>');
}

var tableBody = document.getElementsByTagName('tbody')[0];
var tableRow = tableBody.innerHTML;
function addTableRow() {
  tableBody.innerHTML += tableRow;
}

function removeTableRow() {
  var tableBody = document.getElementsByTagName('tbody')[0];
  var arr = tableBody.innerHTML.split('</tr>');

  arr.splice(arr.length-2, 1);	// compensate for the empty string at end
  tableBody.innerHTML = arr.join('</tr>');
}

window.onload = function() {
  checkSettings();
  updateDate('input');
}
