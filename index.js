const express = require("express");
const XMLHttpRequest = require('xhr2');
const bodyParser = require("body-parser");
const DBconnect = require("./src/config/db");
const serverless = require("serverless-http");
const userRoutes = require("./src/routes/userRoutes");
const mobilRoutes = require("./src/routes/mobilRoutes");
require("dotenv").config();

DBconnect();
const app = express();
const router = express.Router();
const xhr = new XMLHttpRequest();
const port = process.env.PORT || 3000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const sendInd = `<h3>FIRST API<br><br>api user: /api/user<br>add user: /api/add/user <- params (nama, alamat)<br><br>api mobil: /api/mobil<br>add mobil: /api/add/user <- params (nama, tahun, harga, user)</h3>`

// route
app.get('/', (req, res) => {
	res.send(sendInd)
  })
app.use("/api/user", userRoutes);
app.use("/api/mobil", mobilRoutes);
app.use(`/.netlify/functions/api`, router);

app.get('/api/add/user', (req, res) => {
    const nama = req.query.nama
    const alamat = req.query.alamat
	xhr.open("POST", "https://api-argya.herokuapp.com/api/user", true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify({
		"nama" : nama,
		"alamat": alamat
	}));
	res.redirect('/api/user')
})

app.get('/api/add/mobil', (req, res) => {
    const nama = req.query.nama
    const tahun = req.query.tahun
    const harga = req.query.harga
    const user = req.query.user
	xhr.open("POST", "https://api-argya.herokuapp.com/api/mobil", true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify({
		"nama" : nama,
		"tahun": tahun,
		"harga": harga,
		"user": user
	}));
	res.redirect('/api/mobil')
})

app.listen(port, () => {
	console.log(`Server running in ${port}`);
});

module.exports = app;
module.exports.handler = serverless(app);
