//get paths list from source and destination points
export function GetPossibleRoutsFromSourceToDestination(source, destination, allPathList){
	let sotoreTwons =[];
	let pathSum = 0;
	let traversedCities = [];
	let sotorePath =[];
		
	const getAllRoutes = (cityPoint, subCities, destinationCity)=>{	 
	  let currentCount = cityPoint.cost	  
	  sotoreTwons.push(cityPoint.city);
	  pathSum = pathSum + cityPoint.cost;

	  subCities.forEach((elements)=>{
	    if(!traversedCities.includes(elements.city)){
	      	traversedCities.push(elements.city);    
	      	getRoutesFromSourceToDestination(elements, destinationCity);
	    }	  
	  });	  
	  if(cityPoint.city === destinationCity){	    
	    sotorePath.push({rootlist:[...sotoreTwons], rootCost:pathSum});   
	  }
	  traversedCities.pop();
	  sotoreTwons.pop();
	  pathSum  = pathSum - currentCount;
	}

	const getRoutesFromSourceToDestination =(sourceCity, destinationCity)=>{

	  allPathList.forEach((item)=>{   
	    if(item[sourceCity.city]){
	      getAllRoutes(sourceCity, item[sourceCity.city], destinationCity);
	    }	    
	  });

	}
	getRoutesFromSourceToDestination(source, destination);
	return sotorePath;

}

