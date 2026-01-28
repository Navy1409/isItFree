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
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

function loadSql(fileName){
  return fs.readFileSync(
    path.join(__dirname, '..', 'sql', fileName),
    'utf8'
  );
}

exports.up = function (db) {
  return db.runSql(
    loadSql('create-organisation-table.up.sql')
  )
};

exports.down = function (db) {
  return db.runSql(
    loadSql('create-organisation-table.up.sql')
  ) 
};


exports._meta = {
  "version": 1
};
