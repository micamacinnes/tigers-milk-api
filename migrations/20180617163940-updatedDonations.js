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
  db.createTable('donations', {
    donations_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true,
      unsigned: false,
    },
    charity_id: {
      type: 'int',
      notNull: true,
      unsigned: false,
      // foreign key
      foreignKey: {
        name: 'charity_id',
        table: 'charity',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: {
          charity_id: 'charity_id'
        }
      }
    },
    user_id: {
      type: 'int',
      notNull: true,
      unsigned: false,
      // foreign key
      foreignKey: {
        name: 'user_id',
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
    donation_amount: {
      type: 'int'
    }, 
    date_donated: {
      type: 'date'
    },
    payment_id: {
      type: 'int',
      notNull: true,
      unsigned: false,
      // foreign key
      foreignKey: {
        name: 'payment_id',
        table: 'payment-method',
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
  db.dropTable('donations', callback);
};

exports._meta = {
  "version": 1
};
