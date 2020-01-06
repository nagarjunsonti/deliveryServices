import React, {Fragment, useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

export default function CheckBoxComponent(props) {
  const {updatedtownList, destinationCity, sourceCity} = props;
  const [state, setState] = React.useState([]);
  useEffect(()=>{
    if(state.length >0){
      props.handleCheckboxCheck(state);
    }
  },[state])

  const handleChange = name => event => {   
   let checkedlis = state;   
    let checkedvalue=event.target.value;
    if(event.target.checked){
      checkedlis.push(checkedvalue);
    } else{
        let indexValue= checkedlis.indexOf(checkedvalue);
        if (indexValue > -1) {
          checkedlis.splice(indexValue, 1);
        }
        
    } 
    setState([...checkedlis ]);
    if(!checkedlis.length === 0){
      props.handleCheckboxCheck([]);
    }

  };
  
  return (
    <div className={"checkboxContainer"}>
    <div>Select Mid Towns: </div>
    <div>    
      <FormGroup row>    
      {
        updatedtownList.map((town)=>{
          return (<FormControlLabel
                    key={town}
                    control={
                      <Checkbox              
                        onChange={handleChange(town)}
                        value={town}
                        color="primary"
                      />
                    }
                    label={town}
                />
          )

        })
      }      
              
      </FormGroup>
    </div>
    </div>
  );
}
