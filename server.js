////****Socket IO*******//////
const express = require("express");
const app = express();
//var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.use(express.static(__dirname + '/public')); // se crea la carpeta public para poder mandar el script y el docuemnto de css, OBLIGATORIO!!

io.on("connection", function(socket) { //conexion entre el servidor y el cliente
  console.log("a user connected");
});


/////////******Serial port**********////////////////
// puerto de Xbee lado derecho /dev/tty.usbserial-A9K2JVHI      /dev/cu.usbserial-A9K2JVHI
// puerto arduino /dev/cu.usbmodemFD121
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/cu.usbserial-A9K2JVHI', {
  baudRate: 9600
});
const parser = port.pipe(new Readline({ //LEERÁ los datos que terminen con un salto de linea (\r\n)
  delimiter: '\r\n'
}));

port.on("open", () => { //conexion entre el servidor y el serial
  console.log("comunicacion abierta");
});

///*****CSV*****//////////
// const fs = require("fs");
// var csv = require("fast-csv");
// var ws = fs.createWriteStream("my.csv");
// let arr =[];

parser.on("data", datos => { //transformamos los datos recibidos por el serial en un arreglo
  console.log(datos);
  let tele = datos.split(",");// cada valor separado por una coma es un elemento del arreglo
  console.log(tele);
  //console.log(tele[1]);
  io.emit("telemetria", { //enviamos los datos del servidor al cliente  con el evento telemetria
    paquete:tele[0].toString(),
    altura: tele[1].toString(),
    presion: tele[2].toString(),
    temperatura: tele[3].toString(),
    voltaje: tele[4].toString(),
    corriente: tele[5].toString(),
    tiempo: tele[6].toString(),
    latitud: tele[7].toString(),
    longitud: tele[8].toString(),
    altitud: tele[9].toString(),
    satelites: tele[10].toString(),
    angX: tele[11].toString(),
    angY: tele[12].toString(),
    angZ: tele[13].toString(),
    lux: tele[14].toString()
  });
});
http.listen(3000, function() {
  console.log("listening on port 3000");
});
