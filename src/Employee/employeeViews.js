import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Employee from './employee';
import Search from './search';
import history from '../history';
import Loading from '../Loading';
import Motion from '../motion';

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  listContainer: {
    height: '100%'
  }
});

class View extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      filterData: props.filterData,
      filterCompany: history.location.state?history.location.state.filterCompany:null,
      filterName: null,
      companies: props.companies,
      width: null,
      height: null
    }
  }

  componentDidMount (){
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 56
    })
    if (this.state.filterCompany){
      this.getFilter(this.state.filterCompany);
    }
  }

  componentWillReceiveProps (nextProps){
    this.setState({
      data: nextProps.data,
      filterData: nextProps.filterData,
      companies: nextProps.companies,
    })
  }

  getFilter = (selected) => {
    this.setState({
      filterCompany: selected
    }, () => {if (selected !== 'All') {
      this.setState({
        filterData: this.state.data.filter(item => 
          {
            return item.company === selected 
          })
      })
    } else {
      this.setState({
        filterData: this.state.data
      })
    }})
  }

  callBack=(value)=>{
    if(value){
      this.setState({filterName: value}, () => this.setState({
        filterData: this.state.data.filter(item => 
          {
            return item.name === value 
          })
      }))
    } else {

      if (this.state.filterCompany !== 'All') {
        this.setState({
          filterData: this.state.data.filter(item => 
            {
              return item.company === this.state.filterCompany 
            })
        })
      } else {
        this.setState({
          filterData: this.state.data
        })
      }
    }
  };

  render() {
    const { classes } = this.props;
    const { filterData, companies, componentName, filterCompany, width, height, filterName } = this.state;
    if(!filterData){return(<Loading />)};
    return (
      <Motion>
          <div>
            <Search companies={companies} getFilter={this.getFilter} hasDot={componentName === "employees"} data={filterData} callBack={this.callBack} filterName={filterName}/>
            <div className={classes.appBarSpacer} />
            <div style={{width, overflowY: 'scroll', height}}>
              <Employee filterData={filterData} className={classes.listContainer} filterCompany={filterCompany} index={history.location.state?history.location.state.index:null}/>
            </div>
            <div className={classes.appBarSpacer} />
        </div>
      </Motion>
    );
  }
}

export default withStyles(styles)(View);