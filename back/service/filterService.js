

function obtainFilters(fuente,convocante) {
  let array = [String];
  switch (fuente) {
    case "BOPH":{
      array.push("Huesca");
      break;
    }
    case "BOPT":{
      array.push("Teruel");
      break;
    }
    case "BOPZ":{
      array.push("Zaragoza");
      break;
    }
    case "BOA":{
      array.push("BOA");
      break;
    }
    default:{
      //Nothing
    }
  }

  if(convocante.toUpperCase().includes('UNIVERSIDAD')){
    array.push("Universidad");
  }
  if(convocante.toUpperCase().includes('AYUNTAMIENTO')){
    array.push("Ayuntamiento");
  }
  return array;
}

module.exports = {
  obtainFilters
}
