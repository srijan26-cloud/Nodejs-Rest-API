const { urlencoded } = require('express');
const express = require('express');
const app = express();

var PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(urlencoded({extended:false}))
app.use('/api/users' , require('./routes/api/users'))

var server = app.listen(PORT , () =>{
    var host = server.address().address
    var port = server.address().port
    console.log(`Listening at host- ${host} Port- ${port}`)
})