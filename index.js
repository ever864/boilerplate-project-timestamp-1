// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  let fechaParam = req.params.date;

  // Si no se proporciona ningún parámetro, utiliza la fecha actual
  if (!fechaParam) {
    fechaParam = new Date().getTime();
  }

  // Si el parámetro es un número, asume que es una fecha Unix
  if (!isNaN(fechaParam)) {
    fechaParam = parseInt(fechaParam);
  }

  let fecha = new Date(fechaParam);

  // Si la fecha es inválida, devuelve una respuesta de error
  if (isNaN(fecha.getTime())) {
    res.json({ error: "Fecha inválida" });
    return;
  }

  let fechaString = fecha.toUTCString();
  let fechaUnix = fecha.getTime();

  res.json({ unix: fechaUnix, utc: fechaString });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
