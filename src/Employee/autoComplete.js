/* eslint-disable no-use-before-define */
import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100% !important',
      [theme.breakpoints.up('xs')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: 'inherit'
    },
    inputInput: {
        transition: theme.transitions.create('width'),
        width: 'inherit',
        borderBottom: "none"
    }
  }));
  
export default function FreeSolo(props) {
    
  const classes = useStyles();
  const getOptionSelected = (event, value) => {
      props.callBack(value);
  }
  return (
      
    <div className={classes.search}>
      <Autocomplete className={classes.inputRoot}
        id="free-solo-demo"
        options={props.data.map(option => option.name)}
        renderInput={params => (
          <TextField {...params} className={classes.inputInput} fullWidth/>
        )}
        onChange={getOptionSelected}
        // value={props.filterName}
      />
    </div>
  );
}