function TestCase(Config){
  this.config = Config;
  this.setUp = {};
  this.tearDown = {};
  this.batteries = {};
  this.arraybatteries = [];
  this.vars = {}

  this.setUp.js = '';
  this.tearDown.js = '';
  
  this.addTest = function(battery,expression,result,name,msjError,onBefore){
    battery.test[name] = {
      expression:expression,
      result:result,
      name:name,
      msjError:msjError,
      onBefore:onBefore
    };
    
    battery.arrayTest.push(battery.test[name]);
  };
  
  this.addTestBattery = function(nameBattery){
    this.batteries[nameBattery] = {};
    this.batteries[nameBattery].setUp = {};
    this.batteries[nameBattery].tearDown = {};
    this.batteries[nameBattery].test = {};
    this.batteries[nameBattery].arrayTest = [];
    this.batteries[nameBattery].name = nameBattery;
    
    this.batteries[nameBattery].setUp.js = '';
    this.batteries[nameBattery].tearDown.js = '';
    
    this.arraybatteries.push(this.batteries[nameBattery]);
    
    return this.batteries[nameBattery];
  };
  
  this.test = function(){
     if(this.setUp.js){
     	this.setUp.js();
     }
    var variables 	= this.vars;
    var contTotal 	= 0;
    var contError 	= 0;
    var contOk		= 0;
    var totalFinal	= 0;
    
    for(var i = 0; i < this.arraybatteries.length; i++){
      var currentBattery = this.arraybatteries[i];

      if(currentBattery.setUp.js){
        currentBattery.setUp.js();
      }
      
      for(var j = 0; j < currentBattery.arrayTest.length; j++){
      	contTotal++;

        var currentTest = currentBattery.arrayTest[j];
        
        if(currentTest.onBefore){
          currentTest.onBefore();
        }
        
        try{
          var result = currentTest.expression(variables);
        }catch(error){
          var result = error
        }

        if(result === currentTest.result){
          contOk++;
          console.info(currentTest.name,':','ok');
        }else{
          contError++;
          console.info('bateria:',currentBattery.name,'test:',currentTest.name,':',currentTest.msjError,',resultado esperado:',currentTest.result,',resultado final:',result);
        }
      }

      if(currentBattery.tearDown.js){
        currentBattery.tearDown.js();
      }
    }

    totalFinal = (contOk == 0) ? 0 : (1/(contTotal)*contOk)*100;

    console.info('Se procesaron ' + contTotal + ' pruebas con el ' + totalFinal + '% de efectividad');

    if(this.tearDown.js){
    	this.tearDown.js();
    }
  };
}
