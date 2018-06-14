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
  db.createTable('payment-method', {
    payment_id: {
      type: 'int',
      primaryKey: true
    },
    user_id: {
      type: 'int',
      // foreign key
    },
    card_number: {
      type: 'string'
    }, 
    security_code: {
      type: 'string'
    },
    exp_date: {
      type: 'date'
    }, 
    bank_name: {
      type: 'string'
    }
  })
  return callback();
};

exports.down = function(db, callback) {
  db.dropTable('payment-method', callback);
};

exports._meta = {
  "version": 1
};
