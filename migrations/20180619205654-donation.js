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

exports.up = function(db, done) {
  db.createTable('donations', {
    id: {
      type: 'int',
      primaryKey: 'true',
      autoIncrement: 'true',
      notNull: true
    },

    charityID: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'charityIDDonationsFk',
        table: 'charity',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
  
    userID: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'userIDDonationsFk',
        table: 'user',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },

    amount: {
      type: 'int',
      notNull: 'true',
    },

    date: {
      type: 'string',
      notNull: 'true',
    },

  }, done );
};

exports.down = function(db, done) {
  db.dropTable('donations', done)
};

exports._meta = {
  "version": 1
};