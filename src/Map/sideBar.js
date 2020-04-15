import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  list: {
    width: 250,
  }
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      {props.children}
    </div>
  );

  return (
    <div>
      <IconButton  color="primary" aria-label="add to shopping cart" style={{
        position: 'absolute',
        top: '50px',
        right: '5px',
        backgroundColor: 'white'
      }} onClick={toggleDrawer('right', true)} variant="contained"><HomeWorkIcon /></IconButton>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        {sideList('right')}
      </Drawer>
    </div>
  );
}