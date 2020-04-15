import React, { Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import history from '../history';
import {FixedSizeList  as List} from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Divider } from '@material-ui/core';

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
});

class Employee extends Component {
  state={
    index: 0
  }

  Row = ({index, style}) =>{
    return(
    <div style={style} >
    <ListItem button onClick={async ()=> {
      history.push({
          pathname: './employeeDetails',
          state: {
              data: this.props.filterData[index],
              index: this.state.index,
              filterCompany: this.props.filterCompany
            }
        })
      }}>
      <ListItemAvatar>
        <Avatar alt={this.props.filterData[index].name} src={this.props.filterData[index].img} />
      </ListItemAvatar>
      <ListItemText
        primary={this.props.filterData[index].name}
        secondary={this.props.filterData[index].position}
      />
    </ListItem>
    <ListItemSecondaryAction>
      <IconButton edge="end" aria-label="delete">
          <ArrowForwardIosIcon />
      </IconButton> 
      </ListItemSecondaryAction>
    <Divider />
    {index===this.props.filterData.length-1?<div className={this.props.classes.appBarSpacer}/>:null}
    </div>
  )}
  render(){
  return (
    <>
    <AutoSizer>
      {({ height, width }) => {
        return(
          <>
          <List
            height={height}
            width={width}
            itemSize={72}
            itemCount={this.props.filterData.length}
            initialScrollOffset={this.props.index || 0}
            onScroll = {(scroll) =>{
                this.setState({
                  index: scroll.scrollOffset
                })
            }}
          >
              {this.Row}
          </List>
          </>
      )}}    
    </AutoSizer>
    </>
  )};
}

export default  withStyles(styles)(Employee);