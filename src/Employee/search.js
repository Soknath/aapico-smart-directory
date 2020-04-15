import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import MoreIcon from '@material-ui/icons/MoreVert';
import Dialog from './Dialog';
import AutoCompleteSearch from './autoComplete';
import DialogInfo from '../infoDialog';

// const companies = ['AAPICO Hitec', 'AAPICO Hitec Parts', 'AAPICO ITS', 'All']; //TODO from gmail
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
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
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

export default function SearchAppBar(props) {
  const [open, setOpen] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(props.companies[0]);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenInfo = () => {
    setOpenInfo(true);
  };

  const handleInfoClose = () => {  
    setOpenInfo(false);
  }

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
    props.getFilter(value);
  };

  const callBack = value =>{
    props.callBack(value);
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleClickOpenInfo} 
          >
            <InfoIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {props.title}
          </Typography>
          <AutoCompleteSearch data={props.data} callBack={callBack} filterName={props.filterName}/>
          <IconButton aria-label="display more actions" edge="end" color="inherit" onClick={handleClickOpen}>
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Dialog selectedValue={selectedValue} open={open} onClose={handleClose} companies={props.companies} />
      <DialogInfo open={openInfo} onClose={handleInfoClose} />
    </div>
  );
}