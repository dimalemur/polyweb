
let express = require('express');
var path = require('path');
let app = express();

app
    .use(express.static(path.join(__dirname, "../../public/build/")))
    .use('/login/authhelp/', express.static(path.join(__dirname, "../../public/build/")))


app.listen(3000, () => {
    console.log('Server is started! in http://127.0.0.1:3000/');
})