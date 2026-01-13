const express= require('express');
const db=require('./db/connect');

const app=express();

db.connectPostgres();

app.listen(3000, () => {
  console.log('Server running');
});
