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
  db.createTable('userPaymentMap', {
    paymentMap_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true,
      unsigned: false,
    },
    user_id: {
      type: 'int',
      unsigned: false,
      // foreign key
      foreignKey: {
        name: 'user_id_FK',
        table: 'user',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: {
          user_id: 'user_id'
        }
      }
    },
    payment_id: {
      type: 'int',
      unsigned: false,
      // foreign key
      foreignKey: {
        name: 'payment_id_FK',
        table: 'payment',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: {
          payment_id: 'payment_id'
        }
      }
    }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('userPaymentMap', callback);
};

exports._meta = {
  "version": 1
};
