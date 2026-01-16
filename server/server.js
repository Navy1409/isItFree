const express= require('express');
const db=require('./db/connect');
const authRoutes= require('./routes/authRoute')
const userRoutes= require('./routes/userRoute')
const organisationRoutes=require('./routes/organisations.route')

const app=express();

db.connectPostgres();

app.listen(3000, () => {
  console.log('Server running');
});

app.use(express.json());  

app.use('/auth',authRoutes)
app.use('/organisations',organisationRoutes);
app.use('/user',userRoutes)

