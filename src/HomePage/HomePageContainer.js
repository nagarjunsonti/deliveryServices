import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import RootInfoComponent from '../components/RootInfoComponent';
import DisplayrootComponent from '../components/DisplayrootComponent';
import {GetPossibleRoutsFromSourceToDestination} from '../Utility/Utility';
import {NEIGHBOR_TOWN_ERROR_TEXT, PATH_NOTAVAILABLE_ERROR_TEXT} from '../Constants/Constants';
function HomeContainer(props){
	const {sourceCity, destinationCity, availableRoutsList, townList, allRoutesForTowns } =props;
	const [displayData, setDisplayData] = useState({		
		midPointTowns :[],
		midPointText:"",
		midPointChepestpath:[],					
		availableRoutsList:[],
		overallavailablePathList:{},
		latestPrevousMidPointPaths:[],		
		pathCost:0		
	});
	let cheapestRoute = {};
	useEffect(()=>{
		setDisplayData({...displayData,
						midPointTowns :[],
						midPointText:"",
						overallavailablePathList:{},
						latestPrevousMidPointPaths:[],
						pathCost:0
		})
	},[sourceCity, destinationCity]);

	const showRouteIsnotAvailable = (type)=>{
		let text = (type === "neighbor")?NEIGHBOR_TOWN_ERROR_TEXT:PATH_NOTAVAILABLE_ERROR_TEXT;
		alert(text);
	}
	const checkForRouteavailablity = (availableRoutsList,allMidPointsList)=>{
		return allMidPointsList.every(v => availableRoutsList.includes(v));

	}
	const addSourceandDestination = (list)=>{
		let dataList = list ;
		dataList.unshift(sourceCity);
		dataList.push(destinationCity);
		return dataList;
	}
	const removeSourceandDestination = (list)=>{
		let dataList = list ;
		dataList.shift(sourceCity);
		let ItemIndex = dataList.indexOf(destinationCity);
		dataList.splice(ItemIndex, 1);
		return dataList;
	}
	const getMinimumCostFromPaths = (pathList)=>{
		let maximumNumber = Number.MAX_SAFE_INTEGER + 1;			
		let bestCost = maximumNumber;
		let bestRoot = "";
		pathList.forEach((path)=>{
			let pathCost = path.rootCost;
			if(pathCost  !== 0 && bestCost > pathCost){
				bestCost = pathCost;		
				bestRoot = path.rootlist;
			}
		});
		return {bestRoot:bestRoot, bestCost:bestCost};
	}
	
	const getBestPathCost = (selctedpath, availablePathList)=>{
		let maximumNumber = Number.MAX_SAFE_INTEGER + 1;			
		let bestCost = maximumNumber;
		let bestRoute = "";
		let routeAvaialable = false;
		availablePathList.forEach((route)=>{
				let avialable = false;
				let pathCost =route.rootCost;
				if(route.rootlist.length >= selctedpath.length){
					avialable = checkForRouteavailablity(route.rootlist, selctedpath);
				}				
				if(avialable){
					routeAvaialable = true;

					if(pathCost  !== 0 && bestCost > pathCost){
						bestCost = pathCost;
						bestRoute = 	route.rootlist;					
					}					
				}
		});
		bestCost = (bestCost === maximumNumber)?"" : bestCost;
		return {bestCost:bestCost, routeAvaialable : routeAvaialable, bestRoute: bestRoute};

	}
	const getPathCost = ()=>{
		const {midPointTowns, pathCost} =displayData;
		if(midPointTowns.length === 0){
			const selctedpath = [sourceCity, destinationCity];
			let responce =getBestPathCost(selctedpath, availableRoutsList);			
			cheapestRoute = responce;
			return responce.bestCost;						
		}else{
			return pathCost;
		}		
	}
	const getExactpathCost = ()=>{
		const {midPointTowns, overallavailablePathList, midPointText} =displayData;
		let rootCost="No Such Route";
		let overallLsit = [];
		const allMidPointsList = addSourceandDestination(JSON.parse(JSON.stringify(midPointTowns)));
		let midPointsLength = allMidPointsList.length;
		if(midPointText){			
			let tempList = JSON.parse(JSON.stringify(overallavailablePathList));
			overallLsit = getFormatedRoutes(tempList);
		}else{
			
			overallLsit = availableRoutsList;
		}		

		overallLsit.forEach((path)=>{
				let routeListLength = path.rootlist.length;
				if(routeListLength === midPointsLength){
					rootCost = path.rootCost;
				}
		});


		return rootCost;
	}
	const getCheapestRoute = ()=>{
		const {midPointTowns, midPointChepestpath} = displayData;
		if(midPointTowns.length === 0){
			return cheapestRoute;
		}else{
			let previusData=midPointChepestpath.previousPath;
			let nextData=midPointChepestpath.nextPath;
			let overallCost = midPointChepestpath.overallCost;
			return {bestRoute:[sourceCity, ...previusData, ...nextData, destinationCity], bestCost:overallCost};
		}
	}
	const mergeLatesCurentPreviosPaths = (previousPathList)=>{
		const {latestPrevousMidPointPaths} = displayData;

		let pathList = JSON.parse(JSON.stringify(previousPathList));

		let latstPreviousPathList = JSON.parse(JSON.stringify(latestPrevousMidPointPaths));

		let allPathList = [];
		latstPreviousPathList.forEach((latestPreviouspath)=>{			
			pathList.forEach((currentPreviousPath)=>{
				if(currentPreviousPath.rootlist.indexOf([sourceCity, destinationCity]) ===-1){
						let tempList = JSON.parse(JSON.stringify(currentPreviousPath));
						tempList.rootlist.shift();
						let routeCost = 0;				
						let routeList = [...latestPreviouspath.rootlist, ...tempList.rootlist ];
						routeCost = latestPreviouspath.rootCost + tempList.rootCost;
						allPathList.push({rootlist:routeList, rootCost:routeCost});
				}

			})
		});

		return (allPathList.length > 0)?allPathList:pathList;
	}
	const handleSelectMidpointDropDown = (midpointDestination)=>{
		if(midpointDestination === null){
			return true;
		}
		let allMidPointsList = JSON.parse(JSON.stringify(displayData.midPointTowns));		
		if(midpointDestination){			
		
			allMidPointsList = addSourceandDestination(allMidPointsList);			
			let allMidPointsListLength = allMidPointsList.length;

			if(allMidPointsList[allMidPointsListLength -1] === midpointDestination || allMidPointsList[allMidPointsListLength -2] === midpointDestination){
				showRouteIsnotAvailable("neighbor");
				setDisplayData({...displayData, midPointText:"" });
				return;
			}
			let previousPath = new Promise((resolve, reject) => {
		         		let previousAvailabalePathLists =GetPossibleRoutsFromSourceToDestination({city:allMidPointsList[allMidPointsListLength -2], cost:0}, midpointDestination, allRoutesForTowns);
		          		resolve(previousAvailabalePathLists);
		      	});
			let nextPath = new Promise((resolve, reject) => {
		         		let nextAvailabalePathLists =GetPossibleRoutsFromSourceToDestination({city:midpointDestination, cost:0}, allMidPointsList[allMidPointsListLength -1], allRoutesForTowns);
		          		resolve(nextAvailabalePathLists);
		     });
			let previousBestPath = {};
			let nextBestPath = {};
			Promise.all([previousPath, nextPath]).then((responce)=> {  					
  					let tempBestpath ="";
  					let latestPrevousMidPointPaths = mergeLatesCurentPreviosPaths(responce[0]);
  					previousBestPath = getMinimumCostFromPaths(latestPrevousMidPointPaths);
  					nextBestPath = getMinimumCostFromPaths(responce[1]);

  					allMidPointsList = removeSourceandDestination(allMidPointsList);
  					allMidPointsList.push(midpointDestination);
  					
  					let overallavailablePathList = {previousPath:latestPrevousMidPointPaths, nextPath:responce[1]};

  					tempBestpath = getMidPointChepestpath(previousBestPath, nextBestPath);
  					let overallCost = tempBestpath.overallCost;
  					setDisplayData({...displayData,
  									midPointTowns:[...allMidPointsList], 
									midPointText:midpointDestination, 
									pathCost:overallCost,
									overallavailablePathList:{...overallavailablePathList},
									midPointChepestpath:{...tempBestpath},
									latestPrevousMidPointPaths : [...latestPrevousMidPointPaths]
								});
			});					
		}else{
			setDisplayData({...displayData, midPointText:"" });
		}
		
	}
	const getMidPointChepestpath = (previousPath, nextPath)=>{
			const {midPointText} = displayData;
			let currentPreviousPath = JSON.parse(JSON.stringify(previousPath));
			let currentNextPath=JSON.parse(JSON.stringify(nextPath));

			currentPreviousPath.bestRoot.shift();
			currentNextPath.bestRoot.shift();
			currentNextPath.bestRoot.pop();
			let overallCost = previousPath.bestCost +  nextPath.bestCost;
			if(midPointText){				
				return {previousPath:[...currentPreviousPath.bestRoot],
						previousPathCost: currentPreviousPath.bestCost,
						nextPath:[...currentNextPath.bestRoot],
						nextPathCost:currentNextPath.bestCost,
						overallCost:overallCost
				};
			}else{

				return {previousPath:[...currentPreviousPath.bestRoot], 
						previousPathCost: currentPreviousPath.bestCost,
						nextPath:[...currentNextPath.bestRoot], 
						nextPathCost:currentNextPath.bestCost,
						overallCost:overallCost
			}		}
	}
	const getFormatedRoutes = (overallavailablePathList)=>{		
		let pathList = JSON.parse(JSON.stringify(overallavailablePathList));
		let pathPreviousList = [ ...pathList.previousPath ];
		let pathNextList = [ ...pathList.nextPath ];
		let allPathList = [];
		pathPreviousList.forEach((previousPath, previousIndex)=>{			
			pathNextList.forEach((nextpath, nextIndex)=>{
				if(previousPath.rootlist.toLocaleString().indexOf([sourceCity, destinationCity].toLocaleString()) ===-1){
					let tempList = JSON.parse(JSON.stringify(nextpath));
						tempList.rootlist.shift();
						let routeCost = 0;				
						let routeList = [...previousPath.rootlist, ...tempList.rootlist ];
						routeCost = previousPath.rootCost + tempList.rootCost;
						allPathList.push({rootlist:routeList, rootCost:routeCost});
				}

			})
		});

		return allPathList;
	}	
	const getMaximum4StopsRoute = ()=>{
		const {overallavailablePathList, midPointText} = displayData;
		const {availableRoutsList} = props;
		let maximum4StopPaths = [];
		let overallLsit = [];
		if(midPointText){			
			overallLsit = getFormatedRoutes(overallavailablePathList);
		}else{
			overallLsit = [...availableRoutsList];
		}

		overallLsit.forEach((value)=>{
				let arrayLength= value.rootlist.length;
				if(arrayLength <= 5 && value.rootCost !== 0){
					maximum4StopPaths.push(value);
				}
		});

		return maximum4StopPaths;
	}
	const getAllPosibleRoutesFor20Cost = ()=>{
		const {overallavailablePathList, midPointText} = displayData;
		const {availableRoutsList} = props;
		let maximum20CostPaths = [];
		let overallLsit = [];
		if(midPointText){ 			
			overallLsit = getFormatedRoutes(overallavailablePathList);
		}else{
			overallLsit = [...availableRoutsList];
		}

		overallLsit.forEach((value)=>{
				if(value.rootCost !== 0 && value.rootCost < 21){
					maximum20CostPaths.push(value);
				}
		});

		return maximum20CostPaths;
	}
	const getAllPosibleRoutes = ()=>{
		const {overallavailablePathList, midPointText} = displayData;
		const {availableRoutsList} = props;

		if(midPointText){
			return getFormatedRoutes(overallavailablePathList);
		}else{
			return availableRoutsList;
		}
	}
	return (
		<Container  maxWidth="lg">
      		<CssBaseline />
      		<div>		      	
		      <DisplayrootComponent 
		      	availableRoutsList={props.availableRoutsList}
                townList= {townList}
                destinationCity = {props.destinationCity}
                sourceCity = {props.sourceCity}
                allRoutesForTowns = {props.allRoutesForTowns}
                bestPathCost = {getPathCost()}
                handleSelectMidpointDropDown = {handleSelectMidpointDropDown}
                midPointTowns = {displayData.midPointTowns}
                dropDownValue = {displayData.midPointText || ""}
                exactpathCost = {getExactpathCost()}
                
		      />
            	<RootInfoComponent
            		availableRoutsList = {props.availableRoutsList}
            		getCheapestRoute = { getCheapestRoute }
            		destinationCity = {props.destinationCity}
                	sourceCity = {props.sourceCity}
                	overallavailablePathList = {displayData.overallavailablePathList}
                	getMaximum4StopsRoute = {getMaximum4StopsRoute}
                	getAllPosibleRoutes = {getAllPosibleRoutes}
                	getAllPosibleRoutesFor20Cost = {getAllPosibleRoutesFor20Cost}
                	midPointText = {displayData.midPointText}
            	/>
	      	</div >
      	</Container >
      )
}



export default HomeContainer;