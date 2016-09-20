var automigrate = require('../automigrate/automigrate');

module.exports.bootstrap = function(cb) {

  var pathlist = sails.config.appPath+'/migrations/';

  automigrate.auto(pathlist, function (err) {
    if (err) return cb(err);
    else return cb();
  });
};
