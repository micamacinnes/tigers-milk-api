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
  db.createTable('RoleMap', {
    roleMap_id: {
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
        name: 'user_id_foreign',
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
    role_id: {
      type: 'int',
      unsigned: false,
      // foreign key
      foreignKey: {
        name: 'role_id_FK',
        table: 'role',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: {
          role_id: 'role_id'
        }
      }
    }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('RoleMap', callback);
};

exports._meta = {
  "version": 1
};
