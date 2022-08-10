const mongoose = require("mongoose");
const config = require("../config");
const User = require("../models/User");
const Oferta = require("../models/Oferta");
const Meta = require("../models/Metadata");
const https = require('https');
const filterService = require("../service/filterService")

const connectDB = async () => {
  try {
    console.log('po');
    await mongoose.connect(config.db.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
     //primerPobladoBD()  //<---- Ejecutar solo cuando se quieren poblar todos los datos.
    updateDBData();
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    console.log("Something went wrong with Database connection");
    process.exit(1);
  }
};

const testf = async (time)=> {
    setTimeout(() => {
      setTimeout(() => {
       console.log("Timeout Done1");
        User.findOne({username:"PepeLuis"},function (err, user){
          console.log(user.username)
          console.log(user.password)
        },null,function () {
          console.log("Callback");
        });
       return 1;
     }, time);
    console.log("Timeout Done2");
    return 1;
  }, time);


   User.findOne({username:"Pepe"},function (err, user){
    console.log(user.username)
    console.log(user.password)
  },null,function () {
    console.log("Callback");
  });
  let output = '';
  const options = {
    host: 'https://opendata.aragon.es/GA_OD_Core/preview?view_id=308&filter_sql=fecha_publicacion=%2226/08/2021%22&_page=1',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  //https://opendata.aragon.es/GA_OD_Core/preview?view_id=305&filter_sql=fecha_publicacion=%2226/08/2021%22&_page=1
  const req = https.get('https://opendata.aragon.es/GA_OD_Core/preview?view_id=305&_page=1', (res) => {
    console.log(`${options.host} : ${res.statusCode}`);
    res.setEncoding('utf8');
    console.log(res)

    res.on('data', (chunk) => {
      output += chunk;
    });

    res.on('end', () => {
      let obj = JSON.parse(output);
      console.log(obj);
      console.log(obj[724][18]);
      var string = obj[724][18]
      console.log(string)
      var split = string.split("/");
      console.log(split);
      var ref = new Date(parseInt(split[2]),parseInt(split[1])-1,parseInt(split[0]),0,0,0,0);
      var sp = new Date(parseInt(split[2]),parseInt(split[1])-1,parseInt(split[0]),0,ref.getTimezoneOffset()*-1,0,0);
      var now = new Date(Date.now());
      var ex = new Date(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getTimezoneOffset()*-1,now.getSeconds(),now.getMilliseconds());
      console.log(ref.toISOString());
      console.log(sp.toISOString());
      console.log(now.toISOString());
      console.log(ex.toISOString());



    });
  });
  req.end();


};

const primerPobladoBD = async ()=> {
  console.log('Iniciando Primer Poblado en la BD')

  let output = '';
  const req = https.get('https://opendata.aragon.es/GA_OD_Core/preview?view_id=305&_page=1', (res) => {
    console.log(`Peticion : ${res.statusCode}`);
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      output += chunk;
    });

    res.on('end', () => {
      let array = [Oferta];
      let obj = JSON.parse(output);
      console.log('Obtenidas '+obj.length+ ' entradas');
      for (let i = 1; i < obj.length; i++) {
        if(obj[i][9]!=null && obj[i][10]!=null){//Si las fechas de presentacion son no nulas, que las hay

          let ofertaToInsert = new Oferta({
            fuente: obj[i][0],
            f_publicacion: stringDatetoISODate(obj[i][1]),
            tipo: obj[i][2],
            denominacion: obj[i][3],
            convocante: obj[i][4],
            url: obj[i][5],
            f_inicioPresentacion: stringDatetoISODate(obj[i][9]),
            f_finPresentacion: stringDatetoISODate(obj[i][10]),
            contacto: obj[i][13],
            titulo: obj[i][15],
            plazas: obj[i][20],
            filters: filterService.obtainFilters(obj[i][0],obj[i][4]),
            createdByUser: false
          });
          console.log('Procesano '+i+' de '+obj.length);
          array.push(ofertaToInsert);
        }
      }
      Oferta.create(array,null,err =>{
        if (err) {
          console.log("Algo ha ido mal con el create multiple");
        }
        console.log('Creados '+ array.length+' elementos');
        var now = new Date(Date.now());
        var ex = new Date(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getTimezoneOffset()*-1,now.getSeconds(),now.getMilliseconds());
        var stday ;
        var stmonth;
        if((ex.getMonth()+1)<10){
          stmonth='0'+(ex.getMonth()+1);
          console.log(stmonth)
        }
        else{
          stmonth=ex.getMonth()+1;
        }
        if(ex.getDate()<10){
          stday='0'+ex.getDate();
        }
        else{
          stday=ex.getDate();
        }

        var st = stday+'/'+stmonth+'/'+ex.getFullYear();
        let data = new Meta({
          type: 'LastDay',
          value: st,
        });
        Meta.create(data);
      })
    });
  });
  req.end();
};

function stringDatetoISODate(string) {
  var split = string.split("/");
  var ref = new Date(parseInt(split[2]),parseInt(split[1])-1,parseInt(split[0]),0,0,0,0);
  var date = new Date(parseInt(split[2]),parseInt(split[1])-1,parseInt(split[0]),0,ref.getTimezoneOffset()*-1,0,0);
  return date.toISOString();
}
function stringDatetoDate(string) {
  var split = string.split("/");
  var ref = new Date(parseInt(split[2]),parseInt(split[1])-1,parseInt(split[0]),0,0,0,0);
  var date = new Date(parseInt(split[2]),parseInt(split[1])-1,parseInt(split[0]),0,ref.getTimezoneOffset()*-1,0,0);
  return date;
}

const updateDBData = async ()=> {
  console.log('Iniciando Update de datos en la BD')

  Meta.findOne({type: "LastDay"}, (err,lastUp)=> {


  let lastUpVal = lastUp.value;
  let lastUpDate = stringDatetoDate(lastUpVal);
  let lastUpISO = stringDatetoISODate(lastUpVal);


    let now = new Date(Date.now());
  let yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, now.getTimezoneOffset() * -1, 5, 0);
  let yesterdayISO = yesterday.toISOString();


  if (lastUpISO > yesterdayISO) {
    console.log(lastUpISO+' > '+yesterdayISO);
    return;
  }
  if (yesterdayISO > lastUpISO) {
    console.log(lastUpISO+' < '+yesterdayISO);

    let output = '';
    url = 'https://opendata.aragon.es/GA_OD_Core/preview?view_id=305&filters={%22fecha_publicacion%22:%22' + lastUpVal + '%22}'
    const req = https.get(url, (res) => {
      console.log(lastUpVal+` : ${res.statusCode}`);
      console.log(url);
      res.setEncoding('utf8');

      res.on('data', (chunk) => {
        output += chunk;
      });

      res.on('end', () => {
        let array = [Oferta];
        let obj = JSON.parse(output);
        console.log('Obtenidas ' + obj.length + ' entradas');
        for (let i = 0; i < obj.length; i++) {
          if (obj[i].fecha_inicio_presentacion != null && obj[i].fecha_fin_presentacion != null) {//Si las fechas de presentacion son no nulas, que las hay

            let ofertaToInsert = new Oferta({
              fuente: obj[i].fuente,
              f_publicacion: stringDatetoISODate(obj[i].fecha_publicacion),
              tipo: obj[i].tipo,
              denominacion: obj[i].denominacion,
              convocante: obj[i].organo_convocante,
              url: obj[i].enlace,
              f_inicioPresentacion: stringDatetoISODate(obj[i].fecha_inicio_presentacion),
              f_finPresentacion: stringDatetoISODate(obj[i].fecha_fin_presentacion),
              contacto: obj[i].datos_contacto,
              titulo: obj[i].titulo,
              plazas: obj[i].num_plazas_detectado,
              filters: filterService.obtainFilters(obj[i].fuente, obj[i].organo_convocante),
              createdByUser: false
            });
            console.log('Procesando ' + i + ' de ' + obj.length);
            array.push(ofertaToInsert);
          }
        }
         Oferta.create(array, null, err => {
          if (err) {
            console.log("Algo ha ido mal con el create multiple");
          }
          console.log('Creados ' + array.length - 1 + ' elementos');
          var ex = new Date(lastUpDate.getFullYear(), lastUpDate.getMonth(), lastUpDate.getDate() + 1, 0, lastUpDate.getTimezoneOffset() * -1, 0, 0);
          lastUpDate = ex;
          lastUpISO = ex.toISOString();
          console.log(lastUpISO);
          var lastday ;
          var lastmonth;
          if((lastUpDate.getMonth()+1)<10){
            lastmonth='0'+(lastUpDate.getMonth()+1);
          }
          else{
            lastmonth=lastUpDate.getMonth()+1;
          }
          if(lastUpDate.getDate()<10){
            lastday='0'+lastUpDate.getDate();
          }
          else{
            lastday=lastUpDate.getDate();
          }

          lastUpVal = lastday+'/'+lastmonth+'/'+lastUpDate.getFullYear();
          lastUp.value = lastUpVal
          console.log(lastUp);
          Meta.updateOne({type: 'LastDay'}, {$set:lastUp}, (err,lastUp)=> {
            if(err){console.log(err);}
            else console.log(lastUp);
            updateDBData();
          });
        })
      });
    });
    req.end();
  }
  //updateDBData();
  });
}

module.exports = connectDB;
