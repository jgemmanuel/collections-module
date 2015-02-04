function isInt(value) {
    var er = /^-?[0-9]+$/;
    return er.test(value);
}

module.exports = {
  isInt: isInt
}
