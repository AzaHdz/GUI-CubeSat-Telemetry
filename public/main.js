const socket = io(); //extablece la comuniCACION cliente-servidor

let counter = 0; //contador para los paquetes de datos que llegan por el serial


////********** Datos recibidos ****///////////
socket.on("telemetria", function(dataSerial) { //inicia recepcion de datos del cliente  con el evento "telemetria"
  ///Altura
  console.log(dataSerial.altura);
  chart.data.labels.push(counter); // agrega el numero del contador a labels en la grafica (chart)
  chart.data.datasets.forEach(dataset => {
    dataset.data.push(dataSerial.altura); //agrega el dato de altura a data en la grafica
    let altura = document.getElementById("dato:altura"); //es la etiqueta mostrada arriba de la grafica de altura
    altura.innerHTML = "Altura: " + dataSerial.altura + "  [m]"; //modifica el dato de la etiqueta con cada paquete recibido
    let tabAl = document.getElementById("tab-alt"); //es el dato de altura que se muestra en las tablas
    tabAl.innerHTML = dataSerial.altura; //modifica el dato de altura en la tabla
  });

  //segundo dato a graficar PRESION
  console.log(dataSerial.presion);
  chart2.data.labels.push(counter);
  chart2.data.datasets.forEach(dataset => {
    dataset.data.push(dataSerial.presion);
    let pres = document.getElementById("dato:presion");
    pres.innerHTML = "Presion: " + dataSerial.presion + "  [KPa]";
    let tabPre = document.getElementById("tab-pre");
    tabPre.innerHTML = dataSerial.presion;
  });

  //Tercer dato a graficar Temperatura junto con label
  console.log(dataSerial.temperatura);
  chart3.data.labels.push(counter);
  chart3.data.datasets.forEach(dataset => {
    dataset.data.push(dataSerial.temperatura);
    let temp = document.getElementById("dato:temperatura");
    temp.innerHTML = "Temperatura: " + dataSerial.temperatura + " [°C]";
    let tabTem = document.getElementById("tab-tem");
    tabTem.innerHTML = dataSerial.temperatura;
  });

  //cuarto dato a graficar Voltaje
  console.log(dataSerial.voltaje);
  chart4.data.labels.push(counter);
  chart4.data.datasets.forEach(dataset => { //ejecuta la función indicada una vez por cada elemento del array
    dataset.data.push(dataSerial.voltaje);
    let vol = document.getElementById("dato:voltaje");
    vol.innerHTML = "Voltaje: " + dataSerial.voltaje + " [V]";
    let tabVol = document.getElementById("tab-vol");
    tabVol.innerHTML = dataSerial.voltaje;
  });

  //   //grafica del gps
  console.log(dataSerial.longitud);
   chart5.data.labels.push(dataSerial.longitud);
   let tabLon = document.getElementById("tab-lon");
   tabLon.innerHTML = dataSerial.longitud;
   chart5.data.datasets.forEach(dataset => {
    dataset.data.push(dataSerial.latitud);
    let tabLat = document.getElementById("tab-lat");
    tabLat.innerHTML = dataSerial.latitud;

   });
  //   let vol = document.getElementById("dato:voltaje");
  //   vol.innerHTML = "Voltaje: "+ dataSerial.voltaje + " [V]";
   // });

let cuenta = document.getElementById("count");
cuenta.innerHTML = counter;

  counter++;

  //se actualizan graficas
  chart.update();
  chart2.update();
  chart3.update();
  chart4.update();
  chart5.update();
});

////////////*********graficas************////////////////7///
// grafica 1 Altura
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels: [],
    datasets: [{
      label: 'altura[m]',
      //backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(0, 128, 128)',
      data: []
    }]
  },
  // Configuration options go here
  options: {}
});

//Grafica 2 Presion
var ctx = document.getElementById('myChart2').getContext('2d');
var chart2 = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels: [],
    datasets: [{
      label: 'presion[KPa]',
      //backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(30,144,255)',
      data: []
    }]
  },
  // Configuration options go here
  options: {}
});

//grafica 3 Temperatura
var ctx = document.getElementById('myChart3').getContext('2d');
var chart3 = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels: [],
    datasets: [{
      label: 'temperatura[°C]',
      //backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255,69,0)',
      data: []
    }]
  },
  // Configuration options go here
  options: {}
});

//grafica 4 Voltaje
var ctx = document.getElementById('myChart4').getContext('2d');
var chart4 = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels: [],
    datasets: [{
      label: 'Voltaje[V]',
      //backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(0,100,0)',
      data: []
    }]
  },
  // Configuration options go here
  options: {}
});

// grafica 5 GPS
var ctx = document.getElementById('myChart5').getContext('2d');
var chart5 = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels: [],
    datasets: [{
      label: 'Voltaje[V]',
      //backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(0,100,0)',
      data: []
    }]
  },
  // Configuration options go here
  options: {}
});

//grafica 6 luz ambiental
var ctx = document.getElementById('myChart6').getContext('2d');
var chart6 = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels: [],
    datasets: [{
      label: 'Voltaje[V]',
      //backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(0,100,0)',
      data: []
    }]
  },
  // Configuration options go here
  options: {}
});
