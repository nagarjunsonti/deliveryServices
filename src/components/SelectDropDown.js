/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SelectDropDown(props) {
  return (
  	<div className={"SelectDropDown"}>
	    <Autocomplete	      
	      options={props.optionData}
	      getOptionLabel={option => option}
	      style={{ width: 300 }}
	      inputValue ={props.inputValue || ""}
	      name = {props.title}
	      onChange={props.handleSelectdropdown}
	      renderInput={params => (
	        <TextField {...params} label={props.title} variant="outlined" fullWidth />
	      )}
	    />
    </div>
  );
} 

