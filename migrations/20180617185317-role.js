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
  db.createTable('role', {
    role_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true,
      unsigned: false,
    },
    role: {
      type: 'string',
      length: 30
    }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('role', callback);
};

exports._meta = {
  "version": 1
};
