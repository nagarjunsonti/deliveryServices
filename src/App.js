import React, {Component} from 'react';
import logo from './images/eko_logo_RGB.png';
import DeliveryImg from './images/test2.png';
import './App.css';
import {AppBar, Toolbar,Typography,CssBaseline, Container} from '@material-ui/core';
import SelectDropDown from './components/SelectDropDown';
import HomeContainer from './HomePage/HomePageContainer';
import {GetPossibleRoutsFromSourceToDestination} from './Utility/Utility';
import {TOWNS_LIST, TOWNS_PATHS_COST, APPLICATION_TITLE, APPLICATION_SUBTITLE} from './Constants/Constants';

class App extends Component{
constructor(props){
  super(props);
  this.state={citiesList:TOWNS_LIST,
                cityRoute:TOWNS_PATHS_COST,
                avialablerouts:[],
                sourceCity:"",
                destinationCity:""

              }
  this.sotorePath =[];
  this.sotoreTwons =[]; 
  this.traversedCities = []; 
  this.pathSum= 0;
}
handleSourceSelectdropdown =(e, values) =>{  
  this.sotorePath =[];
  let inputValues = (values === null)?"":values;  
  this.setState({ ...this.state,avialablerouts:[], sourceCity:inputValues});  
}
handleDestinationSelectdropdown =(e, values) =>{  
  this.sotorePath =[];
  let inputValues = (values === null)?"":values;  
  this.setState({ ...this.state,avialablerouts:[], destinationCity:inputValues});
  
}
setAllRoutes = ()=>{   
   this.setState({...this.state, avialablerouts:[...this.sotorePath]});
}
componentDidUpdate(){
  const {sourceCity, destinationCity, cityRoute} =this.state;
  if(sourceCity !=="" && destinationCity !=="" && this.sotorePath.length === 0){
      let promise = new Promise((resolve, reject) => {
          this.sotorePath =GetPossibleRoutsFromSourceToDestination({city:sourceCity, cost:0}, destinationCity, cityRoute);
          resolve(true);
      });
      promise.then(()=>{
        this.setAllRoutes();
      }).catch((error)=>{
        console.log(error)
      })
  }
}
render(){
  const {citiesList, sourceCity, destinationCity, avialablerouts, cityRoute} =this.state;
    return (
      <div className="App">
        <CssBaseline />
        <AppBar>
          <div className={"navHeader"}>
            <div style={{width:"80%"}}>
              <Toolbar>
                <a href={'/'} className={"logoLink"}>                 
                  <img src={logo} alt="EkpApp" with="50px" height="41px" />
                </a>
                <Typography variant="h6" > ​{APPLICATION_TITLE} </Typography> 
                <div className={"deliveryimg"}> <img src={DeliveryImg} alt="EkpApp" with="50px" height="50px" /> </div>             
              </Toolbar>            
            </div>
            <div className={"headerDescription"}>
              {APPLICATION_SUBTITLE} 
            </div>
          </div>
        </AppBar>
        <Toolbar />
        <Container>          
          <div className={"homeContainer"}>
            <div className={"selectDropDownMainDiv"}>
              <SelectDropDown title={"Select Source"} 
                optionData={citiesList} 
                handleSelectdropdown = {this.handleSourceSelectdropdown}
                inputValue ={sourceCity}
              / >
              <SelectDropDown title={"Select Destination"} 
                optionData={citiesList} 
                handleSelectdropdown = {this.handleDestinationSelectdropdown}
                inputValue ={destinationCity}               
              / >
            </div>
            {sourceCity && destinationCity && (<div className={"pathContainer"}>
                <HomeContainer                 
                  townList= {citiesList}
                  destinationCity = {destinationCity}
                  sourceCity = {sourceCity}
                  availableRoutsList = {avialablerouts}
                  allRoutesForTowns = {cityRoute}
                  / >            
              </div>)
            }
          </div>
      </Container >  
      </div>
    );
  }
}

export default App;
