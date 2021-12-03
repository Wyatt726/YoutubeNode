const mongoose = require('mongoose');
const config = require('config');

function connectDB(){
    mongoose.connect
            (config.get('mongoURI'),
            {useNewUrlParser:true,useUnifiedTopology:true})
        .then(() => console.log('ConnectedtoMongoDB...'))
        .catch((err) => {
            console.log(`CouldnotconnecttoMongoDB.ERROR:${err}`);
            process.exit(1);
        });
    }
    
    module.exports=connectDB;