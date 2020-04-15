import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DirectionsIcon from '@material-ui/icons/Directions';
import PhoneIcon from '@material-ui/icons/Phone';
import history from '../history'; 

const useStyles = makeStyles({
  card: {
    maxWidth: '100%',
  },
  media: {
    height: 180,
  },
  rightButton: {
    marginLeft: 'auto !important',
  }
});

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

export default function MediaCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={()=> history.push({
            pathname: './employees',
            state: {filterCompany: props.name}
          })}>
        <CardMedia
          className={classes.media}
          image={props.img}
          title={props.name}
        />
        <CardContent style={{padding: '10px', color: 'black'}}>
          <Typography component="h6" >
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.province}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
        <a href={`${href}${props.lat_lng}`}  target="_blank"><DirectionsIcon /></a>
        </Button>
        <Button size="small" color="primary" className={classes.rightButton}>
        <a href={`tel:${props.tel}`} target="_blank"><PhoneIcon /></a>
        </Button>
      </CardActions>
    </Card>
  );
}