import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Map from './map';
import AppBar from '../appBar';
import history from '../history';
import IconButton from '@material-ui/core/IconButton';
import PhoneIcon from '@material-ui/icons/Phone';
import DirectionsIcon from '@material-ui/icons/Directions';
import Motion from '../motion';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: '100%'
  },
  media: {
    height: 180
  },
  appBarSpacer: theme.mixins.toolbar,
  rightButton: {
    marginLeft: 'auto !important',
  },
  overlayImage: {
     height: 180,
     backgroundImage: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(255,255,255,0.5) 75%) !important'
  },
  overlay: {
     position: 'relative',
     top: '120px',
     left: '10px',
     color: 'white',
     width: '95%'
  }
}));

// Detects if device is on iOS 
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test( userAgent );
}
let href;
if (isIos()){
    href = 'http://maps.apple.com/?daddr='
} else {
    href = 'https://www.google.com/maps/search/?api=1&query='
}

function MediaCard(props) {
  const classes = useStyles();
  const {name, img, location, tel, details, lat_lng} = history.location.state;
  
  return (
    <Motion>
      <div style={{width: window.innerWidth + 'px', overflowY: 'scroll', height: window.innerHeight - 56}}>
        <AppBar info={false} back={true}/>
    <div className={classes.appBarSpacer}/>
    <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={img}
          title={name}
        >
        <div className={classes.overlayImage}>
        <div className={classes.overlay}>
          <Typography variant="subtitle1" component="p">          
            <b>{name}</b>
          </Typography>
        </div>
        </div>
        </CardMedia>
        <CardActions>
          <Typography variant="body2" color="textSecondary" component="p">
            Phone <br />
            {tel}
          </Typography>
          <div className={classes.rightButton}>
          <IconButton aria-label="get into location">
            <a href={`${href}${lat_lng}`} target="_blank"><DirectionsIcon /></a>
          </IconButton>
          <IconButton aria-label="make a call">
            <a href={`tel:${tel}`} target="_blank" ><PhoneIcon /></a>
          </IconButton>
          </div>
        </CardActions>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <b>Address:</b> <br />
            {location}
          </Typography>
          <br />
          <Typography variant="body2" color="textSecondary" component="p">
            <b>Description:</b> <br />
            {details}
          </Typography>
        </CardContent>
        <Map longitude={parseFloat(lat_lng.split(',')[1])} latitude={parseFloat(lat_lng.split(',')[0])} />
    </Card>
    </div>
    </Motion>
  );
}

export default MediaCard;