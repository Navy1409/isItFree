const express= require('express');
const db=require('./db/connect');
const authRoutes= require('./routes/auth.route')

const app=express();

db.connectPostgres();

app.listen(3000, () => {
  console.log('Server running');
});

app.use(express.json());  

app.use('/auth',authRoutes)

