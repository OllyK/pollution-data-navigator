import React, { Component } from 'react';
import lungs from './lungs.svg';
import './App.css';


class App extends Component {

  constructor() {
    super();
    this.state = {
      areaSelected: '',
      measurementSelected: '',
      hasErrored: false,
      isLoading: false,
      citiesList: {"results": []},
      locationInfo: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMeasureChange = this.handleMeasureChange.bind(this);
    this.handleLocationClick = this.handleLocationClick.bind(this);
  }

  handleChange(e) {
      this.setState({areaSelected: e.target.value});
  }

  handleMeasureChange(e) {
      this.setState({measurementSelected: e.target.value});
  }

  handleLocationClick(e) {
    this.fetchData('https://api.openaq.org/v1/locations?city[]=' + this.state.areaSelected, true)
  }

  fetchData(url, location) {
    this.setState({ isLoading: true });
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            this.setState({ isLoading: false });
            return response;
        })
        .then((response) => response.json())
        .then((items) => {
          if (location === false) {
            this.setState({ citiesList: items })
          }
          this.setState({ locationInfo: items })
        })
        .catch(() => this.setState({ hasErrored: true }));
  }

  componentDidMount() {
        this.fetchData('https://api.openaq.org/v1/cities?country=GB&limit=1000', false);
    }


  filterCitiesList() {

      return this.state.citiesList.results.filter((item) => item.city === this.state.areaSelected)
  }

  render() {

    if (this.state.hasErrored) {
            return ( <div className="App">
                    <AppHeader message="Sorry! There was an error loading the items"/>
                    </div>);
        }

    if (this.state.isLoading) {
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
                  results={this.state.citiesList.results}
                  onChange={this.handleChange} />
                 </form>
                <LocationInfo area={this.filterCitiesList()}
                              onLocationClick={this.handleLocationClick} />
              </div>
            );
  }
}


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


class LocationInfo extends Component {

  render () {

      if (typeof this.props.area[0] === 'undefined') {
        return <div></div>
      }
      return (
              <div className="App-intro">
              <br />
                There are currently {this.props.area[0].locations} locations in {this.props.area[0].city}
              <br />
              <GetLocationInfo onLocationClick={this.props.onLocationClick}/>
            </div>);

      }
    }

class GetLocationInfo extends Component {


  render () {
          return (<div>
                  <br />
                    <button className="App-intro"
                            onClick={this.props.onLocationClick}>
                      Get location information
                    </button>
                  </div>);
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
              <option value={item.city} key={item.city}>
              {item.city}
              </option>
              ))}
          </select>
          );
  }
}

class DataOutput extends Component {

  render () {

    return (
            <div>
              <p className="App-intro">
                Here's the latest reading:
              </p>
              <div className="Data">
                  5 &#956;g/m<sup>3</sup>
              </div>
            </div>
              );
  }
}

export default App;
