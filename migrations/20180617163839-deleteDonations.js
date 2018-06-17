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

exports.up = function (db, callback) {
  db.dropTable('donations', callback);
};

exports.down = function (db, callback) {
  db.createTable('donations', {
    donations_id: {
      type: 'int',
      primaryKey: true
    },
    charity_id: {
      type: 'int',
      // foreign key
    },
    user_id: {
      type: 'int',
      // foreign key
    },
    donation_amount: {
      type: 'int'
    }, 
    date_donated: {
      type: 'date'
    },
    payment_id: {
      type: 'int',
      // foreign key
    }
  }, callback);
};

exports._meta = {
  "version": 1
};
