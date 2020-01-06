import React, {useState, Fragment, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import {        
         CHEPEAST_ROUTE_COST_TEXT,
         COST_TEXT,
         MAXIMUM_4STOP_TEXT,
         ALL_POSIBLE_ROUTES,
         POSIBLE_ROUTES_20LESS
      } from '../Constants/Constants';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function RootInfoComponent(props) {
  const classes = useStyles();
  const [displayRouteInfo, setDisplayRouteInfo] = useState({
    cheapestRoute:[],
    maximum4StopPaths:[],
    allPosibleRoutes:[],
    maximum20CostPaths:[],
    cheapestCost :0
  });

  useEffect(()=>{
    let responceChepeast = props.getCheapestRoute();
    let responceMaximum4 = props.getMaximum4StopsRoute();
    let responceAll = props.getAllPosibleRoutes();
    let responceMaximum20= props.getAllPosibleRoutesFor20Cost();
    setDisplayRouteInfo({...displayRouteInfo, 
                          cheapestRoute:[...responceChepeast.bestRoute],
                          cheapestCost: responceChepeast.bestCost,
                          maximum4StopPaths:[...responceMaximum4],
                          allPosibleRoutes:[...responceAll],
                          maximum20CostPaths:[...responceMaximum20]
                        })

  },[props]);
  
  const getCheapestCost = ()=>{
    const {cheapestCost} = displayRouteInfo;
      if(cheapestCost){
        return cheapestCost
      }else{
        return 0;
      }

  }
  const renderRoutePaths = (type)=>{
    const {maximum4StopPaths, allPosibleRoutes, maximum20CostPaths} = displayRouteInfo;
    let pathList = [];
    let pathListArray = []
    if(type === "maximum4Stops"){
        pathListArray = (maximum4StopPaths)?maximum4StopPaths:[];
    }else if(type === "allPosible"){
      pathListArray = (allPosibleRoutes)?allPosibleRoutes:[];
    }else{      
      pathListArray = (maximum20CostPaths)?maximum20CostPaths:[];
    }
    
    pathListArray.forEach((path, index)=>{
      if(path.rootCost !== 0){        
          let townsList = path.rootlist;
          //let townsListLength = townsList.length;
          pathList.push(<Fragment key={`routeMaximum4_${Math.random()}`}>              
              <div className={"cheapestRoutDive maximum4Stops"}>
                <div> {index+1})</div>
                {renderLoop(townsList)}
                <div> = </div>
                <div className={'locationPoints costpathDive'}>            
                    <Tooltip title="Best cost for selected Route" >
                      <MonetizationOnIcon className={'costIcon'} /> 
                    </Tooltip >
                    <span className={"pathPoint"}>{COST_TEXT} {path.rootCost}</span>
                </div>
              </div>
          </Fragment>);
      }
    });    
    return pathList;
  }

  const renderLoop = (list)=>{
    let listLength = list.length;
    let pathList = [];
    for(let i = 0; i <listLength ; i++){
      let divColor= 'grayIcon';
            if(i === 0){
              divColor = 'greenIcon';
            }else if(i === listLength-1){
              divColor = 'secondaryIcon';
            }            
           pathList.push(<Fragment key={`routeInfo_${Math.random()}`}>                                          
                      <div className={"locationPoints"}>
                        <Tooltip title={`Town: ${list[i]} `} >              
                            <LocationCityIcon className={divColor} />
                        </Tooltip >
                        <span className={"pathPoint"}>: {list[i]} </span> 
                      </div>
                        {(listLength-1 !== i)?<div className={"grayIcon"}>----</div>:""}
                    </Fragment>);
    }
    return  pathList;

  }

  const getShortestPath = ()=>{
   const {cheapestRoute} = displayRouteInfo;
   let cheapestRouteList = (cheapestRoute.length > 0)?cheapestRoute :[];
    return  renderLoop(cheapestRouteList);
  }
  
  return (
    <div className={classes.root}>
      <ExpansionPanel  >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="routeContent_1"
          id="routePanel_1"
        >
          <Typography className={classes.heading}>{CHEPEAST_ROUTE_COST_TEXT}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={"cheapestRoutDive"}>            
            {
             getShortestPath()
            }
            <div> = </div>
            <div className={'locationPoints costpathDive'}>            
                <Tooltip title="Best cost for selected Route" >
                  <MonetizationOnIcon className={'costIcon'} /> 
                </Tooltip >
                <span className={"pathPoint"}>{COST_TEXT} {getCheapestCost()}</span>
            </div>
          </div>
        </ExpansionPanelDetails >
      </ExpansionPanel >
      
      <ExpansionPanel >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="routeContent_2"
          id="routePanel_2"
        >
          <Typography className={classes.heading}>{MAXIMUM_4STOP_TEXT}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={"cheapestRoutDive maximum4Stops"}>
            {renderRoutePaths("maximum4Stops")}
          </div>
        </ExpansionPanelDetails >
      </ExpansionPanel >

      <ExpansionPanel >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="routeContent_3"
          id="routePanel_3"
        >
          <Typography className={classes.heading}>{ALL_POSIBLE_ROUTES}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={"cheapestRoutDive maximum4Stops"}>
            {renderRoutePaths("allPosible")}
          </div>
        </ExpansionPanelDetails >
      </ExpansionPanel >

      <ExpansionPanel >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="routeContent_4"
          id="routePanel_4"
        >
          <Typography className={classes.heading}>{POSIBLE_ROUTES_20LESS}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
           <div className={"cheapestRoutDive maximum4Stops"}>
            {renderRoutePaths("allPosible20Cost")}
          </div>
        </ExpansionPanelDetails >
      </ExpansionPanel >
      
    </div>
  );
}
