import React, { Component } from 'react';
import { connect } from 'react-redux';

import { itemsFetchData, areaSelected, measurementSelected} from './actions/items';
import lungs from './lungs.svg';
import {LocationInfo} from './location.js';
import './App.css';


class App extends Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleMeasureChange = this.handleMeasureChange.bind(this);
    this.handleLocationClick = this.handleLocationClick.bind(this);
    this.handleMeasureClick = this.handleMeasureClick.bind(this);
  }

  handleChange(e) {
      this.props.areaSelected(e.target.value);
  }

  handleMeasureChange(e) {
      this.props.measurementSelected(e.target.value);
  }

  handleLocationClick(e) {
    this.props.fetchData('https://api.openaq.org/v1/locations?city[]=' + this.props.areaSelected, 'location')
  }
  handleMeasureClick (e) {
    this.props.fetchData('https://api.openaq.org/v1/latest?location=' + e.target.parentNode.getAttribute("value"), 'measurements')
  }

  componentDidMount() {
        this.props.fetchData('https://api.openaq.org/v1/cities?country=GB&limit=1000', 'cities');
    }


  filterCitiesList() {

      return this.props.citiesList.results.filter((item) => item.city === this.props.areaSelected)
  }

  render() {

    if (this.props.hasErrored) {
            return ( <div className="App">
                    <AppHeader message="Sorry! There was an error loading the items"/>
                    </div>);
        }

    if (this.props.isLoading) {
            return (<div className="App">
                    <AppHeader message="Loading..."/>
                    </div>);
        }

    return (
              <div className="App">
                <AppHeader />
                <p className="App-intro">
                  First Select an Area.
                </p>
                <form>
                  <CitySelector
                  area={this.props.areaSelected}
                  results={this.props.citiesList.results}
                  onChange={this.handleChange} />
                 </form>
                <LocationInfo area={this.filterCitiesList()}
                              locData={this.props.locationInfo.results}
                              onLocationClick={this.handleLocationClick}
                              onMeasurementClick={this.handleMeasureClick} />
                <MeasurementOutput measurements={this.props.measurementInfo.results[0]}/>
              </div>
            );
  }
}

const mapStateToProps = (state) => {
    return {
        measurementSelected: state.measurementSelected,
        areaSelected: state.areaSelected,
        measurementInfo: state.measurementInfo,
        locationInfo: state.locationInfo,
        citiesList: state.citiesList,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, type) => dispatch(itemsFetchData(url, type)),
        measurementSelected: (value) => dispatch(measurementSelected(value)),
        areaSelected: (value) => dispatch(areaSelected(value))
    };
};


class AppHeader extends Component {

  render () {

    return (
              <div className="App-header">
                <img src={lungs} className="App-logo" alt="logo" />
                <h2>Air Pollution Data Navigator</h2>
                 <p>{this.props.message}</p>
              </div>

                );
            }
}


class CitySelector extends Component {

  render () {

    return (
            <select className="App-intro"
             onChange={this.props.onChange}
             >
             <option value="nothing">
              Please Select
              </option>
            {this.props.results.map((item) => (
              <option value={item.city} key={item.city}
                      selected={this.props.area === item.city ? "selected" : null}>
                  {item.city}
              </option>
              ))}
          </select>
          );
  }
}

class MeasurementOutput extends Component {

  render () {

    if (this.props.measurements.measurements.length === 0){
      return <div></div>
    }

    return (
            <div>
              <p className="App-intro">
                Here are the latest readings for {this.props.measurements.location}:
              </p>
              <table className="locationTable">
                  <tbody>
                    <tr>
                      <th>Measurement Type</th>
                      <th>Reading</th>
                      <th>Taken at</th>
                    </tr>
                    {this.props.measurements.measurements.map((item) => (
                    <tr key={item.parameter} className="measurements">
                        <td>{item.parameter.toUpperCase()}</td>
                        <td>{item.value} {item.unit}</td>
                        <td>{item.lastUpdated}</td>
                    </tr>
                    ))}
                  </tbody>
              </table>

            </div>
              );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
