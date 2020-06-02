var socket = io(); //extablece la comuniCACION cliente-servidor
document.getElementById("btn-init").addEventListener("click", function(){//evento para cuando el boton sea presionado
  console.log("inicio");
  socket.emit('comando', "Y"); // el evento se llama comando, y se envia el dato 'Y'
});
document.getElementById("btn-fin").addEventListener("click", function(){
  console.log("fin");
  socket.emit("comando", 'N') //el evento se llama comando y se envia 'N'
})

let counter = 0; //contador para los paquetes de datos que llegan por el serial

////********** Datos recibidos ****///////////
socket.on("telemetria", function(dataSerial) { //inicia recepcion de datos del cliente  con el evento "telemetria"

  let calib = document.getElementById("calibracion");
  if(dataSerial.paquete > 130){
    calib.innerHTML = "Calibrado!";
  } else {calib.innerHTML = "Calibrando...";}

  let cuenta = document.getElementById("paquete");
  cuenta.innerHTML = dataSerial.paquete;

  let tabAltura = document.getElementById("tab-altura"); //es el dato de altura que se muestra en las tablas
  tabAltura.innerHTML = dataSerial.altura; //modifica el dato de altura en la tabla

  let tabPre = document.getElementById("tab-pre");
  tabPre.innerHTML = dataSerial.presion;

  let tabTem = document.getElementById("tab-tem");
  tabTem.innerHTML = dataSerial.temperatura;

  let tabVol = document.getElementById("tab-vol");
  tabVol.innerHTML = dataSerial.voltaje;

  console.log(dataSerial.corriente);
  let tabI = document.getElementById("tab-i");
  tabI.innerHTML = dataSerial.corriente;

  console.log(dataSerial.tiempo);
  let tabUTC = document.getElementById("UTC");
  tabUTC.innerHTML = dataSerial.tiempo;

  console.log(dataSerial.latitud);
  let tabLat = document.getElementById("tab-lat");
  tabLat.innerHTML = dataSerial.latitud;

  console.log(dataSerial.longitud);
  let tabLon = document.getElementById("tab-lon");
  tabLon.innerHTML = dataSerial.longitud;

  console.log(dataSerial.altitud);
  let tabAlt = document.getElementById("tab-alt");
  tabAlt.innerHTML = dataSerial.altitud;

  console.log(dataSerial.satelites);
  let tabSat = document.getElementById("tab-sat");
  tabSat.innerHTML = dataSerial.satelites;

  console.log(dataSerial.angX);
  let anguloX = document.getElementById("tab-x");
  anguloX.innerHTML = dataSerial.angX;

  console.log(dataSerial.angY);
  let anguloY = document.getElementById("tab-y");
  anguloY.innerHTML = dataSerial.angY;

  console.log(dataSerial.angZ);
  let anguloZ = document.getElementById("tab-z");
  anguloZ.innerHTML = dataSerial.angZ;

  console.log(dataSerial.lux);
  let ilum = document.getElementById("tab-lux");
  ilum.innerHTML = dataSerial.lux;

  ///Altura
  graficaAltura.data.labels.push(counter); // agrega el numero del contador a labels en la grafica (chart)
  graficaAltura.data.datasets.forEach(dataset => {
    dataset.data.push(dataSerial.altura); //agrega el dato de altura a data en la grafica
  });
  //segundo dato a graficar PRESION
  graficaPresion.data.labels.push(counter);
  graficaPresion.data.datasets.forEach(dataset => {
    dataset.data.push(dataSerial.presion);
  });
  //Tercer dato a graficar Temperatura junto con label
  graficaTemperatura.data.labels.push(counter);
  graficaTemperatura.data.datasets.forEach(dataset => {
    dataset.data.push(dataSerial.temperatura);
  });
  //cuarto dato a graficar Voltaje
  graficaVoltaje.data.labels.push(counter);
  graficaVoltaje.data.datasets.forEach(dataset => { //ejecuta la función indicada una vez por cada elemento del array
    dataset.data.push(dataSerial.voltaje);
  });
  //grafica de la Corriente
  graficaCorriente.data.labels.push(counter);
  graficaCorriente.data.datasets.forEach(dataset => {
    dataset.data.push(dataSerial.corriente);
  });
//iluminacion
  graficaIluminacion.data.labels.push(counter);
  graficaIluminacion.data.datasets.forEach(dataset => { //ejecuta la función indicada una vez por cada elemento del array
    dataset.data.push(dataSerial.lux);
  });

  counter++;
  //se actualizan graficas
  graficaAltura.update();
  graficaPresion.update();
  graficaTemperatura.update();
  graficaVoltaje.update();
  graficaIluminacion.update();
  graficaCorriente.update();

});
////////////*********graficas************////////////////7///
// grafica 1 Altura
var ctx = document.getElementById('grafica-altura').getContext('2d');
var graficaAltura = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',
  // The data for our dataset
  data: {
    labels: [],
    datasets: [{
      label: 'altura[m]',
      //backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(23, 32, 42)',
      data: []
    }]
  },
  // Configuration options go here
  options: {}
});

//Grafica 2 Presion
var ctx = document.getElementById('grafica-presion').getContext('2d');
var graficaPresion = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',
  // The data for our dataset
  data: {
    labels: [],
    datasets: [{
      label: 'presion[Pa]',
      //backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(30,144,255)',
      data: []
    }]
  },
  // Configuration options go here
  options: {}
});
//grafica 3 Temperatura
var ctx = document.getElementById('grafica-temperatura').getContext('2d');
var graficaTemperatura = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels: [],
    datasets: [{
      label: 'temperatura[°C]',
      //backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(230, 126, 34)',
      data: []
    }]
  },
  // Configuration options go here
  options: {}
});
//grafica 4 Voltaje
var ctx = document.getElementById('grafica-voltaje').getContext('2d');
var graficaVoltaje = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',
  // The data for our dataset
  data: {
    labels: [],
    datasets: [{
      label: 'Voltaje[V]',
      //backgroundColor: 'rgb(26, 82, 118)',
      borderColor: 'rgb(26, 82, 118)',
      data: []
    }]
  },
  // Configuration options go here
  options: {}
});

//grafica 5 corriente
var ctx = document.getElementById('grafica-corriente').getContext('2d');
var graficaCorriente =new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Corriente [mA]',
      borderColor: 'rgb(231, 76, 60)',
      data: []
    }]
  },
  options:{}
});

//grafica 6 luz ambiental
var ctx = document.getElementById('grafica-iluminacion').getContext('2d');
var graficaIluminacion = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',
  // The data for our dataset
  data: {
    labels: [],
    datasets: [{
      label: 'iluminacion [lux]',
      //backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(247, 220, 111)',
      data: []
    }]
  },
  // Configuration options go here
  options: {}
});
