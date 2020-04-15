import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Map from '../Map/map';
import Company from './company';
import AppBar from '../appBar';
import Motion from '../motion';

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
});

class View extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
  }

  handleChange = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };

  render() {
    const { data } = this.state;
    const { classes } = this.props;
    return (
      <Motion>
        <div style={{width: '100%'}}>
        <AppBar info={true} company={true} onSelectMap={mapView => this.setState({...this.state, mapView})} /><div className={classes.appBarSpacer}/>
        <div style={{overflowY: 'scroll', height: window.innerHeight - 2*56}}>
        {!this.state.mapView?
          <List>
          {
            data.map((obj, index) => {
              return (
                <div key={index} style={{padding: 15}}> 
                  <Company name={obj.name} lat_lng={obj.lat_lng} tel={obj.tel} img={obj.img} key={index} location={obj.location} province={obj.province}/>
                </div>
              )
            })
          }</List>
        :<Map data={data}/>}
        </div>
      </div>
      </Motion>
    );
  }
}

export default  withStyles(styles)(View);