'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.addColumn('user', 'password', {
    type: 'string',
    length: 2000,
  }, function(err) {
    if (err) return callback(err);
    db.removeColumn('user', 'password', callback);
  });
};

exports.down = function(db, callback) {
  db.addColumn('user', 'password', {
    type: 'string',
    length: 40
  }, function(err) {
    if (err) return callback(err);
      db.removeColumn('user', 'password', callback);
    
  });
  // return null;
};

exports._meta = {
  "version": 1
};
