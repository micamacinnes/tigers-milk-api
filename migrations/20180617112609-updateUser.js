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
 db.changeColumn('user', 'user_id', {
  type: 'int',
  autoIncrement: true,
  notNull: true,
  unsigned: false,
 }, callback);
};

exports.down = function(db, callback) {
  db.changeColumn('user', 'user_id', {
    type: 'int',
    autoIncrement: false,
    notNull: true,
    unsigned: false,
  }, callback)
};

exports._meta = {
  "version": 1
};
