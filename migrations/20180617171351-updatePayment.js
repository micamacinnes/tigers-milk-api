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
  db.createTable('payment', {
    payment_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true,
      unsigned: false,
    },
    name: {
      type: 'string',
      length: 40
    },
    card_number: {
      type: 'int',
      length: 16
    }, 
    security_code: {
      type: 'int'
    },
    exp_month: {
      type: 'int'
    }, 
    exp_year: {
      type: 'int'
    },
    bank: {
      type: 'string',
      length: 40
    }
  }, callback);

};

exports.down = function(db, callback) {
  db.dropTable('payment', callback);
};

exports._meta = {
  "version": 1
};
