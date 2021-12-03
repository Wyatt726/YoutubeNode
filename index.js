const mongoose = require('mongoose');



mongoose
    .connect('mongodb+srv://wyatt726:Number11@youtube.qkzxr.mongodb.net/videos?retryWrites=true&w=majority',
    {useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log('ConnectedtoMongoDB...'))
    .catch((err)=>console.log(`CouldnotconnecttoMongoDB.ERROR:${err}`));