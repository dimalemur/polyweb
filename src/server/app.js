
let express = require('express');

let app = express();

app
    .use(express.static("../../public/build/"))
    .get('/', (req, res) => {
        res.sendfile('index.html');
        
    })
    .get('/img', (req, res) => {
        res.sendfile('../../public/build/index.html');
        
    });

app.listen(3000, () => {
    console.log('Server is started!');
})