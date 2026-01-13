const { Pool }= require('pg');
require('dotenv').config()

const pool =new Pool({
    connectionString: process.env.DATABASE_URL
});

const connectPostgres = async()=>{
    try{
        await pool.query('SELECT NOW()')
        console.log('DB CONNECTION');     
    }
    catch(err){
        console.log("Not connected");
        console.log(err);
        
    }
}

module.exports={
    connectPostgres,
    pool
}