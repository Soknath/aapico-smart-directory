import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles, useTheme } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import MapGL, {FlyToInterpolator, NavigationControl, GeolocateControl } from 'react-map-gl';
import IconButton from '@material-ui/core/IconButton';
import RoomIcon from '@material-ui/icons/Room';
import Card from '@material-ui/core/Card';
import Motion from '../motion';
import AppBar from '../appBar';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    checkinButton: {
        position: 'absolute',
        margin: 'auto',
        bottom: 65
    },
    content: {
      display: 'flex',
      flexDirection: 'column'
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      padding: 10,
      textAlign: 'center'
    }
  });

const geolocateStyle = {
  position: 'absolute',
  top: 115,
  left: 0,
  margin: 10
};

const navStyle = {
  position: 'absolute',
  top: 50,
  left: 0,
  padding: '10px'
};


const navRightStyle = {
  position: 'absolute',
  top: 65,
  right: 50,
  padding: '10px'
};

class CheckForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      language: 'en',
      companyName: null,
      data: props.data,
      viewport: {
        latitude: 14,
        longitude: 100,
        zoom: 6,
        bearing: 0,
        pitch: 0
      }
    };
  }
  
  _handleChange = (event, newValue) => {
    this.setState({
      language: newValue
    });
  };

  _onViewportChange = viewport =>
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });

  _goToViewport = (company) => {
    this.setState({popupInfo: company});
    this.setState({
      viewport: {...this.state.viewport, 
        latitude: parseFloat(company.lat_lng.split(',')[0]),
        longitude: parseFloat(company.lat_lng.split(',')[1]),
        zoom: 15,
        transitionInterpolator: new FlyToInterpolator({speed: 2}),
        transitionDuration: 'auto'
      }
    });
  };
  _updateViewport = (viewport) => {
    this.setState({viewport});
  }


  render() {
    const {viewport, settings} = this.state;
    const {classes} = this.props;
    return (
      <Motion>
      <AppBar info={true} history={true} title={"CHECK IN"}/><div className={classes.appBarSpacer}/>
      <div style={{height: 'calc(100%-56x)'}}>
        <MapGL
          attributionControl={true}
          mapOptions={
            {
              customAttribution: 'Powered by POWERMAP </a>'
            }
          }
          {...viewport}
          {...settings}
          width="100vw"
          height="93vh"
          mapStyle={this.state.language ==='en'?
            "https://search.map.powermap.in.th/api/v2/map/vtile/styles?name=thailand_en&access_token=b378c575291af30a29f59919fd7e7e4c012d45c4"
            :"https://search.map.powermap.in.th/api/v2/map/vtile/styles?name=thailand_th&access_token=b378c575291af30a29f59919fd7e7e4c012d45c4"
          }
          onViewportChange={this._onViewportChange}
          dragToRotate={false}
          // mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: false}}
          trackUserLocation={true}
          onViewportChange={this._updateViewport}
        />
        <div style={navStyle}>
          <NavigationControl showCompass={false}/>
        </div>
        </MapGL>
        
        <div style={navRightStyle}>
        <Grid container className="language-control-panel" spacing={2} direction="column">
          <Grid item>
            <ToggleButtonGroup size="small" value={this.state.language} exclusive onChange={this._handleChange} variant="contained">
              <ToggleButton key={1} value="en" active>
                EN
              </ToggleButton>,
              <ToggleButton key={2} value="th">
                TH
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        </div>
        
        <Grid container justify="center" className={classes.checkinButton}>
        <Card ><div className={classes.details}>
        <div className={classes.controls}>
        <Typography><b>In</b> <br /></Typography>
        <IconButton color="primary" aria-label="chec-in/check-out" >
            <RoomIcon style={{fontSize: 40}}/>
        </IconButton>
        <Typography><b>Out</b><br /></Typography>
        </div>
      </div>
        </Card>
        </Grid>

      </div>
      </Motion>
    );
  }
}


export default withStyles(styles)(CheckForm);
