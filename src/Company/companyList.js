import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import history from '../history';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SelectedListItem(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          onClick={()=> history.push({
            pathname: './employees',
            state: {filterCompany: props.company}
          })}
        >
          <ListItemIcon>
            <Avatar>
            <HomeWorkIcon />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary={props.company} />
          <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete">
              <ArrowForwardIosIcon />
          </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}