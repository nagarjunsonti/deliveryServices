import React, {Fragment, useEffect, useState} from 'react';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Tooltip from '@material-ui/core/Tooltip';
import SelectDropDown from './SelectDropDown';
import {DROP_TEXT, EXACT_ROUTE_COST_TEXT, BEST_ROUTE_COST_TEXT} from '../Constants/Constants';
function DisplayrootComponent(props){
	const {sourceCity, destinationCity, townList, dropDownValue} =props;
	const [dropdownValuelocal, setDropDownValue] = useState(dropDownValue);
	useEffect(()=>{
		setDropDownValue(dropDownValue);
	},[dropDownValue])

	const handleSelectDropDown = (e,midpointDestination)=>{
			if(midpointDestination !==null){
				props.handleSelectMidpointDropDown(midpointDestination);		
			}else{
				setDropDownValue("")
				return false;
			}
	}
	
	const {bestPathCost, midPointTowns,  exactpathCost} = props;	
	return (
		<div>
			<div className={"showLocationPathDiv"}>
				<div className={"locationPoints"}>
					<LocationCityIcon style={{ color: "#178416" }} /> 
					<span className={"pathPoint"}>Pickup : {sourceCity} </span>
				</div>				 
				{
					midPointTowns.map((item, index)=>{
						return (
							<Fragment key={Math.random()}>
								<div className={"locationPoints"}>
										<Tooltip title={`Midpoint: ${item} `} >							
											<LocationCityIcon style={{ color: "#ccc" }} />
										</Tooltip >
										<span className={"pathPoint"}>: {item} </span>									
									</div>								
							</Fragment >
						)
					})
				}
				<div className={'locationPoints'}>
					<LocationCityIcon color="secondary" /> 
					<span className={"pathPoint"}>{DROP_TEXT} {destinationCity}</span>
				</div>								
			 </div>
							
			{sourceCity && destinationCity && ( <div className={"midpointActions"}>
					<SelectDropDown 
					 	optionData={townList}					 	
					 	title={"Select Mid Points"}
		                handleSelectdropdown = {handleSelectDropDown}
		                inputValue = {dropdownValuelocal || ""}                
	             />
	            <div className={'locationPoints costpathDive'}>
					<Tooltip title="Cost for given delivery route." >
						<MonetizationOnIcon color="secondary" /> 
					</Tooltip >
					<span className={"pathPoint"}>{EXACT_ROUTE_COST_TEXT} {exactpathCost}</span>
				</div>
				<div className={'locationPoints costpathDive'}>
					<Tooltip title="Best cost for selected Route" >
						<MonetizationOnIcon color="secondary" /> 
					</Tooltip >
					<span className={"pathPoint"}>{BEST_ROUTE_COST_TEXT} {bestPathCost}</span>
				</div>
				</div >)
			}
			
		</div>

		);

}

export default DisplayrootComponent;