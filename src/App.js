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
      citiesList: {"results": []}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMeasureChange = this.handleMeasureChange.bind(this);
  }

  handleChange(e) {
      this.setState({areaSelected: e.target.value});
  }

  handleMeasureChange(e) {
      this.setState({measurementSelected: e.target.value});
  }

  fetchData(url) {
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
        .then((citiesList) => this.setState({ citiesList: citiesList })) // ES6 property value shorthand for { items: items }
        .catch(() => this.setState({ hasErrored: true }));
  }

  componentDidMount() {
        this.fetchData('https://api.openaq.org/v1/cities?country=GB&limit=1000');
    }


  filterCitiesList() {

      return this.state.citiesList.results.filter((item) => item.city == this.state.areaSelected)
  }

  render() {

    if (this.state.hasErrored) {
            return <AppHeader message="Sorry! There was an error loading the items"/>;
        }

    if (this.state.isLoading) {
            return <AppHeader message="Loading..."/>;
        }

    return (
              <div className="App">
                <div className="App-header">
                  <img src={lungs} className="App-logo" alt="logo" />
                  <h2>Air Pollution Data Navigator</h2>
                </div>
                <p className="App-intro">
                  First Select an Area.
                </p>
                <form>
                  <CitySelector
                  results={this.state.citiesList.results}
                  onChange={this.handleChange} />
                <LocationInfo area={this.filterCitiesList()} />
                  <p className="App-intro">
                  Select the Measurement Type.
                </p>
                  <select className="App-intro" onChange={this.handleMeasureChange}>
                    <option value="no2">Nitrogen Dioxide</option>
                    <option value="o3">Ozone</option>
                    <option value="pm10">Particles &lt; 10&#956;m</option>
                    <option value="pm10">Particles &lt; 25&#956;m</option>
                  </select>
                </form>
                <DataOutput />
              </div>
            );
  }
}


class AppHeader extends Component {

  render () {

    return (
            <div className="App">
              <div className="App-header">
                <img src={lungs} className="App-logo" alt="logo" />
                <h2>Air Pollution Data Navigator</h2>
              </div>
                <p>{this.props.message}</p>
            </div>);
      }
}


class LocationInfo extends Component {

  static defaultProps = {
        "area": [{"locations": null}]
        };

  render () {

      if (typeof this.props.area[0] == 'undefined') {
        return <div></div>
      }
      return (
              <div className="App-intro">
              <br />
                There are currently {this.props.area[0].locations} locations in {this.props.area[0].city}
            </div>)

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
              <option value={item.city}>
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
