'use strict';
const fs = require('fs');
const path = require('path');

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */

function loadSql(fileName){
  return fs.readFileSync(
    path.join(__dirname, '..', 'sql', fileName),
    'utf8'
  );
}
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.runSql(
    loadSql('create-users-table.up.sql')
  )
};

exports.down = function (db) {
  return db.runSql(
    loadSql('create-users-table.down.sql')
  )
};


exports._meta = {
  "version": 1
};
