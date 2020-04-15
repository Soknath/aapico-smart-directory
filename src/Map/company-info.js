import React, {PureComponent} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import history from '../history';
import LaunchIcon from '@material-ui/icons/Launch';

export default class CityInfo extends PureComponent {

  handleClick = () => {
    history.push({
      pathname: './companyDetails',
      state: this.props.info
    })
  }
  render() {
    const {info} = this.props;
    const displayName = `${info.name}`;

    return (
      <div style={{textAlign: "-webkit-center", width: "200px"}}>
        <br />
        <img width={160} src={info.img} alt={info.name} />
        <Typography>
          <b>{displayName}</b>
          <IconButton onClick={this.handleClick} color="primary" aria-label="View details">
              <LaunchIcon />
          </IconButton>
        </Typography>
      </div>
    );
  }
}