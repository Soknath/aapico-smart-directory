import React from 'react';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {render} from 'react-dom';
import MapGL, {FlyToInterpolator, Popup, NavigationControl, GeolocateControl, ScaleControl } from 'react-map-gl';
import ControlPanel from './control-panel';
import Pins from './pins';
import CompanyInfo from './company-info';
import Motion from '../motion';

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

const scaleControlStyle = {
  position: 'absolute',
  bottom: 50,
  left: 0,
  padding: '10px'
};

const navRightStyle = {
  position: 'absolute',
  top: 65,
  right: 50,
  padding: '10px'
};

const companyControlStyle = {
  position: 'absolute',
  top: 65,
  right: 0,
  padding: '10px'
}

export default class App extends React.Component {
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
  _renderPopup() {
    const {popupInfo} = this.state;
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={parseFloat(popupInfo.lat_lng.split(",")[1])}
          latitude={parseFloat(popupInfo.lat_lng.split(",")[0])}
          closeOnClick={false}
          closeButton={false}
          onClose={() => this.setState({popupInfo: null})}
        >
          <CompanyInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const {viewport, settings, data} = this.state;
    return (
      <Motion>
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
          
        <Pins data={data} /> 
        {this._renderPopup()}
        
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: false}}
          trackUserLocation={true}
          onViewportChange={this._updateViewport}
        />
        <div style={navStyle}>
          <NavigationControl showCompass={false}/>
        </div>
        <div style={scaleControlStyle}>
          <ScaleControl />
        </div>
        </MapGL>
        
        <div style={companyControlStyle}>
        <ControlPanel
          data={data}
          containerComponent={this.props.containerComponent}
          onViewportChange={this._goToViewport}
          companyName={this.state.companyName}
        /></div>
        
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
      </div>
      </Motion>
    );
  }
}
