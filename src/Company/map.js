import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';

import Pins from './pin';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: props.latitude,
        longitude: props.longitude,
        zoom: 16,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null
    };
  }

  _updateViewport = viewport => {
    this.setState({viewport});
  };

  render() {
    const {viewport, settings} = this.state;
    return (
      <MapGL
        {...viewport}
        attributionControl={true}
        mapOptions={
          {
            customAttribution: 'Powered by POWERMAP </a>'
          }
        }
        {...viewport}
        {...settings}
        width="100%"
        height="200px"
        mapStyle="https://search.map.powermap.in.th/api/v2/map/vtile/styles?name=thailand_en&access_token=b378c575291af30a29f59919fd7e7e4c012d45c4"
        onViewportChange={this._onViewportChange}
        dragToRotate={false}
        // mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Pins longitude={this.props.longitude} latitude={this.props.latitude} />
      </MapGL>
    );
  }
}

export function renderToDom(container) {
  render(<App />, container);
}