import React, {PureComponent} from 'react';
import SideBar from './sideBar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
  }
  _renderButton = (company, index) => {
    return (
      <div key={company.name} >
      <ListItem button key={company.name} onClick={() => this.props.onViewportChange(company)}>
        <ListItemIcon><Avatar alt={company.name} src={company.img} /></ListItemIcon>
        <ListItemText primary={company.name} />
      </ListItem>
      <Divider />
      </div>
      );
  };

  render() {
    const Container = this.props.containerComponent || defaultContainer;
    const {data} = this.state;
    return (
      <Container>
        <SideBar>
          <List>
            {data.map(this._renderButton)}
          </List>
        </SideBar>
      </Container>
    );
  }
}