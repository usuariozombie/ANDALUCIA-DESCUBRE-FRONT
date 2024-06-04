let express = require('express');

let app = express();

app.use(express.static(__dirname + '/dist/andalucia-descubre'));

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/dist/andalucia-descubre/index.html');
});

app.listen(process.env.PORT || 8080);